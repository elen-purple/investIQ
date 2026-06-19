interface Text {
  label: string;
  id:
    | "transport"
    | "products"
    | "health"
    | "alcohole"
    | "entertaining"
    | "home"
    | "technic"
    | "connection"
    | "sport"
    | "education"
    | "other"
    | "salary"
    | "addition";
}

export const dataS: Text[] = [
  {
    label: "Транспорт",
    id: "transport",
  },
  {
    label: "Продукти",
    id: "products",
  },
  {
    label: "Здоров’я",
    id: "health",
  },
  {
    label: "Алкоголь",
    id: "alcohole",
  },
  {
    label: "Розваги",
    id: "entertaining",
  },
  {
    label: "Все для дому",
    id: "home",
  },
  {
    label: "Техніка",
    id: "technic",
  },
  {
    label: "Комуналка, зв’язок",
    id: "connection",
  },
  {
    label: "Спорт, хобі",
    id: "sport",
  },
  {
    label: "Навчання",
    id: "education",
  },
  {
    label: "Інше",
    id: "other",
  },
];

export const dataG: Text[] = [
  {
    label: "ЗП",
    id: "salary",
  },
  {
    label: "Дод. дохід",
    id: "addition",
  },
];
