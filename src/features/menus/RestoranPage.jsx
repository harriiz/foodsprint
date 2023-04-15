import React from "react";
import { useSelector } from "react-redux";
import { selectRestoranById } from "../restorani/restoraniApiSlice";
import { Location } from "react-router";
import { useLocation } from "react-router";
import { useGetRestoraniQuery } from "../restorani/restoraniApiSlice";
import { selectMenuById, useGetMenusQuery } from "./menusApiSlice";
import { type } from "@testing-library/user-event/dist/type";
import MenuItem from "./MenuItem";
import NavigacijaMain from "../../components/componentsMain/NavigacijaMain";
import "./menuItem.css";
import AsideRestoran from "./AsideRestoran";
import RestoranHeader from "./RestoranHeader";
import { CLASS_PAGINATION } from "@splidejs/splide";
import { selectAllMenus } from "./menusApiSlice";
function RestoranPage() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const restoran = useSelector((state) => selectRestoranById(state, id));
  const menus = useSelector(selectAllMenus);

  if (!restoran || !menus) {
    return <div>Loading...</div>;
  }

  const groupedMenus = Object.values(
    menus
      .filter((menu) => menu.restoran && menu.restoran._id === id)
      .reduce((groupedItems, menu) => {
        groupedItems[menu.kategorija] = groupedItems[menu.kategorija] || [];
        groupedItems[menu.kategorija].push(menu);
        return groupedItems;
      }, {})
  );

  if (menus && restoran) {
    return (
      <>
        <NavigacijaMain />
        <AsideRestoran />
        <div className="menuHeader">
          <RestoranHeader
            restoranImg={restoran.image.url}
            restoranNaziv={restoran.naziv}
            restoranAdresa={restoran.adresa}
            restoranKategorija={restoran.kategorija}
          />
          <div className="menuItems">
            {groupedMenus.map((categoryItems) => {
              return (
                <fieldset
                  key={categoryItems[0].kategorija}
                  className="kategorijaContainer"
                >
                  <legend>{categoryItems[0].kategorija}</legend>
                  {categoryItems.map((item) => {
                    return (
                      <div key={item._id}>
                        <MenuItem
                          naziv={item.naziv}
                          cijena={item.cijena}
                          kategorija={item.kategorija}
                          id={item._id}
                          image={item.image.url}
                        />
                      </div>
                    );
                  })}
                </fieldset>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

// if (!isLoading && !isError && menus && restoran) {
//   return (
//     <>
//       <NavigacijaMain />
//       <AsideRestoran />
//       <div className="menuHeader">
//         <RestoranHeader
//           restoranImg={restoran.image.url}
//           restoranNaziv={restoran.naziv}
//           restoranAdresa={restoran.adresa}
//           restoranKategorija={restoran.kategorija}
//         />
//         <div className="menuItems">
//           {Object.values(
//             menus.ids
//               .filter(
//                 (id) =>
//                   menus.entities[id].restoran &&
//                   menus.entities[id].restoran._id === idProvjera
//               )
//               .reduce((groupedItems, id) => {
//                 const item = menus.entities[id];
//                 groupedItems[item.kategorija] =
//                   groupedItems[item.kategorija] || [];
//                 groupedItems[item.kategorija].push(item);
//                 return groupedItems;
//               }, {})
//           ).map((categoryItems) => {
//             return (
//               <>
//                 <fieldset
//                   key={categoryItems[0].kategorija}
//                   className="kategorijaContainer"
//                 >
//                   <legend>{categoryItems[0].kategorija}</legend>
//                   {categoryItems.map((item) => {
//                     return (
//                       <div key={item.id}>
//                         <MenuItem
//                           naziv={item.naziv}
//                           cijena={item.cijena}
//                           kategorija={item.kategorija}
//                           id={item.id}
//                           image={item.image.url}
//                         />
//                       </div>
//                     );
//                   })}
//                 </fieldset>
//               </>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// } else {
//   return <div>Loading...</div>;
// }

export default RestoranPage;
