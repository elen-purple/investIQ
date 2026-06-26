interface Note {
  id: string;
  desc: string;
  date: string;
  category:
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
  amount: number;
  type: "+" | "-" | "";
}

export const selectNotes = ({ notes }: { notes: Note[] }) => notes;
export const selectIsLoading = ({ isLoading }: { isLoading: boolean }) =>
  isLoading;
