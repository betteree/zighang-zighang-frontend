export const CHIP_MAIN_COLOR: Record<string, string> = {
  AiChip: "#6F00B6",
  ITChip: "#6F00B6",
  DesignChip: "#6F00B6",
  GameChip: "#6F00B6",
  StrategyChip: "#6F00B6",

  BankingChip: "#2896BB",
  FinanceChip: "#2896BB",
  HRChip: "#2896BB",
  LegalChip: "#2896BB",
  SecuritiesChip: "#2896BB",

  LogisticsChip: "#0058B6",
  MarketingChip: "#0058B6",
  ProductChip: "#0058B6",
  SalesChip: "#0058B6",
  TradeChip: "#0058B6",

  ManufacturingChip: "#05935C",
  RNDChip: "#05935C",
  ConstructionChip: "#05935C",

  MediaChip: "#EF5108",
  MedicalChip: "#EF5108",
  FoodChip: "#EF5108",
  ServiceChip: "#EF5108",
  WelfareChip: "#EF5108",
  TMChip: "#EF5108",
  EduChip: "#EF5108",
};

export function getChipMainColor(chip: string, fallback = "#7951FF"): string {
  return CHIP_MAIN_COLOR[chip] ?? fallback;
}

