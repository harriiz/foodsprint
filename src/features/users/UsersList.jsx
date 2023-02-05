import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import { ROLES } from "../../config/roles";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import "./usersList.css";
function UsersList() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList");

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  const username = JSON.parse(localStorage.getItem("username"));

  if (isSuccess) {
    const { ids } = users; //destructuring ids
    {
      users.ids
        .filter((id) => users.entities[id].username === username)
        .map((id) => {
          // console.log(username, users.entities[id].id);
        });
    }

    const tableContent = ids?.length // da li postoje ids
      ? ids.map((userId) => <User key={userId} userId={userId} />) // maping over tose ids
      : null;

    content = (
      <>
        <h2>Uređivanje/Brisanje korisnika</h2>
        <br />
        <table className="table table--users">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th user__username">
                Username
              </th>
              <th scope="col" className="table__th user__roles">
                Roles
              </th>
              <th scope="col" className="table__th user__edit">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </>
    );
  }

  return content;
}

export default UsersList;
