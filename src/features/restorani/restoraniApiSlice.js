import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const restoraniAdapter = createEntityAdapter({});

const initialState = restoraniAdapter.getInitialState();

export const restoraniApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRestorani: builder.query({
      query: () => "/restorani",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedRestorani = responseData.map((restoran) => {
          restoran.id = restoran._id;
          return restoran;
        });
        return restoraniAdapter.setAll(initialState, loadedRestorani);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Restoran", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Restoran", id })),
          ];
        } else return [{ type: "Restoran", id: "LIST" }];
      },
    }),
    addNewRestoran: builder.mutation({
      query: (initialRestoranData) => ({
        url: "/restorani",
        method: "POST",
        body: {
          ...initialRestoranData,
        },
      }),
      invalidatesTags: [{ type: "Restoran", id: "LIST" }],
    }),
    updateRestoran: builder.mutation({
      query: (initialRestoranData) => ({
        url: "/restorani",
        method: "PATCH",
        body: {
          ...initialRestoranData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Restoran", id: arg.id },
      ],
    }),
    deleteRestoran: builder.mutation({
      query: ({ id }) => ({
        url: `/restorani`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Restoran", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetRestoraniQuery,
  useAddNewRestoranMutation,
  useUpdateRestoranMutation,
  useDeleteRestoranMutation,
} = restoraniApiSlice;

// returns the query result object
export const selectRestoraniResult =
  restoraniApiSlice.endpoints.getRestorani.select();

// creates memoized selector
const selectRestoraniData = createSelector(
  selectRestoraniResult,
  (restoraniResult) => restoraniResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllRestorani,
  selectById: selectRestoranById,
  selectIds: selectRestoranIds,
  // Pass in a selector that returns the restorani slice of state
} = restoraniAdapter.getSelectors(
  (state) => selectRestoraniData(state) ?? initialState
);
