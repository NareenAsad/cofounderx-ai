import { useEffect, useRef, useState } from "react";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL;

export function useAgentWS(onMessage: (data: any) => void) {
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket(WS_URL);

        ws.current.onopen = () => console.log("WebSocket connected");
        ws.current.onmessage = (event) => onMessage(JSON.parse(event.data));
        ws.current.onclose = () => console.log("WebSocket disconnected");

        return () => ws.current?.close();
    }, [onMessage]);

    const sendMessage = (message: any) => ws.current?.send(JSON.stringify(message));

    return { sendMessage };
}
