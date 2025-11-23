let agentOutputs = {};
let landingHTML = "";
let history = JSON.parse(localStorage.getItem('cofounderx_history') || '[]');
let currentSessionId = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderHistory();
    handleMobileResize();
});

// Handle window resize
window.addEventListener('resize', handleMobileResize);

function handleMobileResize() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (window.innerWidth > 768) {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.toggle('mobile-open');
    overlay.classList.toggle('active');
}

function renderHistory() {
    const list = document.getElementById('historyList');
    list.innerHTML = history.map((item) => `
        <div class="sidebar-item rounded-lg px-3 py-2.5 cursor-pointer transition flex items-center justify-between group ${currentSessionId === item.id ? 'active' : ''}" onclick="loadSession('${item.id}')">
            <div class="flex-1 min-w-0">
                <p class="text-sm truncate">${item.idea.slice(0, 35)}${item.idea.length > 35 ? '...' : ''}</p>
                <p class="text-xs text-gray-500 mt-0.5">${item.date}</p>
            </div>
            <button onclick="event.stopPropagation(); deleteSession('${item.id}')" class="history-delete p-1.5 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
        </div>
    `).join('');
}

function deleteSession(id) {
    if (!confirm('Delete this startup idea?')) return;
    history = history.filter(h => h.id !== id);
    localStorage.setItem('cofounderx_history', JSON.stringify(history));
    if (currentSessionId === id) newChat();
    renderHistory();
}

function saveToHistory(idea, outputs) {
    const session = {
        id: Date.now().toString(),
        idea: idea,
        outputs: outputs,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
    history.unshift(session);
    if (history.length > 20) history.pop();
    localStorage.setItem('cofounderx_history', JSON.stringify(history));
    currentSessionId = session.id;
    renderHistory();
}

function loadSession(id) {
    const session = history.find(h => h.id === id);
    if (!session) return;
    
    // Close mobile sidebar
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
    
    currentSessionId = id;
    renderHistory();
    
    document.getElementById('welcomeScreen').classList.add('hidden');
    document.getElementById('chatArea').classList.remove('hidden');
    document.getElementById('topBar').classList.remove('hidden');
    document.getElementById('tabsContainer').classList.remove('hidden');
    document.getElementById('userIdea').classList.remove('hidden');
    document.getElementById('userIdeaText').textContent = session.idea;
    
    const chatStream = document.getElementById('chatStream');
    chatStream.innerHTML = '';
    agentOutputs = session.outputs;
    
    const agentOrder = ["ceo", "product", "branding", "engineer", "finance", "pitch"];
    const agentMeta = {
        ceo: { emoji: "👔", name: "CEO Agent" },
        product: { emoji: "📦", name: "Product Agent" },
        branding: { emoji: "🎨", name: "Branding Agent" },
        engineer: { emoji: "⚙️", name: "Engineer Agent" },
        finance: { emoji: "💰", name: "Finance Agent" },
        pitch: { emoji: "🎯", name: "Pitch Deck Agent" }
    };
    
    agentOrder.forEach(agent => {
        if (agentOutputs[agent]) {
            document.getElementById(`pill-${agent}`).classList.remove('waiting', 'active');
            document.getElementById(`pill-${agent}`).classList.add('done');
            addChatBubble(agent, agentMeta[agent].emoji, agentMeta[agent].name);
            document.getElementById(`bubble-content-${agent}`).innerHTML = marked.parse(agentOutputs[agent]);
        }
    });
    
    const html = extractHTML(agentOutputs.engineer || '');
    if (html) {
        landingHTML = html;
        document.getElementById('landingPreview').srcdoc = html;
        document.querySelector('#landingCode code').textContent = html;
    }
    
    if (agentOutputs.pitch) {
        document.getElementById('pitchContent').innerHTML = formatPitchDeck(agentOutputs.pitch);
    }
    
    showTab('chat');
}

function newChat() {
    currentSessionId = null;
    agentOutputs = {};
    landingHTML = "";
    
    document.getElementById('welcomeScreen').classList.remove('hidden');
    document.getElementById('chatArea').classList.add('hidden');
    document.getElementById('topBar').classList.add('hidden');
    document.getElementById('tabsContainer').classList.add('hidden');
    document.getElementById('view-landing').classList.add('hidden');
    document.getElementById('view-pitch').classList.add('hidden');
    document.getElementById('chatStream').innerHTML = '';
    document.getElementById('ideaInput').value = '';
    document.getElementById('userIdea').classList.add('hidden');
    
    document.querySelectorAll('.agent-pill').forEach(p => {
        p.classList.remove('active', 'done');
        p.classList.add('waiting');
    });
    
    renderHistory();
}

function useExample(idea) {
    document.getElementById('ideaInput').value = idea;
    autoResize(document.getElementById('ideaInput'));
    generate();
}

function handleKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        generate();
    }
}

