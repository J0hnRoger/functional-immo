import type { FunctionComponent } from "react"
import type { SimulationResult } from "../domain/immoTypes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SimulatorResultPanelProps {
    result : SimulationResult | null
}

export const SimulatorResultPanel : FunctionComponent<SimulatorResultPanelProps> = ({ result }) => { 
    if (result == null)
        return;
    return (
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Résultat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              Statut : {result.ok ? "✅ Rentable" : "❌ À risque"}
            </div>
            {!result.ok && result.reasons.length > 0 && (
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                {result.reasons.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            )}
            <div className="text-sm">
              <div>Cashflow mensuel : {result.kpis.monthlyCashflow.toFixed(0)} €</div>
              <div>Yield brut : {(result.kpis.grossYield * 100).toFixed(1)} %</div>
              <div>Yield net : {(result.kpis.netYield * 100).toFixed(1)} %</div>
              <div>DSCR : {result.kpis.dscr.toFixed(2)}</div>
              <div>Apport / frais initiaux : {result.kpis.equityNeeded.toFixed(0)} €</div>
            </div>
          </CardContent>
        </Card>
    )
 }