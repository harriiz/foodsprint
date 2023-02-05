import { store } from "../../app/store";
import { restoraniApiSlice } from "../restorani/restoraniApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { menusApiSlice } from "../menus/menusApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    const restorani = store.dispatch(
      restoraniApiSlice.endpoints.getRestorani.initiate()
    );
    const menus = store.dispatch(menusApiSlice.endpoints.getMenus.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    return () => {
      restorani.unsubscribe();
      users.unsubscribe();
      menus.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;
