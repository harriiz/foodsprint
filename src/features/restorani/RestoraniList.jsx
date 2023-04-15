import { useGetRestoraniQuery } from "./restoraniApiSlice";

import Restorani from "./Restorani";
const RestoraniList = ({ selectedCategory }) => {
  const {
    data: restorani,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRestoraniQuery("restoraniList");

  // console.log(restorani);

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess && restorani && restorani.ids) {
    const { ids } = restorani;

    let listRestorana;
    if (!selectedCategory) {
      listRestorana = ids.map((restoranId) => {
        return <Restorani key={restoranId} restoranId={restoranId} />;
      });
    } else {
      listRestorana = ids.map((restoranId) => {
        if (restorani.entities[restoranId].kategorija === selectedCategory) {
          return <Restorani key={restoranId} restoranId={restoranId} />;
        }
      });
    }
    content = <div>{listRestorana}</div>;
  }

  return content;
};
export default RestoraniList;

/* 
  if (!isLoading && !isError && restorani) {
    const { ids } = restorani;

    const tableContent =
      ids?.length &&
      ids.map((restoranId) => {
        if (restorani.entities[restoranId].kategorija === selectedCategory) {
          return <Restorani key={restoranId} restoranId={restoranId} />;
        }
      });
    content = <div>{tableContent}</div>;
  }

  let restoran1 = restorani.ids[0];
  console.log(restorani.entities[restoran1].kategorija);
  console.log(restoran1);

  return content;
};
*/
