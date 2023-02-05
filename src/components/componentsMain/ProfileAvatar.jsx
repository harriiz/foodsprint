import {
  Menu,
  Button,
  Text,
  MantineProvider,
  Autocomplete,
} from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons";
import { Avatar } from "@mantine/core";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import useAuth from "../../hooks/useAuth";

const MAIN_REGEX = /^\/main(\/)?$/;
const RESTORANI_REGEX = /^\/restorani(\/)?$/;
const USERS_REGEX = /^\/users(\/)?$/;

function ProfileAvatar() {
  const { username, status, isRestoran, isAdmin, isDostavljac } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Logging Out...</p>;

  if (isError) return <p>Error: {error.data?.message}</p>;

  let dashClass = null;
  if (
    !MAIN_REGEX.test(pathname) &&
    !RESTORANI_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={sendLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  function Demo() {
    return (
      <MantineProvider>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Avatar
              radius="lg"
              color="green"
              className="avatar"
              sx={{ width: 50, height: 50 }}
            />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>{username}</Menu.Label>

            <Menu.Divider />

            <Link to="profil">
              <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
                Moj Profil
              </Menu.Item>
            </Link>
            {isRestoran && (
              <Link to="/restoranpanel">
                <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
                  Restoran Panel
                </Menu.Item>
              </Link>
            )}
            {isAdmin && (
              <Link to="/panel">
                <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
                  Admin Panel
                </Menu.Item>
              </Link>
            )}

            {isDostavljac && (
              <Link to="/dostavljacpanel">
                <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
                  Dostavljac Panel
                </Menu.Item>
              </Link>
            )}
            <Menu.Item color="red" icon={<IconTrash size={14} />}>
              {logoutButton}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </MantineProvider>
    );
  }
  return Demo();
}

export default ProfileAvatar;
