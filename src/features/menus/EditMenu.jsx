import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice";
import EditMenuForm from "./EditMenuForm";
import { selectAllRestorani } from "../restorani/restoraniApiSlice";
import { selectMenuById } from "./menusApiSlice";
const EditMenu = ({ id }) => {
  // const { id } = useParams();

  const menu = useSelector((state) => selectMenuById(state, id));
  const restorani = useSelector(selectAllRestorani);

  console.log(menu);

  const content =
    menu && restorani ? (
      <EditMenuForm menu={menu} restorani={restorani} />
    ) : (
      <p>Loading...</p>
    );

  return content;
};
export default EditMenu;
