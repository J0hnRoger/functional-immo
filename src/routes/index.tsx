import { SimulatorForm } from '@/features/immo-simulator/components/SimulatorForm'
import { SimulatorResultPanel } from '@/features/immo-simulator/components/SimulatorResultPanel'
import { generateSimulationResult } from '@/features/immo-simulator/domain/generateSimulationResult'
import type { Simulation, SimulationResult } from '@/features/immo-simulator/domain/immoTypes'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [result, setResult] = useState<SimulationResult | null>(null)

  return (
    <div className="text-center p-4 h-full">
      <SimulatorForm onSubmit={function (simulation: Simulation): void {
        const result = generateSimulationResult(simulation);
        setResult(result)
      } } />
      <SimulatorResultPanel result={result} />
    </div>
  )
}
