import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import Box from "@material-ui/core/Box";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import {
  experiencePreference,
  resetExperiencePreference,
} from "../../redux/Reducers/experiencePreference";

import "./Preferences.css";

const values = ["Individual", "Lead"];

const preferencesData = {
  contributors: [
    { key: "individualContributor", title: "Individual Contributor" },
    { key: "peopleLead", title: "People Lead" },
  ],
  data: {
    individualContributor: [
      { id: 1, title: "Analyst", key: "analyst" },
      { id: 2, title: "Senior Analyst", key: "senior-analyst" },
      { id: 3, title: "Principal", key: "principal" },
      { id: 4, title: "CXO/Founder level", key: "founder" },
    ],
    peopleLead: [
      { id: 1, title: "Analyst", key: "analyst" },
      { id: 2, title: "Senior Analyst", key: "senior-analyst" },
      { id: 3, title: "Principal", key: "principal" },
      { id: 4, title: "CXO/Founder level", key: "founder" },
    ],
  },
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box>{children}</Box>
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: "1px solid #8993D8",
    borderRadius: "6px",
  },
  tabRoot: {
    flexGrow: 1,
    padding: "10px 15px",
    borderRight: "1px solid #8993D8",
    "&:last-child": {
      borderRight: "unset",
    },
  },
  tabPanelRoot: {
    padding: "0",
  },
  radioSelected: {
    border: "1px solid red",
  },
  selected: {
    backgroundColor: "#D8DCFF",
  },
  indicator: {
    display: "none",
  },
}));

export const Preferences = (props) => {
  const {
    experiencePreference,
    experiencePreferenceData,
    resetExperiencePreference,
  } = props;
  const [value, setValue] = useState(0);
  const [selectedRadio, setSelectedRadio] = useState("");

  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
  };
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const reset = () => {
    resetExperiencePreference();
    setSelectedRadio("");
    setValue(0);
    experiencePreference(preferencesData);
  };

  useEffect(() => {
    experiencePreference(preferencesData);
  }, []);

  return (
    <div className="container">
      <div className="headingContainer">
        <div className="heading">Experience Preferences</div>
        <div onClick={reset} className="reset">
          Reset
        </div>
      </div>
      <div className="subheading">
        Select preferences you are looking for a candidate
      </div>
      <div className="tabContainer">
        <div className="tabHeading">Previous job positions/levels held</div>
        <Tabs
          classes={{ root: classes.root, indicator: classes.indicator }}
          value={value}
          onChange={handleChange}
          variant="fullWidth"
        >
          {(experiencePreferenceData.contributors || []).map(
            (contributor, idx) => {
              return (
                <Tab
                  key={`${idx}_${contributor.title}`}
                  classes={{
                    root: classes.tabRoot,
                    selected: classes.selected,
                  }}
                  label={contributor.title}
                  {...a11yProps(idx)}
                />
              );
            }
          )}
        </Tabs>
        {(experiencePreferenceData.contributors || []).map(
          (contributor, idx) => {
            const contributorKey = contributor.key;
            return (
              <TabPanel
                key={`${idx}_${contributor.key}`}
                classes={{ root: classes.tabPanelRoot }}
                value={value}
                index={idx}
              >
                <FormControl fullWidth>
                  <RadioGroup
                    name="roles"
                    value={selectedRadio}
                    onChange={handleRadioChange}
                  >
                    {(experiencePreferenceData.data || {})[contributorKey].map(
                      (item) => {
                        return (
                          <FormControlLabel
                            key={`${idx}_${item.key}`}
                            classes={{ root: "radio" }}
                            value={item.key}
                            control={
                              <Radio
                                color="primary"
                                checked={selectedRadio === item.key}
                              />
                            }
                            label={item.title}
                          />
                        );
                      }
                    )}
                  </RadioGroup>
                </FormControl>
              </TabPanel>
            );
          }
        )}
      </div>
      <div className="outputContainer">
        <div className="tabHeading">Output: </div>
        <div className="output">
          Selected Tab: {values[value]}
          <br />
          Selected Value: {selectedRadio}
        </div>
      </div>
    </div>
  );
};

Preferences.propTypes = {
  experiencePreference: PropTypes.func.isRequired,
  resetExperiencePreference: PropTypes.func.isRequired,
  experiencePreferenceData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  experiencePreferenceData: state.experiencePreference.experiencePreference,
});

const mapDispatchToProps = {
  experiencePreference,
  resetExperiencePreference,
};

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
