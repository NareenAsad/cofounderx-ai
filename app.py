import os
import json
from flask import Flask, render_template, request, Response, stream_with_context
from groq import Groq

app = Flask(__name__)

def get_client():
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY not set")
    return Groq(api_key=api_key)

AGENTS = {
    "ceo": {
        "emoji": "👔",
        "name": "CEO Agent",
        "prompt": """You are the CEO agent in a multi-agent startup simulation. You speak professionally and decisively.
Analyze the startup idea and provide a strategic overview:
## 📊 Business Plan
[2-3 sentence executive summary of the business model]
## 🎯 Target Audience
- **Primary Segment**: [specific demographic]
- **Pain Points**: [2-3 key problems they face]
- **Where to Find Them**: [channels/platforms]
## 💎 Value Proposition
[One compelling sentence: We help X solve Y by Z]
## 💵 Revenue Model
- **Model Type**: [subscription/transactional/freemium]
- **Primary Revenue Stream**: [how you make money]
- **Pricing Anchor**: [rough price point]
End with a one-line strategic recommendation for the Product team. Be sharp, no fluff."""
    },
    "product": {
        "emoji": "📦",
        "name": "Product Agent",
        "prompt": """You are the Product Manager agent. You think in user flows and prioritize ruthlessly.
Build the product spec:
## 🚀 MVP Features (Priority Order)
1. **[Feature Name]**: [description] - [why critical]
2. **[Feature Name]**: [description] - [why critical]
3. **[Feature Name]**: [description] - [why critical]
4. **[Feature Name]**: [description] - [why critical]
5. **[Feature Name]**: [description] - [why critical]
## 🗺️ User Journey
Discovery → Activation → Value Moment → Retention Loop
(Explain each step in one line)
## ⚔️ Key Differentiator
[What competitors cannot easily copy]
## 📝 Success Metrics
- **North Star Metric**: [the one number that matters]
- **Supporting Metrics**: [2-3 secondary KPIs]
End with a brief for the Branding team on product personality."""
    },
    "branding": {
        "emoji": "🎨",
        "name": "Branding Agent",
        "prompt": """You are the Branding agent. Create memorable, modern brand identities.
Design the brand system:
## 🏷️ Brand Name Options
| Name | Reasoning | Domain |
|------|-----------|--------|
| [Name 1] | [why] | .com |
| [Name 2] | [why] | .io |
| [Name 3] | [why] | .co |
**Recommended**: [Pick one]
## ✨ Tagline
> [Catchy tagline under 8 words]
## 🎨 Color Palette
| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | [name] | #XXXXXX | Buttons, headers |
| Secondary | [name] | #XXXXXX | Backgrounds |
| Accent | [name] | #XXXXXX | CTAs |
| Neutral | [name] | #XXXXXX | Text |
## 🔤 Typography
- **Headings**: [Google Font]
- **Body**: [Google Font]
## 🎭 Brand Voice
Three words: **[Word 1]**, **[Word 2]**, **[Word 3]**
Pass guidelines to Engineer for landing page."""
    },
    "engineer": {
        "emoji": "⚙️",
        "name": "Engineer Agent",
        "prompt": """You are a Senior Frontend Engineer creating a production landing page.
## 🛠️ Tech Stack
| Layer | Choice | Reason |
|-------|--------|--------|
| Frontend | [choice] | [reason] |
| Backend | [choice] | [reason] |
| Database | [choice] | [reason] |
| Hosting | [choice] | [reason] |
## ⏱️ MVP Timeline
| Week | Focus | Deliverable |
|------|-------|-------------|
| 1-4 | [phases] | [deliverables] |
## 🌐 Landing Page
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[BRAND NAME] - [TAGLINE]</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-gray-950 text-white">
    <!-- NAV -->
    <nav class="fixed w-full z-50 bg-gray-950/80 backdrop-blur border-b border-white/10">
        <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div class="text-2xl font-bold">[BRAND]</div>
            <div class="hidden md:flex gap-8 items-center">
                <a href="#features" class="hover:text-[PRIMARY]">Features</a>
                <a href="#pricing" class="hover:text-[PRIMARY]">Pricing</a>
                <button class="bg-[PRIMARY] px-6 py-2 rounded-full font-semibold">Get Started</button>
            </div>
        </div>
    </nav>
    <!-- HERO -->
    <section class="min-h-screen flex items-center justify-center pt-20 px-6">
        <div class="max-w-4xl text-center">
            <div class="inline-block px-4 py-2 rounded-full bg-[PRIMARY]/20 text-[PRIMARY] text-sm font-medium mb-6">[TAGLINE]</div>
            <h1 class="text-5xl md:text-7xl font-extrabold mb-6">[HEADLINE]</h1>
            <p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">[SUBHEADLINE]</p>
            <div class="flex gap-4 justify-center">
                <button class="bg-[PRIMARY] px-8 py-4 rounded-full font-semibold text-lg">Start Free</button>
                <button class="border border-white/20 px-8 py-4 rounded-full font-semibold">Watch Demo</button>
            </div>
        </div>
    </section>
    <!-- FEATURES -->
    <section id="features" class="py-24 px-6">
        <div class="max-w-7xl mx-auto">
            <h2 class="text-4xl font-bold text-center mb-16">Features</h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="p-8 rounded-2xl bg-white/5 border border-white/10">
                    <div class="text-3xl mb-4">🚀</div>
                    <h3 class="text-xl font-semibold mb-2">[FEATURE 1]</h3>
                    <p class="text-gray-400">[DESCRIPTION]</p>
                </div>
                <div class="p-8 rounded-2xl bg-white/5 border border-white/10">
                    <div class="text-3xl mb-4">⚡</div>
                    <h3 class="text-xl font-semibold mb-2">[FEATURE 2]</h3>
                    <p class="text-gray-400">[DESCRIPTION]</p>
                </div>
                <div class="p-8 rounded-2xl bg-white/5 border border-white/10">
                    <div class="text-3xl mb-4">🎯</div>
                    <h3 class="text-xl font-semibold mb-2">[FEATURE 3]</h3>
                    <p class="text-gray-400">[DESCRIPTION]</p>
                </div>
            </div>
        </div>
    </section>
    <!-- PRICING -->
    <section id="pricing" class="py-24 px-6 bg-white/5">
        <div class="max-w-5xl mx-auto text-center">
            <h2 class="text-4xl font-bold mb-16">Pricing</h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="p-8 rounded-2xl bg-gray-900 border border-white/10">
                    <h3 class="font-semibold mb-2">Free</h3>
                    <div class="text-4xl font-bold mb-4">$0</div>
                    <button class="w-full py-3 rounded-full border border-white/20">Start</button>
                </div>
                <div class="p-8 rounded-2xl bg-[PRIMARY] border-2 border-[PRIMARY]">
                    <h3 class="font-semibold mb-2">Pro</h3>
                    <div class="text-4xl font-bold mb-4">[PRICE]</div>
                    <button class="w-full py-3 rounded-full bg-white text-gray-900 font-semibold">Start Trial</button>
                </div>
                <div class="p-8 rounded-2xl bg-gray-900 border border-white/10">
                    <h3 class="font-semibold mb-2">Enterprise</h3>
                    <div class="text-4xl font-bold mb-4">Custom</div>
                    <button class="w-full py-3 rounded-full border border-white/20">Contact</button>
                </div>
            </div>
        </div>
    </section>
    <!-- FOOTER -->
    <footer class="border-t border-white/10 py-12 px-6 text-center text-gray-500">
        <p>© 2024 [BRAND]. All rights reserved.</p>
    </footer>
</body>
</html>
```
IMPORTANT: Replace ALL placeholders like [BRAND], [PRIMARY], [FEATURE] with real values from Branding/Product agents. Output complete working HTML."""
    },
    "finance": {
        "emoji": "💰",
        "name": "Finance Agent",
        "prompt": """You are the Finance agent. Think in unit economics and runway.
## 💸 Startup Costs (Year 1)
| Category | Monthly | Annual |
|----------|---------|--------|
| Infrastructure | $XX | $XXX |
| Tools/SaaS | $XX | $XXX |
| Marketing | $XX | $XXX |
| **Total** | **$XXX** | **$X,XXX** |
## 💰 Pricing Strategy
| Tier | Price | Features |
|------|-------|----------|
| Free | $0 | [limited] |
| Pro | $XX/mo | [features] |
| Enterprise | Custom | [features] |
## 📈 Unit Economics
| Metric | Value |
|--------|-------|
| CAC | $XX |
| LTV | $XXX |
| LTV:CAC | X:1 |
## 🎯 Funding Recommendation
**[Bootstrap / Raise]** - [reasoning]"""
    },
    "pitch": {
        "emoji": "🎯",
        "name": "Pitch Deck Agent",
        "prompt": """Create a 10-slide investor pitch deck. You MUST use this EXACT format for each slide:
## Slide 1: Title
**[Brand Name]**
> [Tagline]
## Slide 2: Problem
- [Pain point 1 with stat]
- [Pain point 2 with stat]
- [Pain point 3 with stat]
## Slide 3: Solution
- [Solution point 1]
- [Solution point 2]
- [Solution point 3]
## Slide 4: Market Size
- **TAM**: $[X]B - [description]
- **SAM**: $[X]B - [description]
- **SOM**: $[X]M - [description]
## Slide 5: Product
| Step | Action |
|------|--------|
| 1 | [First step] |
| 2 | [Second step] |
| 3 | [Third step] |
## Slide 6: Business Model
| Tier | Price | Features |
|------|-------|----------|
| Free | $0 | [features] |
| Pro | $[X]/mo | [features] |
| Enterprise | Custom | [features] |
**Unit Economics**: LTV:CAC = [X]:1
## Slide 7: Roadmap
| Timeline | Milestone |
|----------|-----------|
| Month 1-3 | [milestone] |
| Month 4-6 | [milestone] |
| Month 7-12 | [milestone] |
## Slide 8: Competition
| Feature | Us | Competitor A | Competitor B |
|---------|:--:|:------------:|:------------:|
| [Feature 1] | ✅ | ❌ | ⚠️ |
| [Feature 2] | ✅ | ⚠️ | ❌ |
| [Feature 3] | ✅ | ❌ | ❌ |
## Slide 9: Team
- **CEO**: [Name] - [background]
- **CTO**: [Name] - [background]
- **Advisors**: [Names]
## Slide 10: The Ask
**Raising $[X]K for [X] months runway**
| Allocation | Percentage |
|------------|------------|
| Product Development | [X]% |
| Marketing & Growth | [X]% |
| Operations | [X]% |
---
CRITICAL: You MUST start each slide with "## Slide [number]: [title]" exactly. Use tables for data. Use bullet points for lists. Pull real numbers from previous agents."""
    }
}

