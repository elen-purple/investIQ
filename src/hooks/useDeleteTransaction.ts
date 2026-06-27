import { deleteTransactionWithBalance } from "../redux/services/operations";
import { useAppDispatch } from "../redux/store";

interface UseDeleteTransactionProps {
  deletedElementId: string | null;
}

export const useDeleteTransaction = ({
  deletedElementId,
}: UseDeleteTransactionProps) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    if (!deletedElementId) {
      throw new Error("Немає даних для видалення");
    }

    await dispatch(
      deleteTransactionWithBalance({
        itemId: deletedElementId,
      }),
    ).unwrap();
  };

  return handleDelete;
};
