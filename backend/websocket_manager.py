class WebSocketManager:
    def __init__(self):
        self.connections = set()

    async def connect(self, websocket):
        await websocket.accept()
        self.connections.add(websocket)

    def disconnect(self, websocket):
        self.connections.remove(websocket)

    async def broadcast(self, message: str):
        for ws in list(self.connections):
            await ws.send_text(message)

ws_manager = WebSocketManager()
