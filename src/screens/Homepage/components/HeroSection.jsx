import { Container } from "@mui/material";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React from "react";
import CardHolder from "./CardContainer";
import { UserContext } from "../../../App";
import {useContext} from "react";

const HeroSection = ({value, changeHandler}) => {
    const {userAuth:{accessToken} = {}} = useContext(UserContext);
  return (
    <Container>
        <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={changeHandler} aria-label="lab API tabs example" centered>
            <Tab label="General Docs" value="general" />
            <Tab label="API Docs" value="api" />
            {accessToken?<Tab label="Your Docs" value="user" />:null}
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
