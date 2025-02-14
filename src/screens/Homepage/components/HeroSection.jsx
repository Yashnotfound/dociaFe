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
    const {userAuth,userAuth:{accessToken,role} = {}} = useContext(UserContext);
  return (
    <Container maxWidth="xl" sx={{marginBottom: 5}}>
        <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={tabChangeHandler}>
            {userAuth&&accessToken&&role==="ADMIN"?<Tab label="Pending Requests" value="pending" />:null}
            {userAuth&&accessToken&&role==="ADMIN"?<Tab label="All Docs" value="all-docs" />:null}

            <Tab label="General Docs" value="general" />
            <Tab label="API Contracts" value="api" />
            {userAuth&&accessToken?<Tab label="Your Docs" value="user" />:null}
            </TabList>
        </Box>
        {
          <TabPanel value = {value}>{<CardHolder type = {value} />}</TabPanel>
        }
        </TabContext>
    </Container>
  );
};

export default HeroSection;
