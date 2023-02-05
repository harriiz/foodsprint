import { Outlet } from "react-router-dom";
import Main from "../pages/MainPage/Main";
const ProtectedLayout = () => {
  return (
    <>
      <Main />
      <Outlet />
    </>
  );
};
export default ProtectedLayout;
