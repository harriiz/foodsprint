import { useParams } from "react-router-dom"; // get userId parametr
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import EditUserFormProfil from "./EditUserFormProfil";

// ensuring if we have data before editing
const EditUserProfil = ({ user }) => {
  // const { id } = useParams(); // pulling the id from url

  //pasing the id value in, memoized query

  const content = user ? <EditUserFormProfil user={user} /> : <p>Loading...</p>; // if we have user edit if not loading

  return content;
};
export default EditUserProfil;
