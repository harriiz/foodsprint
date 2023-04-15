import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isDostavljac = false;
  let isRestoran = false;
  let isAdmin = false;
  let status = "Korisnik";
  let userId = null;

  // console.log(token);

  if (token) {
    const decoded = jwtDecode(token);
    const { username, userId, roles } = decoded.UserInfo;

    isDostavljac = roles.includes("Dostavljac");
    isRestoran = roles.includes("Restoran");
    isAdmin = roles.includes("Admin");

    if (isDostavljac) status = "Dostavljac;";
    if (isRestoran) status = "Restoran";
    if (isAdmin) status = "Admin";
    // console.log("yes token");
    return {
      username,
      roles,
      status,
      userId,
      isDostavljac,
      isRestoran,
      isAdmin,
    };
  }
  // console.log("no token");
  return {
    username: "",
    roles: [],
    userId,
    isRestoran,
    isDostavljac,
    isAdmin,
    status,
  };
};
export default useAuth;
