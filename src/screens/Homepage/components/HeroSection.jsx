import { Container } from "@mui/material";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import React from "react";
import CardHolder from "./CardContainer";

const HeroSection = ({value, changeHandler, isAuthenticated}) => {
  return (
    <Container>
        <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={changeHandler} aria-label="lab API tabs example" centered>
            <Tab label="General Docs" value="general" />
            <Tab label="API Docs" value="api" />
            {isAuthenticated&<Tab label="Your Docs" value="user" />}
            </TabList>
        </Box>
        <TabPanel value="general">{<CardHolder />}</TabPanel>
        <TabPanel value="api">Item Two</TabPanel>
        <TabPanel value="user">Item Three</TabPanel>
        </TabContext>
    </Container>
  );
};

export default HeroSection;
