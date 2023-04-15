import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import { ROLES } from "../../config/roles";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import "./usersList.css";
function DostavljacList() {
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

    const filteredIds = ids.filter((id) =>
      users.entities[id].roles.includes("Dostavljac")
    );
    const tableContent = filteredIds?.length
      ? filteredIds.map((userId) => <User key={userId} userId={userId} />)
      : null;

    const filteredIdsZahtjev = ids.filter((id) =>
      users.entities[id].roles.includes("DostavljacZahtjev")
    );
    const tableContentZahtjev = filteredIdsZahtjev?.length
      ? filteredIdsZahtjev.map((userId) => (
          <User key={userId} userId={userId} />
        ))
      : null;

    content = (
      <>
        <h2>Uređivanje/Brisanje Dostavljača</h2>

        <table className="table table--users">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th user__username">
                Dostavljač
              </th>
              <th scope="col" className="table__th user__roles">
                Role
              </th>
              <th scope="col" className="table__th user__edit">
                Uredi
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
        <h2 className="zhtjvDost">Zahtjevi za dostavljača</h2>

        <table className="table table--users">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th user__username">
                Dostavljač
              </th>
              <th scope="col" className="table__th user__roles">
                Role
              </th>
              <th scope="col" className="table__th user__edit">
                Uredi
              </th>
            </tr>
          </thead>
          <tbody>{tableContentZahtjev}</tbody>
        </table>
      </>
    );
  }

  return content;
}

export default DostavljacList;
