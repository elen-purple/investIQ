interface Text {
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
  { id: "transport" },
  { id: "products" },
  { id: "health" },
  { id: "alcohole" },
  { id: "entertaining" },
  { id: "home" },
  { id: "technic" },
  { id: "connection" },
  { id: "sport" },
  { id: "education" },
  { id: "other" },
];

export const dataG: Text[] = [{ id: "salary" }, { id: "addition" }];