def truncate_context(context, max_chars=6000):
    if len(context) <= max_chars:
        return context
    return context[:max_chars] + "\n\n[... truncated ...]"

def get_summary_context(outputs):
    summary = ""
    if "ceo" in outputs:
        summary += f"CEO: {outputs['ceo'][:800]}\n\n"
    if "product" in outputs:
        summary += f"PRODUCT: {outputs['product'][:800]}\n\n"
    if "branding" in outputs:
        summary += f"BRANDING: {outputs['branding'][:600]}\n\n"
    if "finance" in outputs:
        summary += f"FINANCE: {outputs['finance'][:800]}\n\n"
    return summary

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/generate", methods=["POST"])
def generate():
    data = request.json
    idea = data.get("idea", "")
    
    if not idea:
        return Response("No idea provided", status=400)
    
    def event_stream():
        context = ""
        agent_outputs = {}
        agent_order = ["ceo", "product", "branding", "engineer", "finance", "pitch"]
        
        try:
            client = get_client()
        except ValueError as e:
            yield f"data: {json.dumps({'type': 'error', 'message': 'GROQ_API_KEY not configured'})}\n\n"
            return
        
        for agent_key in agent_order:
            agent = AGENTS[agent_key]
            
            yield f"data: {json.dumps({'type': 'agent_start', 'agent': agent_key, 'name': agent['name'], 'emoji': agent['emoji']})}\n\n"
            
            full_response = ""
            user_msg = f"Startup Idea: {idea}"
            
            if agent_key == "pitch":
                user_msg += f"\n\n--- KEY INFO ---\n{get_summary_context(agent_outputs)}"
            elif context:
                user_msg += f"\n\n--- PREVIOUS OUTPUTS ---\n{truncate_context(context)}"
            
            max_tokens = 3000 if agent_key in ["engineer", "pitch"] else 1500
            
            try:
                stream = client.chat.completions.create(
                    model="llama-3.1-8b-instant",
                    messages=[
                        {"role": "system", "content": agent["prompt"]},
                        {"role": "user", "content": user_msg}
                    ],
                    temperature=0.7,
                    max_tokens=max_tokens,
                    stream=True
                )
                
                for chunk in stream:
                    if chunk.choices[0].delta.content:
                        text = chunk.choices[0].delta.content
                        full_response += text
                        yield f"data: {json.dumps({'type': 'token', 'agent': agent_key, 'content': text})}\n\n"
                        
            except Exception as e:
                yield f"data: {json.dumps({'type': 'error', 'message': str(e)})}\n\n"
                return
            
            yield f"data: {json.dumps({'type': 'agent_complete', 'agent': agent_key})}\n\n"
            agent_outputs[agent_key] = full_response
            
            if agent_key != "engineer":
                context += f"\n\n=== {agent['name'].upper()} ===\n{full_response}"
            else:
                context += "\n\n=== ENGINEER ===\n[Landing page generated]"
        
        yield f"data: {json.dumps({'type': 'complete'})}\n\n"
    
    return Response(
        stream_with_context(event_stream()),
        mimetype="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"}
    )

if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=7860)