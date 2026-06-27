import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { selectIsLoading, selectNotes } from "../../redux/money/selectors";
import { useEffect, useState } from "react";
import {
  BodyStyled,
  Btn,
  Data,
  Icon,
  Item,
  List,
  NameStyled,
  Row,
  Sum,
  SumDesc,
  Table,
  TableHead,
  Text,
  Texts,
  Title,
  Wrapper,
} from "./TableStatsStyled";
import { getCategoryLabel } from "../../constants/categories";
import { getTransactionType } from "../../utils/routes";
import { formatDate } from "../../utils/date";

interface TableStatsProps {
  setDeletedElementId: React.Dispatch<React.SetStateAction<string | null>>;
  openModalD: () => void;
}

export const TableStats = ({
  openModalD,
  setDeletedElementId,
}: TableStatsProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 703);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 703);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const location = useLocation();
  const transactionType = getTransactionType(location.pathname);
  const notes = useAppSelector((state) => selectNotes(state.money));
  const isLoading = useAppSelector((state) => selectIsLoading(state.money));

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    if (e.currentTarget.closest(`[data-action="delete"]`)) {
      setDeletedElementId(id);
      openModalD();
    }
  };

  return (
    <section>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {isMobile ? (
            <List>
              {notes
                ?.filter((note) => {
                  if (!note) return false;
                  const { type } = note;

                  return transactionType !== null && type === transactionType;
                })
                .sort(
                  (
                    { date: dateA }: { date: string },
                    { date: dateB }: { date: string },
                  ) => {
                    return (
                      new Date(dateB).getTime() - new Date(dateA).getTime()
                    );
                  },
                )
                .map(({ desc, id, amount, category, date, type }) => (
                  <Item key={id}>
                    <div>
                      <Title>{desc}</Title>
                      <Texts>
                        <Text>{formatDate(new Date(date))}</Text>
                        <Text>{getCategoryLabel(category)}</Text>
                      </Texts>
                    </div>
                    <Wrapper>
                      <Sum
                        style={{
                          color:
                            type === "+"
                              ? "#407946"
                              : type === "-"
                                ? "#e53935"
                                : "",
                        }}
                      >
                        {type === "-" ? "- " : ""}
                        {new Intl.NumberFormat("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                          .format(amount)
                          .replace(/,/g, " ")}
                        {" грн."}
                      </Sum>
                      <Btn
                        onClick={(e) => {
                          handleDelete(e, id);
                        }}
                        id={id}
                        data-action="delete"
                        type="button"
                      >
                        <Icon width="18" height="18">
                          <use href="#delete"></use>
                        </Icon>
                      </Btn>
                    </Wrapper>
                  </Item>
                ))}
            </List>
          ) : (
            <Table>
              <thead>
                <tr>
                  <TableHead>Дата</TableHead>
                  <TableHead>Опис</TableHead>
                  <TableHead>Категорія</TableHead>
                  <TableHead colSpan={2}>Сума</TableHead>
                </tr>
              </thead>
              <BodyStyled>
                {notes
                  ?.filter(({ type }) => {
                    return transactionType !== null && type === transactionType;
                  })
                  .sort(
                    (
                      { date: dateA }: { date: string },
                      { date: dateB }: { date: string },
                    ) => {
                      return (
                        new Date(dateB).getTime() - new Date(dateA).getTime()
                      );
                    },
                  )
                  .map(({ desc, id, amount, category, date, type }) => (
                    <Row key={id}>
                      <NameStyled>{formatDate(new Date(date))}</NameStyled>
                      <NameStyled>{desc}</NameStyled>
                      <NameStyled>{getCategoryLabel(category)}</NameStyled>
                      <SumDesc
                        style={{
                          color:
                            type === "+"
                              ? "#407946"
                              : type === "-"
                                ? "#e53935"
                                : "",
                        }}
                      >
                        {type === "-" ? "- " : ""}
                        {new Intl.NumberFormat("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                          .format(amount)
                          .replace(/,/g, " ")}
                        {" грн."}
                      </SumDesc>
                      <Data>
                        <Btn
                          onClick={(e) => {
                            handleDelete(e, id);
                          }}
                          id={id}
                          data-action="delete"
                          type="button"
                        >
                          <Icon width="18" height="18">
                            <use href="#delete"></use>
                          </Icon>
                        </Btn>
                      </Data>
                    </Row>
                  ))}
              </BodyStyled>
            </Table>
          )}
        </>
      )}
    </section>
  );
};
