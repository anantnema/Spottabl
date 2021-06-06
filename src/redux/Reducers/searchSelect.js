const SEARCH_SELECT = "spottabl/app/SEARCH_SELECT";

const RESET_SEARCH_SELECT = "spottabl/app/RESET_SEARCH_SELECT";

const initialState = {
  loaded: false,
  loading: false,
  searchSelect: {
    suggestions: [],
    data: [],
  },
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_SELECT:
      return {
        ...state,
        searchSelect: payload,
        loading: false,
        loaded: true,
      };
    case RESET_SEARCH_SELECT:
      return initialState;
    default:
      return state;
  }
}

export function setSearchSelect(data) {
  return {
    type: SEARCH_SELECT,
    payload: data,
  };
}

export function resetSearchSelect() {
  return {
    type: RESET_SEARCH_SELECT,
  };
}
