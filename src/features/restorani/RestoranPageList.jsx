import { useGetRestoraniQuery } from "./restoraniApiSlice";

import Restorani from "./Restorani";
const RestoraniPageList = () => {
  const {
    data: restorani,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRestoraniQuery("restoraniList");

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = restorani;

    const tableContent = ids?.length
      ? ids.map((restoranId) => (
          <Restorani key={restoranId} restoranId={restoranId} />
        ))
      : null;

    content = <div>{tableContent}</div>;
  }

  return content;
};
export default RestoraniPageList;
