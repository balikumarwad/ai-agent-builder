import { useEffect, useState } from 'react'
import { DndContext } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
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
      if (!selectedSkills.includes(draggedData.id)) {
        setSelectedSkills([...selectedSkills, draggedData.id])
      }
    }

    // Handle dropping layers into workspace
    if (draggedData.type === 'layer' && dropZoneId === 'workspace-layers-drop') {
      if (!selectedLayers.includes(draggedData.id)) {
        setSelectedLayers([...selectedLayers, draggedData.id])
      }
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        data-theme={theme}
        className={`relative min-h-screen overflow-hidden font-sans ${theme === 'dark'
          ? 'bg-[#040710] text-slate-100'
          : 'bg-slate-100 text-slate-950'
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.16),_transparent_18%)]" />
        <Header theme={theme} onToggleTheme={toggleTheme} />

        <main className="relative container mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-8">
            <Sidebar
              data={data}
              selectedProfile={selectedProfile}
              selectedProvider={selectedProvider}
              theme={theme}
              onProfileChange={handleProfileChange}
              onProviderChange={handleProviderChange}
            />

            <div className="space-y-8">
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
                onAgentNameChange={setAgentName}
                onSaveAgent={handleSaveAgent}
              />
            </div>
          </div>

          <div className="mt-8">
            <SavedAgentsList
              savedAgents={savedAgents}
              data={data}
              theme={theme}
              onLoadAgent={handleLoadAgent}
              onDeleteAgent={handleDeleteAgent}
              onClearAll={handleClearAll}
            />
          </div>
        </main>
      </div>
    </DndContext>
  )
}

export default App
