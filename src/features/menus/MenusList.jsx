import { useGetMenusQuery } from "./menusApiSlice";
import Menus from "./Menus";

function MenusList() {
  const {
    data: menus,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMenusQuery;

  let content;

  if (isError) {
    content = <p>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = menus;
    const tableContent = ids?.length
      ? ids.map((menuId) => <Menus key={menuId} menuId={menuId} />)
      : null;
    content = <div>{tableContent}</div>;
  }
  return content;
}

export default MenusList;
