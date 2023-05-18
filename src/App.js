import { MantineProvider } from "@mantine/core";
import Landing from "./pages/LandingPage/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/MainPage/Main";
import Login from "./features/auth/Login";
import Users from "./pages/UsersPage/Users";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import EditRestoran from "./features/restorani/EditRestoran";
import NewRestoran from "./features/restorani/NewRestoran";
import RestoraniList from "./features/restorani/RestoraniList";
import UsersList from "./features/users/UsersList";
import ProtectedLayout from "./components/ProtectedLayout";
import RestoraniEditList from "./features/restorani/RestoraniEditList";
import Prefetch from "./features/auth/Prefetch";
import NewRestoranForm from "./features/restorani/NewRestoranForm";
import RegisterRestoranComponent from "./features/auth/RegisterRestoranComponent";
import PersistLogin from "./features/auth/PersistLogin";
import RegisterComponent from "./features/auth/RegisterComponent";
import { ROLES } from "./config/roles";
import RequireAuth from "./features/auth/RequireAuth";
import RestoranPage from "./features/menus/RestoranPage";
import CheckoutPage from "./pages/checkoutPage/CheckoutPage";
import Panel from "./components/componentsPanel/Panel";
import RestoraniPanel from "./components/componentsPanel/RestoraniPanel";
import KorisniciPanel from "./components/componentsPanel/KorisniciPanel";
import NarudzbePanel from "./components/componentsPanel/NarudzbePanel";
import DostavljacPanel from "./components/componentsPanel/DostavljaciPanel";
import PanelDostavljac from "./components/componentsDostava/PanelDostavljac";
import PanelRstrn from "./components/componentsRestoran/PanelRstrn";
import RegisterDostavljacComponent from "./features/auth/RegisterDostavljacComponent";
import Profil from "./components/componentsProfile/Profil";
function App() {
  return (
    <div>
      <MantineProvider theme={{ primaryColor: "green" }}>
        {" "}
        <Routes>
          <Route index element={<Landing />} />

          <Route path="registracija" element={<RegisterComponent />} />
          <Route
            path="restoran-registracija"
            element={<RegisterRestoranComponent />}
          />
          <Route
            path="dostavljac-registracija"
            element={<RegisterDostavljacComponent />}
          />

          <Route path="prijava" element={<Login />} />

          <Route element={<PersistLogin />}>
            <Route
              element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
            >
              <Route element={<Prefetch />}>
                <Route path="main">
                  <Route index element={<ProtectedLayout />} />
                  <Route path="profil" element={<Profil />} />
                  <Route path=":id" element={<RestoranPage />} />

                  <Route path="checkout" element={<CheckoutPage />} />
                </Route>
                <Route
                  element={<RequireAuth allowedRoles={[ROLES.Dostavljac]} />}
                >
                  <Route
                    path="/dostavljacpanel"
                    element={<PanelDostavljac />}
                  />
                </Route>
                <Route
                  element={<RequireAuth allowedRoles={[ROLES.Restoran]} />}
                >
                  <Route path="/menus" element={<PanelRstrn />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="/panel" element={<Panel />}></Route>
                  <Route path="/restorani" element={<RestoraniPanel />} />
                  <Route path="/users" element={<KorisniciPanel />} />
                  <Route path="/narudzbe" element={<NarudzbePanel />} />
                  <Route path=":id" element={<EditUser />} />
                  <Route path="dostavljaci" element={<DostavljacPanel />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </MantineProvider>
    </div>
  );
}

export default App;
