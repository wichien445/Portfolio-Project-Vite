import * as React from "react";
import "../../../css/style.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import EditEmployee from "./edit-employee";
import EditEducation from "./edit-education";
import EditLanguage from "./edit-languege-skill";
import EditTechnical from "./edit-technical-skill";
import EditCertificate from "./edit-cetificate";
import EditWorkExp from "./edit-workexperience";

function Edit() {
  const [value, setValue] = React.useState("personal");
  const [value2, setValue2] = React.useState("");
  const [value3, setValue3] = React.useState("");
  const [value4, setValue4] = React.useState("");
  const [value5, setValue5] = React.useState("");
  const [value6, setValue6] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setValue2(newValue);
    setValue3(newValue);
    setValue4(newValue);
    setValue5(newValue);
    setValue6(newValue);
  };
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="ข้อมูลพนักงาน" value="personal" />
            <Tab label="การศึกษา" value="edu" />
            <Tab label="ทักษะทางภาษา" value="language" />
            <Tab label="ทักษะทางคอมพิวเตอร์" value="technicalSkill" />
            <Tab label="การอบรม" value="certification" />
            <Tab label="ประสบการณ์ทำงาน" value="workExperience" />
          </TabList>
        </Box>
        <TabPanel value="personal">{value && <EditEmployee />}</TabPanel>

        <TabPanel value="edu">{value2 && <EditEducation />}</TabPanel>
        <TabPanel value="language">{value3 && <EditLanguage />}</TabPanel>
        <TabPanel value="technicalSkill">
          {value4 && <EditTechnical />}
        </TabPanel>
        <TabPanel value="certification">
          {value5 && <EditCertificate />}
        </TabPanel>
        <TabPanel value="workExperience">{value6 && <EditWorkExp />}</TabPanel>
      </TabContext>
    </Box>
  )
}

export default Edit