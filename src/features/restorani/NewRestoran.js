import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice";
import NewRestoranForm from "./NewRestoranForm";

const NewRestoran = () => {
  const users = useSelector(selectAllUsers);

  if (!users?.length) return <p>Not Currently Available</p>;

  const content = <NewRestoranForm users={users} />;

  return content;
};
export default NewRestoran;

// import { useSelector } from "react-redux";
// import { selectAllUsers } from "../users/usersApiSlice";
// import NewRestoranForm from "./NewRestoranForm";

// const NewRestoran = () => {
//   const users = useSelector(selectAllUsers);

//   const content = users ? <NewRestoranForm users={users} /> : <p>Loading...</p>;

//   return content;
// };
// export default NewRestoran;
