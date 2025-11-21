import Link from "next/link"
import { ArrowRight, Sparkles, Users, Zap, Download } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white font-bold">C</div>
            <span className="font-bold text-xl text-text-primary">CoFounderX</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/signin" className="btn-secondary">
              Sign In
            </Link>
            <Link href="/dashboard" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 bg-surface border border-border rounded-full px-4 py-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-text-secondary">AI-Powered Startup Building</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-text-primary">
            Build Your Startup with <span className="text-accent">AI Co-Founders</span>
          </h1>

          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Collaborate with AI agents in real-time. Generate business plans, brand identities, and deploy your idea
            faster than ever.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/dashboard/workspace" className="btn-primary inline-flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Start Building
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/dashboard" className="btn-secondary inline-flex items-center justify-center gap-2">
              View Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-4 mt-16">
            <div className="card border-l-4 border-l-accent">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-text-primary">Fast Iteration</h3>
              </div>
              <p className="text-text-secondary text-sm">Generate complete startup plans in minutes, not weeks.</p>
            </div>

            <div className="card border-l-4 border-l-accent">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-text-primary">Real-Time Collaboration</h3>
              </div>
              <p className="text-text-secondary text-sm">Watch AI agents collaborate and refine your ideas live.</p>
            </div>

            <div className="card border-l-4 border-l-accent">
              <div className="flex items-center gap-3 mb-3">
                <Download className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-text-primary">Ready to Deploy</h3>
              </div>
              <p className="text-text-secondary text-sm">Export complete startup bundles with all deliverables.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-surface py-16 border-y border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">3x</div>
              <p className="text-text-secondary">Faster to Market</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">1000+</div>
              <p className="text-text-secondary">Startups Built</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">99%</div>
              <p className="text-text-secondary">Success Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">24/7</div>
              <p className="text-text-secondary">AI Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-text-muted text-sm">
          <p>© 2025 CoFounderX. Built for founders, by founders.</p>
        </div>
      </footer>
    </div>
  )
}
