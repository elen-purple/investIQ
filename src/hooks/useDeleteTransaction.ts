import { useLocation } from "react-router-dom";
import { deleteTransactionWithBalance } from "../redux/services/operations";
import { useAppDispatch } from "../redux/store";
import type { TransactionType } from "../types/transactions";

interface UseDeleteTransactionProps {
  deletedElementId: string | null;
  deletedElementAmount: number | null;
}

const getTransactionType = (pathname: string): TransactionType | null => {
  if (pathname === "/getMoney") return "+";
  if (pathname === "/spendMoney") return "-";

  return null;
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

    const transactionType = getTransactionType(location.pathname);
    if (!transactionType) {
      throw new Error("Невідомий тип транзакції");
    }

    await dispatch(
      deleteTransactionWithBalance({
        itemId: deletedElementId,
        amount: deletedElementAmount,
        type: transactionType,
      }),
    ).unwrap();
  };

  return handleDelete;
};
