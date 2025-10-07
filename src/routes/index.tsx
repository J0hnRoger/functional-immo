import { SimulatorForm, type Simulation } from '@/features/immo-simulator/components/SimulatorForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center p-4">
      <SimulatorForm onSubmit={function (scenario: Scenario): void {

      } } />
    </div>
  )
}
