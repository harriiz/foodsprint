import React from "react";
import { useSelector } from "react-redux";
import {
  selectRestoranById,
  selectAllRestorani,
} from "../restorani/restoraniApiSlice";
import { Location } from "react-router";
import { useLocation } from "react-router";
import { useGetRestoraniQuery } from "../restorani/restoraniApiSlice";
import { selectMenuById, useGetMenusQuery } from "../menus/menusApiSlice";
import MenuEditItem from "../menus/MenuEditItem";
import "../menus/menuItem.css";
import useAuth from "../../hooks/useAuth";

function MenuListPanel() {
  const { userId } = useAuth();
  const restoran = useSelector(selectAllRestorani);
  // const menu = useSelector((state) => selectMenuById(state, id));
  console.log(restoran);
  let rstrnId;
  for (let i = 0; i < restoran.length; i++) {
    if (restoran[i].user._id == userId) {
      rstrnId = restoran[i].id;
    } else {
      console.log("no match");
    }
  }

  console.log(rstrnId);

  const {
    data: menus,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMenusQuery();
  console.log(restoran);
  console.log("aeeaeea" + restoran[0]._id);

  if (menus) {
    return (
      <div className="menuItems">
        {Object.values(
          menus.ids
            .filter(
              (id) =>
                menus.entities[id].restoran &&
                menus.entities[id].restoran._id === rstrnId
            )
            .reduce((groupedItems, id) => {
              const item = menus.entities[id];
              groupedItems[item.kategorija] =
                groupedItems[item.kategorija] || [];
              groupedItems[item.kategorija].push(item);
              return groupedItems;
            }, {})
        ).map((categoryItems) => {
          return (
            <>
              <fieldset
                key={categoryItems[0].kategorija}
                className="kategorijaContainer"
              >
                <legend>{categoryItems[0].kategorija}</legend>
                {categoryItems.map((item) => {
                  return (
                    <div key={item.id}>
                      <MenuEditItem
                        naziv={item.naziv}
                        cijena={item.cijena}
                        kategorija={item.kategorija}
                        id={item.id}
                        image={item.image.url}
                      />
                    </div>
                  );
                })}
              </fieldset>
            </>
          );
        })}
      </div>
    );
  }
}

export default MenuListPanel;
