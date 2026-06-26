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

interface TableStatsProps {
  setDeletedElementId: React.Dispatch<React.SetStateAction<string | null>>;
  setDeletedElementAmount: React.Dispatch<React.SetStateAction<number | null>>;
  openModalD: () => void;
}

export const TableStats = ({
  openModalD,
  setDeletedElementId,
  setDeletedElementAmount,
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
  const notes = useAppSelector((state) => selectNotes(state.money));
  const isLoading = useAppSelector((state) => selectIsLoading(state.money));

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
    amount: number,
  ) => {
    if (e.currentTarget.closest(`[data-action="delete"]`)) {
      setDeletedElementId(id);
      setDeletedElementAmount(amount);
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

                  if (location.pathname === "/getMoney") {
                    return type === "+";
                  } else if (location.pathname === "/spendMoney") {
                    return type === "-";
                  } else {
                    return false;
                  }
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
                        <Text>
                          {new Date(date).getDate().toString().padStart(2, "0")}
                          .
                          {(new Date(date).getMonth() + 1)
                            .toString()
                            .padStart(2, "0")}
                          .{new Date(date).getUTCFullYear()}
                        </Text>
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
                          handleDelete(e, id, amount);
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
                  ?.filter(({ type }: { type: "+" | "-" | "" }) => {
                    if (location.pathname === "/getMoney") {
                      return type === "+";
                    } else if (location.pathname === "/spendMoney") {
                      return type === "-";
                    } else {
                      return;
                    }
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
                      <NameStyled>
                        {new Date(date).getDate().toString().padStart(2, "0")}.
                        {(new Date(date).getMonth() + 1)
                          .toString()
                          .padStart(2, "0")}
                        .{new Date(date).getUTCFullYear()}
                      </NameStyled>
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
                            handleDelete(e, id, amount);
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
