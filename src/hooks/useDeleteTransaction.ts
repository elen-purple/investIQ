import { useLocation } from "react-router-dom";
import { deleteTransactionWithBalance } from "../redux/services/operations";
import { useAppDispatch } from "../redux/store";

interface UseDeleteTransactionProps {
  deletedElementId: string | null;
  deletedElementAmount: number | null;
}

const getTransactionType = (pathname: string): "+" | "-" => {
  return pathname === "/getMoney" ? "+" : "-";
};

export const useDeleteTransaction = ({
  deletedElementId,
  deletedElementAmount,
}: UseDeleteTransactionProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleDelete = async () => {
    if (!deletedElementId || deletedElementAmount === null) {
      throw new Error("Немає даних для видалення");
    }

    await dispatch(
      deleteTransactionWithBalance({
        itemId: deletedElementId,
        amount: deletedElementAmount,
        type: getTransactionType(location.pathname),
      }),
    ).unwrap();
  };

  return handleDelete;
};
