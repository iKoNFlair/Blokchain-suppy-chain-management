// Import your action types

import { SET_ACTIVE_PAGE } from "../Actions/navbarActions";

// Initial state
const initialState = {
  activePage: "Home", // Set the initial active page here
};

// Reducer function
const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload,
      };
    default:
      return state;
  }
};

export default navbarReducer;
