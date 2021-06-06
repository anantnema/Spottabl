const EXPERIENCE_PREFERENCE = "spottabl/app/EXPERIENCE_PREFERENCE";

const RESET_EXPERIENCE_PREFERENCE = "spottabl/app/RESET_EXPERIENCE_PREFERENCE";

const initialState = {
  loaded: false,
  loading: false,
  experiencePreference: {},
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case EXPERIENCE_PREFERENCE:
      return {
        ...state,
        experiencePreference: payload,
        loading: false,
        loaded: true,
      };
    case RESET_EXPERIENCE_PREFERENCE:
      return initialState;
    default:
      return state;
  }
}

export function experiencePreference(data) {
  return {
    type: EXPERIENCE_PREFERENCE,
    payload: data,
  };
}

export function resetExperiencePreference() {
  return {
    type: RESET_EXPERIENCE_PREFERENCE,
  };
}
