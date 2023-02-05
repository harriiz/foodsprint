import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const menusAdapter = createEntityAdapter({});
const initialState = menusAdapter.getInitialState();

export const menusApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenus: builder.query({
      query: () => "/menus",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },

      transformResponse: (responseData) => {
        const loadedMenus = responseData.map((menu) => {
          menu.id = menu._id;
          return menu;
        });
        return menusAdapter.setAll(initialState, loadedMenus);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Menu", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Menu", id })),
          ];
        } else return [{ type: "Menu", id: "LIST" }];
      },
    }),
    addNewMenu: builder.mutation({
      query: (initialMenuData) => ({
        url: "/menus",
        method: "POST",
        body: {
          ...initialMenuData,
        },
      }),
      invalidatesTags: [{ type: "Menu", id: "LIST" }],
    }),
    updateMenu: builder.mutation({
      query: (initialMenuData) => ({
        url: "/menus",
        method: "PATCH",
        body: {
          ...initialMenuData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Menu", id: arg.id }],
    }),
    deleteMenu: builder.mutation({
      query: ({ id }) => ({
        url: `/menus`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Menus", id: arg.id }],
    }),
  }),
});

export const {
  useGetMenusQuery,
  useAddNewMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
} = menusApiSlice;

export const selectMenusResult = menusApiSlice.endpoints.getMenus.select();

const selectMenusData = createSelector(
  selectMenusResult,
  (menusResult) => menusResult.data
);

export const {
  selectAll: selectAllMenus,
  selectById: selectMenuById,
  selectIds: selectMenuIds,
} = menusAdapter.getSelectors(
  (state) => selectMenusData(state) ?? initialState
);
