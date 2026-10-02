import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { io } from "socket.io-client"
const BASE_URL = import.meta.env.VITE_SOCKET_URL;
// const BASE_URL = "https://chatlly.onrender.com";
// const BASE_URL = "http://localhost:5000"
export const userAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const resp = await axiosInstance.get("/auth/check");
            set({ authUser: resp.data });
            get().connectSocket()
        } catch (error) {

            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },


    loginAuth: async (data) => {
        set({ isLoggingIn: true });
        try {
            const resp = await axiosInstance.post("/auth/login", data);
            set({ authUser: resp.data });
            toast.success("Logged in successfully!");
            get().connectSocket()
        } catch (error) {
            const msg = error.response?.data?.msg || "Login failed";
            toast.error(msg);
        } finally {
            set({ isLoggingIn: false });
        }
    },


    signupAuth: async (data) => {
        set({ isSigningUp: true });
        try {
            const resp = await axiosInstance.post("/auth/signup", data);
            set({ authUser: resp.data });
            toast.success("Account created successfully!");
            get().connectSocket()
        } catch (error) {
            const msg = error.response?.data?.msg || "Signup failed";
            toast.error(msg);
        } finally {
            set({ isSigningUp: false });
        }
    },
    logout: async () => {
        try {
            const resp = await axiosInstance.post("/auth/logout")
            set({ authUser: null });
            toast.success("Logged out succesfully!");
            get().disconnectSocket()
        } catch (error) {
            const msg = error.response?.data?.msg || "Signup failed";
            toast.error(msg);
        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {

            const res = await axiosInstance.put("/auth/profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
            set({ isUpdatingProfile: false });
        } catch (error) {
            console.log("error in update profile:", error);
            toast.error(error.response.data.message);
            set({ isUpdatingProfile: false });
        } finally {
            set({ isUpdatingProfile: false });

        }
    },

    connectSocket: () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            }
        })
        socket.connect()
        set({ socket: socket })
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds })
        })
    },
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    }
}));
