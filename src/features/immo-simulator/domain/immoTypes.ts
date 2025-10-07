export type Money = number;
export type Rate = number;
export type Year = number;

export type MortgageInput = { principal: Money; annualRate: Rate; termYears: Year; insuranceRate?: Rate | null; };
export type PropertyInput = { price: Money; notary: Money; works: Money; monthlyRent: Money; monthlyCharges: Money; monthlyTax: Money; vacancyRate: Rate; capexMonthly: Money; managementRate: Rate; };
export type Scenario = { property: PropertyInput; mortgage: MortgageInput; };

export type SimulationResult = {
  ok: boolean;
  reasons: string[];
  kpis: { monthlyCashflow: number; grossYield: number; netYield: number; dscr: number; equityNeeded: number; };
};

export type Simulation = {
  property: PropertyInput;
  mortgage: MortgageInput;
};

export const EMPTY_SIMULATION : Simulation =  {
    property: {
        price: 0,
        notary: 0,
        works: 0,
        monthlyRent: 0,
        monthlyCharges: 0,
        monthlyTax: 0,
        vacancyRate: 0,
        capexMonthly: 0,
        managementRate: 0
    },
    mortgage: {
        principal: 0,
        annualRate: 0,
        termYears: 0,
        insuranceRate: undefined
    }
}

export const EMPTY_SIMULATION_RESULT : SimulationResult = {
    ok: false,
    reasons: [],
    kpis: {
        monthlyCashflow: 0,
        grossYield: 0,
        netYield: 0,
        dscr: 0,
        equityNeeded: 0
    }
} 

