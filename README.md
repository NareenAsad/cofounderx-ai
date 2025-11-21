# CoFounderX - AI-Powered Startup Builder

CoFounderX is a modern SaaS platform that empowers founders to build their startups with AI co-founders. Collaborate with intelligent AI agents in real-time, generate comprehensive business plans, create brand identities, and deploy your ideas faster than ever.

## Features

- **🚀 Fast Iteration** - Generate complete startup plans in minutes, not weeks
- **👥 Real-Time Collaboration** - Watch AI agents collaborate and refine your ideas live
- **📦 Ready to Deploy** - Export complete startup bundles with all deliverables
- **🎨 Branding Kit** - AI-generated brand identities with colors, typography, and voice
- **📊 Dashboard** - Manage workspaces, track progress, and monitor AI agents
- **💾 Bundle Generation** - Download packaged startups with all deliverables

## Tech Stack

- **Frontend**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4 with semantic design tokens
- **UI Components**: shadcn/ui with custom components
- **Authentication**: Designed for integration with your auth system
- **API**: Mock endpoints ready to connect to FastAPI backend

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd cofounderx
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
cofounderx/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles and design tokens
│   ├── dashboard/               # Dashboard pages
│   │   ├── page.tsx             # Dashboard home
│   │   ├── workspace/           # Workspace management
│   │   │   ├── page.tsx         # Workspace list
│   │   │   └── [id]/            # Individual workspace
│   │   ├── collaboration/       # Real-time collaboration viewer
│   │   └── branding/            # Branding kit viewer
│   └── api/                     # API routes (mock endpoints)
│       ├── workspace/           # Workspace CRUD operations
│       ├── collaboration/       # Real-time messaging
│       ├── agents/              # Agent status and actions
│       ├── bundle/              # Bundle generation and download
│       └── auth/                # Authentication callbacks
├── components/
│   ├── dashboard/               # Dashboard-specific components
│   │   ├── sidebar.tsx          # Navigation sidebar
│   │   ├── header.tsx           # Top header
│   │   ├── agent-card.tsx       # AI agent display
│   │   └── export-modal.tsx     # Bundle export modal
│   └── ui/                      # shadcn/ui components
├── hooks/                       # Custom React hooks
├── lib/                         # Utilities and helpers
└── public/                      # Static assets

\`\`\`

## API Routes

The project includes mock API routes that are structured to proxy requests to your FastAPI backend:

### Workspace Management
- `GET /api/workspace` - List all workspaces
- `POST /api/workspace` - Create new workspace
- `GET /api/workspace/[id]` - Get workspace details
- `PUT /api/workspace/[id]` - Update workspace
- `DELETE /api/workspace/[id]` - Delete workspace

### Real-Time Collaboration
- `GET /api/collaboration/messages` - Get collaboration messages
- `POST /api/collaboration/messages` - Send message to agents
- `WS /api/collaboration/ws` - WebSocket for real-time updates

### AI Agents
- `GET /api/agents/status` - Get agent status and progress
- `POST /api/agents/[id]/action` - Trigger agent action

### Bundle Generation
- `POST /api/bundle/generate` - Start bundle generation
- `GET /api/bundle/download` - Download generated startup bundle

### Authentication
- `POST /api/auth/callback` - Auth callback handler

## Connecting to FastAPI Backend

### 1. Update API Routes

Replace the mock endpoints in `/app/api/*` files with actual backend calls. Example:

\`\`\`typescript
// app/api/workspace/route.ts
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/workspace`, {
      headers: {
        'Authorization': `Bearer ${process.env.BACKEND_API_KEY}`
      }
    })
    return response
  } catch (error) {
    return Response.json({ error: 'Failed to fetch workspaces' }, { status: 500 })
  }
}
\`\`\`

### 2. Environment Variables

Add to your `.env.local`:

\`\`\`env
# Backend configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api
BACKEND_API_KEY=your_api_key_here

# For production
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
\`\`\`

### 3. Update WebSocket Connection

For real-time collaboration, update the WebSocket connection in components:

\`\`\`typescript
const ws = new WebSocket(
  `${process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000'}/ws/collaboration`
)
\`\`\`

### 4. Authentication Middleware

Update `/app/api/auth/callback/route.ts` to handle your authentication flow and set proper headers for all API requests.

## Design System

CoFounderX uses a modern dark theme with semantic design tokens:

- **Primary Color**: Vibrant Blue (oklch 0.6 0.2 264) - Used for primary actions and accents
- **Background**: Deep Navy (oklch 0.08 0 0) - Main background
- **Surface**: Dark Gray (oklch 0.12 0 0) - Cards and elevated surfaces
- **Text**: Off-white (oklch 0.97 0 0) - Primary text
- **Border**: Subtle Gray (oklch 0.2 0 0) - Borders and dividers

All colors use OKLCh color space for perceptually uniform colors and better accessibility.

## Development

### Available Scripts

\`\`\`bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
\`\`\`

### Adding New Pages

1. Create a new file in `app/[route]/page.tsx`
2. Use the layout system for consistent sidebar and header
3. Follow the design system with semantic CSS classes

### Adding New Components

1. Create component in `components/`
2. Use shadcn/ui components as building blocks
3. Apply design tokens via Tailwind classes

## Deployment

### Deploy to Vercel (Recommended)

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Environment Variables on Vercel

Set in your Vercel project settings:
- `NEXT_PUBLIC_API_URL` - Your FastAPI backend URL
- `BACKEND_API_KEY` - API key for backend authentication

### Custom Deployment

1. Build the project: `npm run build`
2. Deploy the `.next` folder to your hosting platform
3. Set environment variables on your hosting platform

## Architecture Notes

The frontend is designed to be:
- **Stateless** - No backend state stored, all data flows through API routes
- **Real-time Ready** - WebSocket integration points for live collaboration
- **Scalable** - Modular component structure for easy feature additions
- **Type-Safe** - Full TypeScript support for API contracts

## Next Steps

1. Connect your FastAPI backend by updating the `/app/api` routes
2. Implement authentication with your auth system
3. Add environment variables for your backend
4. Test the integration with your AI agents
5. Deploy to production

