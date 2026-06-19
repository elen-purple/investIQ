import HomePage from "./pages/HomePage/HomePage";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { Route, Routes } from "react-router-dom";
import { SharedLayout } from "./components/SharedLayout/SharedLayout";
import { SignUp } from "./pages/SignUp/SignUp";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { LogIn } from "./pages/LogIn/LogIn";
import { useModal } from "./hooks/useModal";
import { useEffect, useState } from "react";
import { clearUser, setAuthLoading, setUser } from "./redux/auth/slice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { TableStats } from "./components/TableStats/TableStats";
import { fetchMoney } from "./redux/money/operations";
import { fetchBalance } from "./redux/balance/operations";
import { Categories } from "./pages/Categories/Categories";
import { GlobalStyle } from "./components/GlobalStyles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "./services/theme";
import { Text, Wrapper } from "./AppStyled";

function App() {
  const {
    isOpen: isOpenL,
    openModal: openModalL,
    closeModal: closeModalL,
  } = useModal(false);
  const {
    isOpen: isOpenD,
    openModal: openModalD,
    closeModal: closeModalD,
  } = useModal(false);
  const [deletedElementId, setDeletedElementId] = useState<string | null>(null);
  const [deletedElementAmount, setDeletedElementAmount] = useState<
    number | null
  >(null);

  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const auth = getAuth();
    dispatch(setAuthLoading());

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.uid));
        dispatch(fetchMoney());
        dispatch(fetchBalance());
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (status === "loading") {
    return (
      <Wrapper>
        <Text>Завантаження додатку...</Text>
      </Wrapper>
    );
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route
            path="/"
            element={
              <SharedLayout
                isOpenL={isOpenL}
                closeModalL={closeModalL}
                openModalL={openModalL}
              />
            }
          >
            <Route
              path="/"
              element={
                <PrivateRoute
                  redirectTo="/signup"
                  component={
                    <HomePage
                      deletedElementId={deletedElementId}
                      deletedElementAmount={deletedElementAmount}
                      isOpenD={isOpenD}
                      closeModalD={closeModalD}
                    />
                  }
                />
              }
            >
              <Route
                path="getMoney"
                element={
                  <TableStats
                    setDeletedElementId={setDeletedElementId}
                    setDeletedElementAmount={setDeletedElementAmount}
                    openModalD={async () => openModalD()}
                  />
                }
              />
              <Route
                path="spendMoney"
                element={
                  <TableStats
                    setDeletedElementId={setDeletedElementId}
                    setDeletedElementAmount={setDeletedElementAmount}
                    openModalD={async () => openModalD()}
                  />
                }
              />
            </Route>
            <Route
              path="/signup"
              element={
                <RestrictedRoute redirectTo="/spendMoney" component={SignUp} />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute redirectTo="/spendMoney" component={LogIn} />
              }
            />
            <Route
              path="/categories"
              element={
                <PrivateRoute redirectTo="/signup" component={<Categories />} />
              }
            >
              <Route path="getMoney" element={<></>} />
              <Route path="spendMoney" element={<></>} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
