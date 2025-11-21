from fastapi import FastAPI, WebSocket
from workflows.startup_builder import run_startup_workflow
from services.websocket_manager import ws_manager
from config import settings

app = FastAPI(title="CoFounderX Backend")

@app.get("/")
def health():
    return {"status": "OK", "project": "CoFounderX Backend"}

@app.post("/generate")
async def generate_startup(data: dict):
    """Trigger full multi-agent pipeline."""
    idea = data["idea"]
    result = await run_startup_workflow(idea)
    return result

@app.websocket("/ws/agents")
async def agent_stream(websocket: WebSocket):
    await ws_manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()  # client may send pings
    except:
        ws_manager.disconnect(websocket)
