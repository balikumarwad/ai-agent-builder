import type { AgentData } from '../types'
import { DraggableCard } from './DraggableCard'
import { Cpu, Layers, Bot } from 'lucide-react'

interface SidebarProps {
  data: AgentData
  selectedProfile: string
  selectedProvider: string
  theme: 'dark' | 'light'
  onProfileChange: (profileId: string) => void
  onProviderChange: (provider: string) => void
}

export function Sidebar({
  data,
  selectedProfile,
  selectedProvider,
  theme,
  onProfileChange,
  onProviderChange,
}: SidebarProps) {
  const isDark = theme === 'dark'
  const containerClass = isDark
    ? 'flex h-full flex-col rounded-[2rem] border border-slate-800/70 bg-slate-950/40 p-6 shadow-[0_30px_80px_-50px_rgba(56,189,248,0.6)] backdrop-blur-xl text-slate-100'
    : 'flex h-full flex-col rounded-[2rem] border border-slate-200/80 bg-slate-100/90 p-6 shadow-[0_30px_80px_-50px_rgba(148,163,184,0.12)] text-slate-950'
  const cardClass = isDark
    ? 'rounded-[1.75rem] border border-slate-800/70 bg-slate-950/70 shadow-inner shadow-slate-950/30'
    : 'rounded-[1.75rem] border border-slate-200 bg-white/90 shadow-inner shadow-slate-200/40'
  const selectClass = isDark
    ? 'w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
    : 'w-full rounded-2xl border border-slate-300 bg-slate-100 px-3 py-3 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20'
  const labelClass = isDark ? 'flex items-center gap-2 text-sm font-semibold text-slate-300' : 'flex items-center gap-2 text-sm font-semibold text-slate-700'
  const textClass = isDark ? 'text-xs text-slate-500' : 'text-xs text-slate-500'
  const titleClass = isDark ? 'text-sm font-semibold text-slate-300' : 'text-sm font-semibold text-slate-700'

  return (
    <section className={containerClass}>
      <div className="mb-8">
        <div className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] ${isDark ? 'bg-white/5 text-slate-300 shadow-sm shadow-slate-950/30' : 'bg-slate-200/60 text-slate-700 shadow-sm shadow-slate-200/30'}`}>
          Configuration
        </div>
      </div>

      {data && (
        <div className="flex flex-col gap-6">
          <div className={`${cardClass} space-y-3 p-4`}>
            <label htmlFor="profile-select" className={labelClass}>
              <Bot className={isDark ? 'w-4 h-4 text-cyan-300' : 'w-4 h-4 text-sky-500'} />
              <span>Base Profile</span>
            </label>
            <select
              id="profile-select"
              value={selectedProfile}
              onChange={(e) => onProfileChange(e.target.value)}
              className={selectClass}
            >
              <option value="" className={isDark ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-950'}>-- Select a Profile --</option>
              {data.agentProfiles.map((p) => (
                <option key={p.id} value={p.id} className={isDark ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-950'}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <div className={`${cardClass} p-4`}>
              <div className={`flex items-center ${titleClass}`}>
                <span className="flex items-center gap-2">
                  <Cpu className={isDark ? 'w-4 h-4 text-cyan-300' : 'w-4 h-4 text-sky-500'} />
                  Available Skills
                </span>
              </div>
              <p className={textClass}>Drag skills to add them to your agent</p>
              <div className="mt-4 max-h-72 space-y-3 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {data.skills.map((s) => (
                  <DraggableCard
                    key={s.id}
                    id={s.id}
                    name={s.name}
                    category={s.category}
                    description={s.description}
                    type="skill"
                    theme={theme}
                  />
                ))}
              </div>
            </div>

            <div className={`${cardClass} p-4`}>
              <div className={`flex items-center ${titleClass}`}>
                <span className="flex items-center gap-2">
                  <Layers className={isDark ? 'w-4 h-4 text-cyan-300' : 'w-4 h-4 text-sky-500'} />
                  Available Layers
                </span>
              </div>
              <p className={textClass}>Drag layers to enhance your agent</p>
              <div className="mt-4 max-h-72 space-y-3 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {data.layers.map((l) => (
                  <DraggableCard
                    key={l.id}
                    id={l.id}
                    name={l.name}
                    category={l.type}
                    description={l.description}
                    type="layer"
                    theme={theme}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className={`${cardClass} p-4`}>
            <div className="flex flex-col gap-3">
              <label htmlFor="provider-select" className={labelClass}>
                <Bot className={isDark ? 'w-4 h-4 text-cyan-300' : 'w-4 h-4 text-sky-500'} />
                <span>AI Provider</span>
              </label>
              <select
                id="provider-select"
                value={selectedProvider}
                onChange={(e) => onProviderChange(e.target.value)}
                className={selectClass}
              >
                <option value="" className={isDark ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-950'}>-- Select an AI Provider --</option>
                {['Gemini', 'ChatGPT', 'Kimi', 'Claude', 'DeepSeek'].map((provider) => (
                  <option key={provider} value={provider} className={isDark ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-950'}>{provider}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
