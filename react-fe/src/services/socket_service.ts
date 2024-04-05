import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_API_ORIGIN!, {
    reconnection: true,
    reconnectionDelay: 1000, // Time to wait before attempting to reconnect (in milliseconds)
    reconnectionDelayMax: 5000, // Maximum reconnection delay (in milliseconds)
    reconnectionAttempts: Infinity,
});

export const initSocket = (cb?: (data: { message: string }) => void) => {
    if (!socket.connected) {
        socket.connect()
    }
    socket.on("message", (data) => {
        !!cb && cb(data)
    });

    socket.on("disconnect", () => {
        socket.off();
    });


    return socket;
};