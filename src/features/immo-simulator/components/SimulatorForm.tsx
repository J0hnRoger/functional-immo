import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export type Money = number;
export type Rate = number;
export type Year = number;

export type MortgageInput = {
  principal: Money;
  annualRate: Rate;
  termYears: Year;
  insuranceRate?: Rate | null;
};

export type PropertyInput = {
  price: Money;
  notary: Money;
  works: Money;
  monthlyRent: Money;
  monthlyCharges: Money;
  monthlyTax: Money;
  vacancyRate: Rate;
  capexMonthly: Money;
  managementRate: Rate;
};

export type Simulation = {
  property: PropertyInput;
  mortgage: MortgageInput;
};

export type ScenarioFormProps = {
  defaultValues?: Partial<Simulation>;
  onSubmit: (scenario: Simulation) => void;
};

const DEFAULTS: Simulation = {
  property: {
    price: 200000,
    notary: 15000,
    works: 10000,
    monthlyRent: 1100,
    monthlyCharges: 90,
    monthlyTax: 80,
    vacancyRate: 0.06,
    capexMonthly: 60,
    managementRate: 0.07,
  },
  mortgage: {
    principal: 190000,
    annualRate: 0.042,
    termYears: 25,
    insuranceRate: 0.003,
  },
};

// --- Mini composants internes --- //
const MoneyInput = ({
  form,
  name,
  label,
}: {
  form: ReturnType<typeof useForm>;
  name: string;
  label: string;
}) => (
  <FormField
    control={form.control}
    name={name as any}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <div className="relative">
            <Input type="number" step="any" {...field} />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              €
            </span>
          </div>
        </FormControl>
      </FormItem>
    )}
  />
);

const PercentInput = ({
  form,
  name,
  label,
}: {
  form: ReturnType<typeof useForm>;
  name: string;
  label: string;
}) => (
  <FormField
    control={form.control}
    name={name as any}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <div className="relative">
            <Input type="number" step="any" {...field} />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              %
            </span>
          </div>
        </FormControl>
      </FormItem>
    )}
  />
);

// --- Composant principal --- //
export function SimulatorForm({
  defaultValues,
  onSubmit,
}: ScenarioFormProps) {
  const form = useForm({
    defaultValues: { ...DEFAULTS, ...(defaultValues ?? {}) } as any,
  });

  const handleSubmit = (values: any) => {
    // conversion rapide (string → number)
    const n = (x: any) => parseFloat(String(x).replace(",", ".")) || 0;

    const s: Simulation = {
      property: {
        price: n(values.property?.price),
        notary: n(values.property?.notary),
        works: n(values.property?.works),
        monthlyRent: n(values.property?.monthlyRent),
        monthlyCharges: n(values.property?.monthlyCharges),
        monthlyTax: n(values.property?.monthlyTax),
        vacancyRate: n(values.property?.vacancyRate) / 100,
        capexMonthly: n(values.property?.capexMonthly),
        managementRate: n(values.property?.managementRate) / 100,
      },
      mortgage: {
        principal: n(values.mortgage?.principal),
        annualRate: n(values.mortgage?.annualRate) / 100,
        termYears: n(values.mortgage?.termYears),
        insuranceRate: n(values.mortgage?.insuranceRate) / 100,
      },
    };
    onSubmit(s);
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Scénario immobilier – Paramètres</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                Bien & Exploitation
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <MoneyInput form={form} name="property.price" label="Prix du bien" />
                <MoneyInput form={form} name="property.notary" label="Frais de notaire" />
                <MoneyInput form={form} name="property.works" label="Travaux" />
                <MoneyInput form={form} name="property.monthlyRent" label="Loyer (HC)" />
                <MoneyInput form={form} name="property.monthlyCharges" label="Charges" />
                <MoneyInput form={form} name="property.monthlyTax" label="Taxe foncière" />
                <PercentInput form={form} name="property.vacancyRate" label="Vacance locative" />
                <MoneyInput form={form} name="property.capexMonthly" label="CapEx mensuel" />
                <PercentInput form={form} name="property.managementRate" label="Frais gestion" />
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Financement</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <MoneyInput form={form} name="mortgage.principal" label="Montant emprunté" />
                <PercentInput form={form} name="mortgage.annualRate" label="Taux annuel" />
                <MoneyInput form={form} name="mortgage.termYears" label="Durée (années)" />
                <PercentInput form={form} name="mortgage.insuranceRate" label="Assurance" />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="reset">Réinitialiser</Button>
              <Button type="submit">Calculer</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
