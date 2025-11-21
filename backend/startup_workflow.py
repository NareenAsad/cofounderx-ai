from agents.ceo_agent import CEOAgent
from agents.product_agent import ProductAgent
from agents.branding_agent import BrandingAgent
from agents.engineer_agent import EngineerAgent
from agents.finance_agent import FinanceAgent

from services.groq_llm import groq_chat
from services.websocket_manager import ws_manager
from services.logo_generator import generate_logo


async def run_startup_workflow(idea: str):

    ceo = CEOAgent("CEO", groq_chat)
    product = ProductAgent("Product", groq_chat)
    branding = BrandingAgent("Branding", groq_chat)
    engineer = EngineerAgent("Engineer", groq_chat)
    finance = FinanceAgent("Finance", groq_chat)

    agents = [ceo, product, branding, engineer, finance]
    results = {}

    for agent in agents:
        await ws_manager.broadcast(f"{agent.name} thinking...")
        out = await agent.run(idea)
        results[agent.name] = out
        await ws_manager.broadcast(f"{agent.name} → DONE")

    logo_path = await generate_logo(f"logo for {idea}")
    results["logo"] = logo_path

    return results
