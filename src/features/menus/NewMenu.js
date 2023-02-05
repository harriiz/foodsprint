import { useSelector } from "react-redux";
import { selectAllRestorani } from "../restorani/restoraniApiSlice";
import NewMenuForm from "./NewMenuForm";

const NewMenu = () => {
  const restorani = useSelector(selectAllRestorani);

  if (!restorani?.length) return <p>Not available</p>;

  const content = <NewMenuForm restorani={restorani} />;
  return content;
};

export default NewMenu;
