export const CATEGORY_LABELS = {
  transport: "Транспорт",
  products: "Продукти",
  health: "Здоров'я",
  alcohole: "Алкоголь",
  entertaining: "Розваги",
  home: "Все для дому",
  technic: "Техніка",
  connection: "Комуналка, зв’язок",
  sport: "Спорт, хобі",
  education: "Навчання",
  other: "Інше",
  salary: "ЗП",
  addition: "Дод. прибуток",
} as const;

export type CategoryId = keyof typeof CATEGORY_LABELS;

export const EXPENSE_CATEGORY_IDS = [
  "transport",
  "products",
  "health",
  "alcohole",
  "entertaining",
  "home",
  "technic",
  "connection",
  "sport",
  "education",
  "other",
] as const satisfies readonly CategoryId[];

export const INCOME_CATEGORY_IDS = [
  "salary",
  "addition",
] as const satisfies readonly CategoryId[];

export const isCategoryId = (value: unknown): value is CategoryId => {
  return typeof value === "string" && value in CATEGORY_LABELS;
};

export const getCategoryLabel = (category: CategoryId) => {
  return CATEGORY_LABELS[category];
};
