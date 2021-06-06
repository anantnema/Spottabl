import { combineReducers } from "../../node_modules/redux";
import experiencePreference from "./Reducers/experiencePreference";
import searchSelect from "./Reducers/searchSelect";
export default combineReducers({
  experiencePreference,
  searchSelect,
});
