class BaseAgent:
    def __init__(self, name: str, llm):
        self.name = name
        self.llm = llm

    async def run(self, idea: str):
        prompt = f"You are {self.name}. Based on the idea below, give your response.\n\nIdea: {idea}"
        return await self.llm(prompt)
