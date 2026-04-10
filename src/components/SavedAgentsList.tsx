import type { AgentData, SavedAgent } from '../types'
import { Trash2, Upload, Cpu, Layers, Bot } from 'lucide-react'

interface SavedAgentsListProps {
  savedAgents: SavedAgent[]
  data: AgentData
  theme: 'dark' | 'light'
  onLoadAgent: (agent: SavedAgent) => void
  onDeleteAgent: (id: string) => void
  onClearAll: () => void
}

export function SavedAgentsList({
  savedAgents,
  data,
  theme,
  onLoadAgent,
  onDeleteAgent,
  onClearAll,
}: SavedAgentsListProps) {
  const isDark = theme === 'dark'
  const sectionClass = isDark
    ? 'rounded-[2rem] border border-slate-800/70 bg-slate-950/35 p-6 shadow-[0_30px_80px_-55px_rgba(59,130,246,0.7)] backdrop-blur-xl'
    : 'rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_30px_80px_-55px_rgba(148,163,184,0.12)] backdrop-blur-xl'
  const headerTextClass = isDark ? 'text-xl font-semibold text-slate-100' : 'text-xl font-semibold text-slate-950'
  const subtitleTextClass = isDark ? 'text-sm text-slate-500' : 'text-sm text-slate-600'
  const buttonClass = isDark
    ? 'rounded-3xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500'
    : 'rounded-3xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-400'
  const cardClass = isDark
    ? 'rounded-[1.75rem] border border-slate-800/70 bg-slate-900/80 p-5 shadow-[0_18px_45px_-20px_rgba(56,189,248,0.35)] transition hover:border-slate-600'
    : 'rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_-20px_rgba(15,23,42,0.06)] transition hover:border-slate-300'
  const textClass = isDark ? 'text-slate-100' : 'text-slate-950'
  const labelClass = isDark ? 'text-slate-400' : 'text-slate-500'

  return (
    <section className={sectionClass}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Bot className={isDark ? 'w-6 h-6 text-cyan-300' : 'w-6 h-6 text-sky-500'} />
          <div>
            <h2 className={headerTextClass}>My Agents</h2>
            <p className={subtitleTextClass}>Load saved builds quickly and keep your best agents ready.</p>
          </div>
        </div>
        {savedAgents.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear all saved agents?')) {
                onClearAll()
              }
            }}
            className={buttonClass}
          >
            Clear All
          </button>
        )}
      </div>
      {savedAgents.length === 0 ? (
        <div className={isDark ? 'rounded-[1.75rem] border border-slate-800/70 bg-slate-900/80 p-8 text-slate-400' : 'rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8 text-slate-500'}>
          <p className="text-sm leading-6">
            You don't have any saved agents yet. Save your first agent to keep it here for quick access and reuse.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {savedAgents.map((agent) => (
            <div key={agent.id} className={cardClass}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className={textClass}>{agent.name}</h3>
                <button
                  onClick={() => onDeleteAgent(agent.id)}
                  className={isDark
                    ? 'rounded-full border border-slate-700/80 bg-slate-950/80 p-2 text-slate-300 transition hover:bg-red-600/20 hover:text-red-300'
                    : 'rounded-full border border-slate-300 bg-white p-2 text-slate-600 transition hover:bg-red-500/10 hover:text-red-600'
                  }
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className={isDark ? 'grid gap-2 text-sm text-slate-300 md:grid-cols-2 mb-4' : 'grid gap-2 text-sm text-slate-600 md:grid-cols-2 mb-4'}>
                <div className="flex items-center gap-2">
                  <Bot className={isDark ? 'w-4 h-4 text-slate-400' : 'w-4 h-4 text-slate-500'} />
                  <span>{data?.agentProfiles.find(p => p.id === agent.profileId)?.name || 'Unknown'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={labelClass}>Provider:</span>
                  <span className={textClass}>{agent.provider || 'None'}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {agent.skillIds?.map(skillId => {
                  const skill = data?.skills.find(s => s.id === skillId)
                  return skill ? (
                    <span key={skillId} className="inline-flex items-center gap-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
                      <Cpu className="w-3 h-3" />
                      {skill.name}
                    </span>
                  ) : null
                })}
                {agent.layerIds?.map(layerId => {
                  const layer = data?.layers.find(l => l.id === layerId)
                  return layer ? (
                    <span key={layerId} className="inline-flex items-center gap-1 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-200">
                      <Layers className="w-3 h-3" />
                      {layer.name}
                    </span>
                  ) : null
                })}
              </div>

              <button
                onClick={() => onLoadAgent(agent)}
                className={isDark
                  ? 'inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400'
                  : 'inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-400'
                }
              >
                <Upload className="w-4 h-4" />
                Load
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
