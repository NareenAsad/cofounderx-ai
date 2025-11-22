from groq import Groq
from config import settings

client = Groq(api_key=settings.GROQ_API_KEY)

async def groq_chat(prompt):
    response = client.chat.completions.create(
        model="llama-3.1-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message["content"]
