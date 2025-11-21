import uuid
import os

async def generate_logo(prompt: str):
    folder = "logos"
    os.makedirs(folder, exist_ok=True)

    file = f"{folder}/{uuid.uuid4()}.txt"

    with open(file, "w") as f:
        f.write(f"Generated logo for prompt: {prompt}")

    return file
