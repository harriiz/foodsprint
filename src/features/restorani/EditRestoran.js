import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRestoranById } from "./restoraniApiSlice";
import { selectAllUsers } from "../users/usersApiSlice";
import EditRestoranForm from "./EditRestoranForm";

const EditRestoran = ({ id }) => {
  // const { id } = useParams();

  const restoran = useSelector((state) => selectRestoranById(state, id));
  const users = useSelector(selectAllUsers);

  const content =
    restoran && users ? (
      <EditRestoranForm restoran={restoran} users={users} />
    ) : (
      <p>Loading...</p>
    );

  return content;
};
export default EditRestoran;
