import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mantine/core";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";
import { useState } from "react";
import EditUser from "./EditUser";
import { useLocation } from "react-router-dom";

const User = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (user) {
    const handleEdit = () => setModalOpen(true);
    const handleInfo = () => {
      setModalOpen2(true);
      console.log(user);
    };

    const userRolesString = user.roles.toString().replaceAll(",", ", ");

    const cellStatus = user.active ? "" : "table__cell--inactive";

    return (
      <>
        <Modal
          opened={modalOpen}
          onClose={() => setModalOpen(false)}
          size={"xl"}
          centered
        >
          <EditUser user={user} />
        </Modal>
        {user.slikaZahtjev && user.slikaZahtjev.url ? (
          <Modal
            opened={modalOpen2}
            onClose={() => setModalOpen2(false)}
            size={"xs"}
            centered
            title="Zatraženi restoran"
          >
            <div className="zahtjevInfo">
              <h3>Naziv restorana: {user.nazivZahtjev}</h3>
              <h3>Adresa restorana: {user.adresaZahtjev}</h3>
              <h3>Logo restorana:</h3>
              <img src={user.slikaZahtjev.url} className="slikaZahtjev" />
            </div>
          </Modal>
        ) : null}
        <tr className="table__row user">
          <td className={`table__cell ${cellStatus}`}>{user.username}</td>

          <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
          <td className={`table__cell ${cellStatus}`}>
            <button className="icon-button table__button" onClick={handleEdit}>
              <FontAwesomeIcon icon={faPenToSquare} size="xl" />
            </button>
          </td>
          {location.pathname === "/restorani" ? (
            <td className={`table__cell ${cellStatus} tdHide`}>
              <button
                className="icon-button table__button"
                onClick={handleInfo}
              >
                INFO
              </button>
            </td>
          ) : null}
        </tr>
      </>
    );
  } else return null;
};
export default User;
