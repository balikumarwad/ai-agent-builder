import { useEffect, useRef } from 'react'

export function useAnalyticsTracker(agentName: string) {
  const agentNameRef = useRef(agentName)

  useEffect(() => {
    agentNameRef.current = agentName
  }, [agentName])

  useEffect(() => {
    const analyticsInterval = setInterval(() => {
      if (agentNameRef.current !== '') {
        console.log(`[Analytics Heartbeat] User is working on agent named: "${agentNameRef.current}"`)
      } else {
        console.log(`[Analytics Heartbeat] User is working on an unnamed agent draft...`)
      }
    }, 8000)

    return () => clearInterval(analyticsInterval)
  }, [])
}
