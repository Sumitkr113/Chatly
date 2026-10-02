const dotenv = require("dotenv");

// Must run before any module that reads process.env at load time
dotenv.config();

if (!process.env.CLIENT_URL) {
    console.error("Missing required environment variable: CLIENT_URL");
    process.exit(1);
}

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const { authRoutes } = require("./routes/auth.route");
const { messageRoutes } = require("./routes/message.route");
const connectDB = require("./lib/db");
const { app, server } = require("./lib/socket");
const { groupRoutes } = require("./routes/group.route");

app.use(cookieParser());

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/group", groupRoutes);

server.listen(process.env.PORT, () => {
    console.log("Running on port number:", process.env.PORT);
    connectDB();
});