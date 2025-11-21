import httpx

GROQ_API_KEY = "YOUR_GROQ_API_KEY"

async def groq_chat(prompt: str):
    url = "https://api.groq.com/v1/chat/completions"
    headers = {"Authorization": f"Bearer {GROQ_API_KEY}"}

    payload = {
        "model": "mixtral-8x7b",
        "messages": [{"role": "user", "content": prompt}]
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload, headers=headers)

    data = response.json()
    return data["choices"][0]["message"]["content"]
