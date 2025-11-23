# 🚀 CoFounderX - AI Startup Generator

**Transform your startup idea into a complete business toolkit in minutes.**

CoFounderX is a multi-agent AI system that simulates a real founding team. Enter your idea, and watch 6 specialized AI agents collaborate to create your business plan, branding, landing page, financial model, and investor pitch deck.

![CoFounderX Demo](https://img.shields.io/badge/Status-Live-green) ![Python](https://img.shields.io/badge/Python-3.10-blue) ![Groq](https://img.shields.io/badge/Groq-Llama--3.1-orange)

---

## ✨ Features

### 🤖 6 Specialized AI Agents

| Agent | Role | Output |
|-------|------|--------|
| 👔 **CEO** | Strategy & Vision | Business plan, target audience, revenue model |
| 📦 **Product** | Product Management | MVP features, user journey, success metrics |
| 🎨 **Branding** | Brand Identity | Brand name, logo colors, typography, tagline |
| ⚙️ **Engineer** | Technical Lead | Tech stack, timeline, **working HTML landing page** |
| 💰 **Finance** | Financial Planning | Startup costs, pricing, unit economics, break-even |
| 🎯 **Pitch** | Investor Relations | 10-slide pitch deck ready for investors |

### 🎯 Key Highlights

- **Real-time Agent Collaboration**: Watch agents work sequentially, each building on the previous agent's output
- **Production-Ready Landing Page**: Get actual HTML/CSS code you can deploy immediately
- **Investor Pitch Deck**: Professional 10-slide deck with market size, roadmap, and financials
- **Chat History**: Save and revisit up to 20 previous startup ideas
- **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Dark Mode UI**: Modern ChatGPT-style interface with glassmorphism

---

## 🏗️ Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| **AI Model** | Groq API (Llama 3.1 8B) | Fast inference, free tier, 128K context |
| **Backend** | Python + Flask | Simple, beginner-friendly, SSE streaming |
| **Frontend** | HTML + Tailwind CSS | No build step, CDN-based, responsive |
| **Deployment** | Hugging Face Spaces (Docker) | Free hosting, auto-deploy, persistent storage |

**No React. No complex setup. Just 4 files.**

---

## 📁 Project Structure

```
CoFounderX/
├── Dockerfile              # Docker config for HF Spaces
├── requirements.txt        # Python dependencies
├── app.py                 # Flask backend + agent logic
├── static/
│   ├── style.css          # All styling + mobile responsive
│   └── script.js          # Frontend logic + history
└── templates/
    └── index.html         # Main UI
```

**Total Lines of Code:** ~600 lines across all files

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/cofounderx.git
cd cofounderx
```

### 2. Get Groq API Key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up (free)
3. Create an API key
4. Copy the key (starts with `gsk_...`)

### 3. Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Set API key
export GROQ_API_KEY="your-key-here"

# Run the app
python app.py
```

Open `http://localhost:7860` in your browser.

### 4. Deploy to Hugging Face Spaces

1. Create a new Space at [huggingface.co/spaces](https://huggingface.co/spaces)
2. Select **Docker** as SDK
3. Upload all files
4. Add `GROQ_API_KEY` in **Settings → Repository Secrets**
5. Wait ~3 minutes for build
6. Done! Your app is live.

---

## 🎮 How It Works

### Multi-Agent Pipeline

```
User enters idea
      ↓
👔 CEO → Business strategy, target audience, revenue model
      ↓ (passes context)
📦 Product → MVP features, user journey, differentiator
      ↓ (passes context)
🎨 Branding → Brand name, colors, typography, tagline
      ↓ (passes context)
⚙️ Engineer → Tech stack + generates HTML landing page
      ↓ (passes context)
💰 Finance → Costs, pricing, unit economics, funding
      ↓ (passes context)
🎯 Pitch → 10-slide investor deck
      ↓
Complete startup toolkit delivered
```

### Context Passing

Each agent receives:
- The original startup idea
- All outputs from previous agents (truncated to fit context window)
- Specific instructions on what to deliver

This creates a **collaborative simulation** where each agent builds on the team's work.

---

## 💡 Example Outputs

### Input
> "An app that connects dog owners with trusted local dog walkers"

### Outputs

**👔 CEO Agent**
- Target: Urban pet owners aged 25-45, working professionals
- Revenue: Commission-based (20% per booking)
- Market: $10B pet services industry

**📦 Product Agent**
- Feature 1: Real-time GPS tracking of walks
- Feature 2: Walker background checks & reviews
- Feature 3: Automated scheduling & payments

**🎨 Branding Agent**
- Name: **PawStride**
- Colors: `#10b981` (green), `#f59e0b` (orange)
- Tagline: "Every walk, perfectly tracked"

**⚙️ Engineer Agent**
- Tech: React Native + Node.js + PostgreSQL
- Output: Complete landing page HTML (copy-paste ready)

**💰 Finance Agent**
- Startup costs: $15K (Year 1)
- Pricing: $8-12 per walk
- Break-even: 500 active users

**🎯 Pitch Agent**
- 10-slide deck with market size, traction, competition matrix

---

## 🎨 Screenshots

### Welcome Screen
![Welcome](https://github.com/user-attachments/assets/dbfb7fd3-6131-4d0b-a6c3-17027a08a2e6)

### Agent Collaboration View
![Agents](https://github.com/user-attachments/assets/4ebfc5aa-1768-4bd5-bd46-98015ea9a1d2)

### Generated Landing Page
![Landing](https://github.com/user-attachments/assets/f8056ca1-a543-4ad8-943c-8194de83ca3f)

### Pitch Deck
![Pitch](https://github.com/user-attachments/assets/0566beae-43a3-4825-847f-d00a91342dc7)

---

## 🛠️ Customization

### Add More Agents

Edit `app.py` and add to the `AGENTS` dictionary:

```python
"legal": {
    "emoji": "⚖️",
    "name": "Legal Agent",
    "prompt": """You are the Legal agent. Provide:
    - Business structure recommendation
    - Key legal considerations
    - IP protection strategy"""
}
```

Don't forget to update `agent_order` in the `generate()` function.

### Change AI Model

In `app.py`, line 123:

```python
model="llama-3.1-8b-instant",  # Change to llama-3.1-70b-versatile for better quality
```

### Adjust Context Window

In `app.py`, update `max_tokens` and `truncate_context()`:

```python
max_tokens = 3000  # Increase for longer outputs
```

---

## 📊 Performance

| Metric | Value |
|--------|-------|
| **Generation Time** | 30-60 seconds (6 agents) |
| **Cost per Run** | ~$0.001 (Groq free tier) |
| **Context Window** | 128K tokens (Llama 3.1) |
| **Mobile Score** | 95/100 (Lighthouse) |

---

## 🐛 Known Issues & Limitations

- **Landing Page Quality**: Llama 3.1 8B sometimes generates incomplete HTML. Use `llama-3.1-70b-versatile` for better results.
- **Context Overflow**: Very long agent outputs can cause the pitch agent to fail. Adjust `truncate_context()` if needed.
- **No File Uploads**: Currently doesn't support analyzing uploaded documents.
- **English Only**: Prompts optimized for English. Other languages may work but untested.

---

## 🤝 Contributing

Contributions are welcome! Here are some ideas:

- [ ] Add more agents (Legal, Marketing, HR)
- [ ] Support multiple AI providers (OpenAI, Anthropic)
- [ ] Export pitch deck as PDF
- [ ] Add voice input for ideas
- [ ] Multi-language support
- [ ] Save outputs to Google Drive

### How to Contribute

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🙏 Acknowledgments

- **Groq** for blazing-fast LLM inference
- **Hugging Face** for free hosting
- **Tailwind CSS** for beautiful styling
- **Llama 3.1** by Meta for the AI model

---

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!
