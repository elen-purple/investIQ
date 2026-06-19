interface Note {
  id: string;
  desc: string;
  date: string;
  category: string;
  amount: number;
  type: "+" | "-" | "";
}

export const selectNotes = ({ notes }: { notes: Note[] }) => notes;
export const selectIsLoading = ({ isLoading }: { isLoading: boolean }) =>
  isLoading;