function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 200) + 'px';
}

function showTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${tab}`).classList.add('active');
    
    document.getElementById('chatArea').classList.add('hidden');
    document.getElementById('view-landing').classList.add('hidden');
    document.getElementById('view-pitch').classList.add('hidden');
    
    if (tab === 'chat') document.getElementById('chatArea').classList.remove('hidden');
    if (tab === 'landing') document.getElementById('view-landing').classList.remove('hidden');
    if (tab === 'pitch') document.getElementById('view-pitch').classList.remove('hidden');
}

function showLandingPreview() {
    document.getElementById('landingPreview').classList.remove('hidden');
    document.getElementById('landingCode').classList.add('hidden');
    document.getElementById('btn-preview').classList.add('bg-green-600');
    document.getElementById('btn-code').classList.remove('bg-green-600');
}

function showLandingCode() {
    document.getElementById('landingPreview').classList.add('hidden');
    document.getElementById('landingCode').classList.remove('hidden');
    document.getElementById('btn-code').classList.add('bg-green-600');
    document.getElementById('btn-preview').classList.remove('bg-green-600');
}

function downloadLanding() {
    if (!landingHTML) return alert('No landing page generated yet');
    const blob = new Blob([landingHTML], {type: 'text/html'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'landing-page.html';
    a.click();
}

function addChatBubble(agent, emoji, name) {
    const chat = document.getElementById('chatStream');
    const bubble = document.createElement('div');
    bubble.className = 'message-in';
    bubble.id = `bubble-${agent}`;
    bubble.innerHTML = `
        <div class="flex gap-4">
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-lg shrink-0">${emoji}</div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-green-400 mb-2">${name}</p>
                <div class="bubble-box">
                    <div id="bubble-content-${agent}" class="prose prose-invert prose-sm max-w-none text-gray-300"></div>
                </div>
            </div>
        </div>
    `;
    chat.appendChild(bubble);
    chat.scrollTop = chat.scrollHeight;
}

function extractHTML(text) {
    const match = text.match(/```html\n?([\s\S]*?)```/);
    return match ? match[1].trim() : null;
}

function formatPitchDeck(markdown) {
    const patterns = [
        /##\s*Slide\s*(\d+)[:\s-]*([^\n]*)/gi,
        /\*\*Slide\s*(\d+)[:\s-]*([^\*]*)\*\*/gi,
        /Slide\s*(\d+)[:\s-]+([^\n]*)/gi
    ];
    
    let matches = [];
    for (const pattern of patterns) {
        matches = [...markdown.matchAll(pattern)];
        if (matches.length >= 5) break;
    }
    
    if (matches.length < 3) {
        const fallbackMatches = markdown.split(/(?=Slide\s*\d+)/i);
        if (fallbackMatches.length > 3) {
            return fallbackMatches.map((section, i) => {
                if (i === 0 && !section.toLowerCase().includes('slide')) return '';
                const titleMatch = section.match(/Slide\s*(\d+)[:\s-]*([^\n]*)/i);
                const num = titleMatch ? titleMatch[1] : i;
                const title = titleMatch ? titleMatch[2].trim() : 'Slide';
                const content = titleMatch ? section.slice(titleMatch[0].length).trim() : section;
                const icons = {'1':'🎯','2':'😤','3':'💡','4':'📈','5':'📱','6':'💰','7':'🗓️','8':'⚔️','9':'👥','10':'🚀'};
                return `
                    <div class="pitch-slide">
                        <h2 data-slide="Slide ${num}">${icons[num] || '📊'} ${title}</h2>
                        <div class="prose prose-invert prose-sm max-w-none">${marked.parse(content)}</div>
                    </div>
                `;
            }).filter(s => s).join('');
        }
        return `<div class="prose prose-invert max-w-none pitch-fallback">${marked.parse(markdown)}</div>`;
    }
    
    const slides = matches.map((match, i) => {
        const slideNum = match[1];
        const slideTitle = match[2].replace(/\*\*/g, '').trim();
        const startIndex = match.index + match[0].length;
        const endIndex = matches[i + 1] ? matches[i + 1].index : markdown.length;
        const content = markdown.slice(startIndex, endIndex).trim();
        return { num: slideNum, title: slideTitle, content };
    });
    
    const slideIcons = {
        '1': '🎯', '2': '😤', '3': '💡', '4': '📈', '5': '📱',
        '6': '💰', '7': '🗓️', '8': '⚔️', '9': '👥', '10': '🚀'
    };
    
    return slides.map(slide => `
        <div class="pitch-slide">
            <h2 data-slide="Slide ${slide.num}">${slideIcons[slide.num] || '📊'} ${slide.title}</h2>
            <div class="prose prose-invert prose-sm max-w-none">${marked.parse(slide.content)}</div>
        </div>
    `).join('');
}

async function generate() {
    const idea = document.getElementById('ideaInput').value.trim();
    if (!idea) return;
    
    // Close mobile sidebar if open
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        if (sidebar.classList.contains('mobile-open')) {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('active');
        }
    }
    
    agentOutputs = {};
    landingHTML = "";
    document.getElementById('chatStream').innerHTML = '';
    
    document.getElementById('welcomeScreen').classList.add('hidden');
    document.getElementById('chatArea').classList.remove('hidden');
    document.getElementById('topBar').classList.remove('hidden');
    
    document.getElementById('userIdea').classList.remove('hidden');
    document.getElementById('userIdeaText').textContent = idea;
    
    document.querySelectorAll('.agent-pill').forEach(p => {
        p.classList.remove('active', 'done');
        p.classList.add('waiting');
    });
    
    const btn = document.getElementById('generateBtn');
    btn.disabled = true;
    document.getElementById('sendIcon').classList.add('hidden');
    document.getElementById('loadingIcon').classList.remove('hidden');
    
    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({idea})
        });
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        
        while (true) {
            const {done, value} = await reader.read();
            if (done) break;
            
            buffer += decoder.decode(value, {stream: true});
            const lines = buffer.split('\n\n');
            buffer = lines.pop();
            
            for (const line of lines) {
                if (!line.startsWith('data: ')) continue;
                const data = JSON.parse(line.slice(6));
                
                if (data.type === 'agent_start') {
                    document.getElementById(`pill-${data.agent}`).classList.remove('waiting');
                    document.getElementById(`pill-${data.agent}`).classList.add('active');
                    addChatBubble(data.agent, data.emoji, data.name);
                    agentOutputs[data.agent] = "";
                }
                else if (data.type === 'token') {
                    agentOutputs[data.agent] += data.content;
                    const el = document.getElementById(`bubble-content-${data.agent}`);
                    el.innerHTML = marked.parse(agentOutputs[data.agent]);
                    el.querySelectorAll('pre code').forEach(b => hljs.highlightElement(b));
                    document.getElementById('chatStream').scrollTop = document.getElementById('chatStream').scrollHeight;
                }
                else if (data.type === 'agent_complete') {
                    document.getElementById(`pill-${data.agent}`).classList.remove('active');
                    document.getElementById(`pill-${data.agent}`).classList.add('done');
                    
                    if (data.agent === 'engineer') {
                        const html = extractHTML(agentOutputs[data.agent]);
                        if (html) {
                            landingHTML = html;
                            document.getElementById('landingPreview').srcdoc = html;
                            document.querySelector('#landingCode code').textContent = html;
                            hljs.highlightElement(document.querySelector('#landingCode code'));
                        }
                    }
                    if (data.agent === 'pitch') {
                        document.getElementById('pitchContent').innerHTML = formatPitchDeck(agentOutputs[data.agent]);
                    }
                }
                else if (data.type === 'complete') {
                    document.getElementById('tabsContainer').classList.remove('hidden');
                    saveToHistory(idea, agentOutputs);
                }
                else if (data.type === 'error') {
                    alert('Error: ' + data.message);
                }
            }
        }
    } catch (err) {
        alert('Error: ' + err.message);
    } finally {
        btn.disabled = false;
        document.getElementById('sendIcon').classList.remove('hidden');
        document.getElementById('loadingIcon').classList.add('hidden');
        document.getElementById('ideaInput').value = '';
        autoResize(document.getElementById('ideaInput'));
    }
}