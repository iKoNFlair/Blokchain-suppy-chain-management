// Define your action types
export const SET_ACTIVE_PAGE = "SET_ACTIVE_PAGE";

// Create an action to set the active page
export const setActivePage = (page) => ({
  type: SET_ACTIVE_PAGE,
  payload: page,
});
