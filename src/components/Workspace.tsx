import type { AgentData } from '../types'
import { DroppableZone } from './DroppableZone'
import { Save, X, Bot, Cpu } from 'lucide-react'

interface WorkspaceProps {
  data: AgentData
  selectedProfile: string
  selectedSkills: string[]
  selectedLayers: string[]
  selectedProvider: string
  agentName: string
  theme: 'dark' | 'light'
  onRemoveSkill: (skillId: string) => void
  onRemoveLayer: (layerId: string) => void
  onAgentNameChange: (name: string) => void
  onSaveAgent: () => void
}

export function Workspace({
  data,
  selectedProfile,
  selectedSkills,
  selectedLayers,
  selectedProvider,
  agentName,
  theme,
  onRemoveSkill,
  onRemoveLayer,
  onAgentNameChange,
  onSaveAgent,
}: WorkspaceProps) {
  const isDark = theme === 'dark'
  const sectionClass = isDark
    ? 'sticky top-4 rounded-[2rem] border border-slate-800/80 bg-slate-950/35 p-6 shadow-[0_30px_80px_-55px_rgba(59,130,246,0.7)] backdrop-blur-xl min-h-[700px] overflow-y-auto text-slate-100'
    : 'sticky top-4 rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_30px_80px_-55px_rgba(148,163,184,0.15)] min-h-[700px] overflow-y-auto text-slate-950'
  const headerTextClass = isDark ? 'text-2xl font-semibold text-slate-100' : 'text-2xl font-semibold text-slate-950'
  const descriptionClass = isDark ? 'text-sm text-slate-400' : 'text-sm text-slate-600'
  const cardClass = isDark
    ? 'rounded-[1.75rem] border border-slate-800/70 bg-slate-950/70 p-5 shadow-inner shadow-slate-950/40'
    : 'rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-5 shadow-inner shadow-slate-200/30'
  const smallCardClass = isDark
    ? 'rounded-3xl border border-slate-800/70 bg-slate-900/70 px-4 py-4 text-slate-100'
    : 'rounded-3xl border border-slate-200/80 bg-white px-4 py-4 text-slate-950'
  const dashedCardClass = isDark
    ? 'rounded-[1.75rem] border border-dashed border-slate-700/80 bg-slate-900/70 p-5 text-slate-400'
    : 'rounded-[1.75rem] border border-dashed border-slate-300/80 bg-slate-50 p-5 text-slate-600'
  const inputClass = isDark
    ? 'w-full rounded-3xl border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
    : 'w-full rounded-3xl border border-slate-300/80 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20'

  return (
    <section className={sectionClass}>
      <div className="mb-6 flex items-center gap-3">
        <Bot className={isDark ? 'w-6 h-6 text-cyan-300' : 'w-6 h-6 text-sky-500'} />
        <div>
          <h2 className={headerTextClass}>Current Agent Configuration</h2>
          <p className={descriptionClass}>Use the canvas to build your agent persona and capability stack.</p>
        </div>
      </div>

      <div className="grid gap-6">
        <div className={cardClass}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={isDark ? 'flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-800/70 text-cyan-300 ring-1 ring-cyan-400/20' : 'flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-200 text-sky-500 ring-1 ring-sky-300/20'}>
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <p className={isDark ? 'text-sm uppercase tracking-[0.2em] text-slate-500' : 'text-sm uppercase tracking-[0.2em] text-slate-500'}>Profile</p>
                {selectedProfile && data ? (
                  <p className={isDark ? 'mt-2 text-lg font-semibold text-slate-100' : 'mt-2 text-lg font-semibold text-slate-950'}>
                    {data.agentProfiles.find(p => p.id === selectedProfile)?.name}
                  </p>
                ) : (
                  <p className={isDark ? 'mt-2 text-lg font-semibold text-slate-300' : 'mt-2 text-lg font-semibold text-slate-500'}>No profile selected</p>
                )}
              </div>
            </div>
            <div className={isDark ? 'rounded-3xl bg-slate-900/70 px-4 py-3 text-sm text-slate-300 border border-slate-700' : 'rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-700 border border-slate-200'}>Agent core</div>
          </div>
          <div className={isDark ? 'mt-4 text-sm text-slate-400' : 'mt-4 text-sm text-slate-600'}>
            {selectedProfile && data
              ? data.agentProfiles.find(p => p.id === selectedProfile)?.description
              : 'Choose a base profile from the sidebar to initialize your agent.'}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <DroppableZone
            id="workspace-skills-drop"
            title="Selected Skills"
            emptyMessage="Drop skills here or use the sidebar"
            theme={theme}
          >
            {selectedSkills.length > 0 && data ? (
              <div className="space-y-3">
                {selectedSkills.map(skillId => {
                  const skill = data.skills.find(s => s.id === skillId)
                  return (
                    <div
                      key={skillId}
                      className={isDark
                        ? 'flex items-center justify-between rounded-3xl border border-slate-800/70 bg-slate-900/70 p-3'
                        : 'flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-3'
                      }
                    >
                      <div>
                        <p className={isDark ? 'font-semibold text-slate-100' : 'font-semibold text-slate-950'}>{skill?.name}</p>
                        <p className={isDark ? 'text-xs text-slate-500' : 'text-xs text-slate-500'}>{skill?.category}</p>
                      </div>
                      <button
                        onClick={() => onRemoveSkill(skillId)}
                        className={isDark
                          ? 'rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-red-400'
                          : 'rounded-full p-2 text-slate-600 transition hover:bg-slate-200 hover:text-red-500'
                        }
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )
                })}
              </div>
            ) : null}
          </DroppableZone>

          <DroppableZone
            id="workspace-layers-drop"
            title="Selected Layers"
            emptyMessage="Drop layers here or use the sidebar"
            theme={theme}
          >
            {selectedLayers.length > 0 && data ? (
              <div className="space-y-3">
                {selectedLayers.map(layerId => {
                  const layer = data.layers.find(l => l.id === layerId)
                  return (
                    <div
                      key={layerId}
                      className={isDark
                        ? 'flex items-center justify-between rounded-3xl border border-slate-800/70 bg-slate-900/70 p-3'
                        : 'flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-3'
                      }
                    >
                      <div>
                        <p className={isDark ? 'font-semibold text-slate-100' : 'font-semibold text-slate-950'}>{layer?.name}</p>
                        <p className={isDark ? 'text-xs text-slate-500' : 'text-xs text-slate-500'}>{layer?.type}</p>
                      </div>
                      <button
                        onClick={() => onRemoveLayer(layerId)}
                        className={isDark
                          ? 'rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-red-400'
                          : 'rounded-full p-2 text-slate-600 transition hover:bg-slate-200 hover:text-red-500'
                        }
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )
                })}
              </div>
            ) : null}
          </DroppableZone>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
          <div className={dashedCardClass}>
            <div className={isDark ? 'flex items-center gap-3 text-sm font-semibold text-slate-300 mb-3' : 'flex items-center gap-3 text-sm font-semibold text-slate-700 mb-3'}>
              <Cpu className={isDark ? 'w-4 h-4 text-cyan-300' : 'w-4 h-4 text-sky-500'} />
              <span>AI Provider</span>
            </div>
            {selectedProvider ? (
              <div className={smallCardClass}>
                {selectedProvider}
              </div>
            ) : (
              <div className={smallCardClass.replace('text-slate-100', isDark ? 'text-slate-500' : 'text-slate-600')}>
                No provider selected
              </div>
            )}
          </div>

          <div className={`${cardClass} p-5`}>
            <div className={isDark ? 'mb-3 text-sm uppercase tracking-[0.2em] text-slate-500' : 'mb-3 text-sm uppercase tracking-[0.2em] text-slate-500'}>Save agent</div>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Agent Name"
                value={agentName}
                onChange={e => onAgentNameChange(e.target.value)}
                className={inputClass}
              />
              <button
                onClick={onSaveAgent}
                className={isDark
                  ? 'inline-flex items-center justify-center gap-2 rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400'
                  : 'inline-flex items-center justify-center gap-2 rounded-3xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400'
                }
              >
                <Save className="w-4 h-4" />
                Save Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
