import { useEffect, useState } from 'react'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { Sparkles, Layers } from 'lucide-react'
import { agentData } from './data'
import { useAnalyticsTracker } from './useAnalyticsTracker'
import type { SavedAgent } from './types'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Workspace } from './components/Workspace'
import { SavedAgentsList } from './components/SavedAgentsList'

function App() {
  const data = agentData

  // Selection states
  const [selectedProfile, setSelectedProfile] = useState<string>('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedLayers, setSelectedLayers] = useState<string[]>([])
  const [selectedProvider, setSelectedProvider] = useState<string>('')
  const [activeId, setActiveId] = useState<string | null>(null)

  // Saving states
  const [agentName, setAgentName] = useState('')
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark'
    const stored = localStorage.getItem('theme')
    return stored === 'light' ? 'light' : 'dark'
  })
  const [savedAgents, setSavedAgents] = useState<SavedAgent[]>(() => {
    const saved = localStorage.getItem('savedAgents')
    if (saved) {
      try {
        const agents = JSON.parse(saved) as SavedAgent[]
        // Ensure all agents have IDs (for backwards compatibility)
        return agents.map(agent => ({
          ...agent,
          id: agent.id || crypto.randomUUID()
        }))
      } catch (e) {
        console.error('Failed to parse saved agents', e)
        return []
      }
    }
    return []
  })

  // Initialize analytics tracker
  useAnalyticsTracker(agentName)

  // Handlers
  const handleProfileChange = (profileId: string) => {
    setSelectedProfile(profileId)
  }

  const handleProviderChange = (provider: string) => {
    setSelectedProvider(provider)
  }

  const handleRemoveSkill = (skillId: string) => {
    setSelectedSkills(selectedSkills.filter(id => id !== skillId))
  }

  const handleRemoveLayer = (layerId: string) => {
    setSelectedLayers(selectedLayers.filter(id => id !== layerId))
  }

  const handleAddSkill = (skillId: string) => {
    setSelectedSkills(current => current.includes(skillId) ? current : [...current, skillId])
  }

  const handleAddLayer = (layerId: string) => {
    setSelectedLayers(current => current.includes(layerId) ? current : [...current, layerId])
  }

  const handleSaveAgent = () => {
    if (!agentName.trim()) {
      alert('Please enter a name for your agent.')
      return
    }

    const newAgent: SavedAgent = {
      id: crypto.randomUUID(),
      name: agentName,
      profileId: selectedProfile,
      skillIds: selectedSkills,
      layerIds: selectedLayers,
      provider: selectedProvider,
    }

    const updatedAgents = [...savedAgents, newAgent]
    setSavedAgents(updatedAgents)
    localStorage.setItem('savedAgents', JSON.stringify(updatedAgents))
    setAgentName('')
    alert(`Agent "${newAgent.name}" saved successfully!`)
  }

  const handleLoadAgent = (agent: SavedAgent) => {
    setSelectedProfile(agent.profileId || '')
    setSelectedSkills(agent.skillIds || [])
    setSelectedLayers([...(agent.layerIds || [])])
    setAgentName(agent.name)
    setSelectedProvider(agent.provider || '')
  }

  const handleDeleteAgent = (idToRemove: string) => {
    const updatedAgents = savedAgents.filter((agent) => agent.id !== idToRemove)
    setSavedAgents(updatedAgents)
    localStorage.setItem('savedAgents', JSON.stringify(updatedAgents))
  }

  const handleClearAll = () => {
    setSavedAgents([])
    localStorage.removeItem('savedAgents')
  }

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null)
    const { active, over } = event

    // Only process if dropped over a valid drop zone
    if (!over) return

    const draggedData = active.data.current as {
      type: 'skill' | 'layer'
      id: string
      name: string
      category?: string
      description?: string
    }
    const dropZoneId = over.id

    // Handle dropping skills into workspace
    if (draggedData.type === 'skill' && dropZoneId === 'workspace-skills-drop') {
      handleAddSkill(draggedData.id)
    }

    // Handle dropping layers into workspace
    if (draggedData.type === 'layer' && dropZoneId === 'workspace-layers-drop') {
      handleAddLayer(draggedData.id)
    }
  }

  const activeSkill = activeId ? data.skills.find(skill => skill.id === activeId) : null
  const activeLayer = activeId ? data.layers.find(layer => layer.id === activeId) : null
  const activeItem = activeSkill || activeLayer
  const activeType: 'skill' | 'layer' | null = activeSkill ? 'skill' : activeLayer ? 'layer' : null
  const overlayIsDark = theme === 'dark'
  const OverlayIcon = activeType === 'layer' ? Layers : Sparkles

  return (
    <DndContext
      onDragStart={(event) => setActiveId(event.active.id as string)}
      onDragEnd={handleDragEnd}
    >
      <div
        data-theme={theme}
        className={`relative min-h-screen overflow-hidden px-6 pt-4 font-sans sm:px-12 ${theme === 'dark'
          ? 'bg-[#040710] text-slate-100'
          : 'bg-slate-100 text-slate-950'
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.16),_transparent_18%)]" />
        <Header theme={theme} onToggleTheme={toggleTheme} />

        <main className="relative container mx-auto pb-12">
          <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[360px_1fr]">
            <Sidebar
              data={data}
              selectedProfile={selectedProfile}
              selectedProvider={selectedProvider}
              theme={theme}
              onProfileChange={handleProfileChange}
              onProviderChange={handleProviderChange}
            />

            <div className="flex h-full flex-col gap-8">
              <Workspace
                data={data}
                selectedProfile={selectedProfile}
                selectedSkills={selectedSkills}
                selectedLayers={selectedLayers}
                selectedProvider={selectedProvider}
                agentName={agentName}
                theme={theme}
                onRemoveSkill={handleRemoveSkill}
                onRemoveLayer={handleRemoveLayer}
                onAddSkill={handleAddSkill}
                onAddLayer={handleAddLayer}
                onAgentNameChange={setAgentName}
                onSaveAgent={handleSaveAgent}
              />
              <SavedAgentsList
                savedAgents={savedAgents}
                data={data}
                theme={theme}
                onLoadAgent={handleLoadAgent}
                onDeleteAgent={handleDeleteAgent}
                onClearAll={handleClearAll}
              />
            </div>
          </div>
        </main>
      </div>
      <DragOverlay>
        {activeItem && activeType ? (
          <div
            className={`w-[280px] rounded-2xl border p-2 shadow-2xl ${overlayIsDark
              ? 'border-slate-800/70 bg-slate-900/95 text-slate-100'
              : 'border-slate-200 bg-white text-slate-950'
            }`}
            style={{ zIndex: 1000 }}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-xl border ${overlayIsDark ? 'border-slate-800/70 bg-slate-950/70 text-cyan-300' : 'border-slate-200 bg-slate-200 text-sky-500'}`}>
                  <OverlayIcon className="h-4 w-4" />
                </div>
                <div>
                  <p className={overlayIsDark ? 'text-sm font-semibold text-slate-100' : 'text-sm font-semibold text-slate-950'}>{activeItem.name}</p>
                  <p className={overlayIsDark ? 'text-[10px] uppercase tracking-[0.25em] text-slate-400' : 'text-[10px] uppercase tracking-[0.25em] text-slate-500'}>
                    {'category' in activeItem ? activeItem.category : activeItem.type}
                  </p>
                </div>
              </div>
              <span className={overlayIsDark ? 'rounded-full border border-slate-700 bg-slate-800 px-2 py-0.5 text-xs font-mono text-slate-400' : 'rounded-full border border-slate-300 bg-slate-100 px-2 py-0.5 text-xs font-mono text-slate-600'}>
                {activeType}
              </span>
            </div>
            <p className={overlayIsDark ? 'mt-2 text-xs text-slate-400' : 'mt-2 text-xs text-slate-600'}>
              {activeItem.description}
            </p>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default App
