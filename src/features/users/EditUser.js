import { useParams } from "react-router-dom"; // get userId parametr
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";

// ensuring if we have data before editing
const EditUser = ({ user }) => {
  // const { id } = useParams(); // pulling the id from url

  //pasing the id value in, memoized query

  const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>; // if we have user edit if not loading

  return content;
};
export default EditUser;
