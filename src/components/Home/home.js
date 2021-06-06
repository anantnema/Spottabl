import React, { Fragment} from "react";
// import PropTypes from "prop-types";
import { Preferences } from "../ExperiencePreferences";
import { SearchSelect } from "../SearchSelect";

export const Home = () => {
  return (
    <Fragment>
      <Preferences />
      <SearchSelect />
    </Fragment>
  );
};

// Home.propTypes = {
// };

export default Home;
