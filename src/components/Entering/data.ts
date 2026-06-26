import {
  EXPENSE_CATEGORY_IDS,
  INCOME_CATEGORY_IDS,
  type CategoryId,
} from "../../constants/categories";

interface CategoryOption {
  id: CategoryId;
}

export const dataS: CategoryOption[] = EXPENSE_CATEGORY_IDS.map((id) => ({
  id,
}));

export const dataG: CategoryOption[] = INCOME_CATEGORY_IDS.map((id) => ({
  id,
}));
