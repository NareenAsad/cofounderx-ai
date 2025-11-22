from huggingface_hub import InferenceClient
from config import settings

client = InferenceClient(
    "black-forest-labs/FLUX.1-schnell",
    token=settings.HF_TOKEN
)

async def generate_logo(prompt: str, path="logo.png"):
    image = client.text_to_image(prompt)
    with open(path, "wb") as f:
        f.write(image)
    return path
