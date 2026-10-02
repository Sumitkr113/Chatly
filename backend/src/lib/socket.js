const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
    },
});

// userId (string) -> Set of socket ids. Supports multiple tabs/devices per user.
const userSockets = new Map();

const userRoom = (userId) => `user:${userId}`;

// Minimal cookie header parser (avoids depending on a transitive package).
const getCookie = (cookieHeader, name) => {
    if (!cookieHeader) return null;
    for (const part of cookieHeader.split(";")) {
        const idx = part.indexOf("=");
        if (idx === -1) continue;
        if (part.slice(0, idx).trim() === name) {
            const raw = part.slice(idx + 1).trim();
            try {
                return decodeURIComponent(raw);
            } catch {
                return raw;
            }
        }
    }
    return null;
};

// Authenticate every socket connection using the existing httpOnly "jwt" cookie.
// The client-supplied userId is never trusted.
io.use((socket, next) => {
    try {
        const token = getCookie(socket.request.headers.cookie, "jwt");
        if (!token) {
            return next(new Error("Authentication error: no token provided"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.userId) {
            return next(new Error("Authentication error: invalid token"));
        }

        socket.userId = String(decoded.userId);
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return next(new Error("Authentication error: token expired"));
        }
        return next(new Error("Authentication error: invalid token"));
    }
});

// Compatibility helper: existing callers do io.to(getReceiverSocketId(userId)).
// We return the user's private room name (all of that user's sockets are in it),
// so a message reaches every open tab/device. Returns undefined if user is offline.
const getReceiverSocketId = (userId) => {
    const key = String(userId);
    const sockets = userSockets.get(key);
    return sockets && sockets.size > 0 ? userRoom(key) : undefined;
};

// Raw socket ids for a user (empty array if offline).
const getReceiverSocketIds = (userId) => {
    const sockets = userSockets.get(String(userId));
    return sockets ? Array.from(sockets) : [];
};

io.on("connection", (socket) => {
    const userId = socket.userId;
    console.log("A user connected", socket.id);

    if (!userSockets.has(userId)) {
        userSockets.set(userId, new Set());
    }
    userSockets.get(userId).add(socket.id);
    socket.join(userRoom(userId));

    io.emit("getOnlineUsers", Array.from(userSockets.keys()));

    socket.on("joinGroup", (groupId) => {
        socket.join(groupId);
        console.log(`User ${socket.userId} joined group ${groupId}`);
    });

    socket.on("leaveGroup", (groupId) => {
        socket.leave(groupId);
        console.log(`User ${socket.userId} left group ${groupId}`);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        const sockets = userSockets.get(userId);
        if (sockets) {
            sockets.delete(socket.id);
            if (sockets.size === 0) {
                userSockets.delete(userId);
            }
        }
        io.emit("getOnlineUsers", Array.from(userSockets.keys()));
    });
});

module.exports = { io, app, server, getReceiverSocketId, getReceiverSocketIds };