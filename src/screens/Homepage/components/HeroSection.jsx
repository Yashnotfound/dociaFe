import { Container } from "@mui/material";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React from "react";
import CardHolder from "./CardHolder";
import { UserContext } from "../../../App";
import {useContext} from "react";

const HeroSection = ({value, tabChangeHandler}) => {
    const {userAuth:{accessToken,role} = {}} = useContext(UserContext);
  return (
    <Container>
        <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={tabChangeHandler} aria-label="lab API tabs example" centered>
            {accessToken&&role==="ADMIN"?<Tab label="Pending Requests" value="pending" />:null}
            <Tab label="General Docs" value="general" />
            <Tab label="API Contracts" value="api" />
            {accessToken?<Tab label="Your Docs" value="user" />:null}
            </TabList>
        </Box>
        <TabPanel value = {value}>{<CardHolder type = {value} />}</TabPanel>
        </TabContext>
    </Container>
  );
};

export default HeroSection;
