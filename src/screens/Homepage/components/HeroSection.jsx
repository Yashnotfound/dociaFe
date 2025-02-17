import React, { useContext } from "react";
import { Container, Box, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CardHolder from "../containers/CardHolder";
import heroSectionLogic from "../containers/heroSectionLogic";
import { UserContext } from "../../../App";

const HeroSection = () => {
  const { value, tabChangeHandler } = heroSectionLogic();
  const { userAuth } = useContext(UserContext);
  const accessToken = userAuth?.accessToken;
  const role = userAuth?.role;

  const isAdmin = !!(accessToken && role === "ADMIN");
  const isLoggedIn = !!accessToken;

  let tabs = [];
  if (isAdmin) {
    tabs = [
      { label: "All Docs", value: "all-docs" },
      { label: "Your Docs", value: "user" },
      { label: "General Docs", value: "general" },
      { label: "API Contracts", value: "api" },
    ];
  } else if (isLoggedIn) {
    tabs = [
      { label: "Your Docs", value: "user" },
      { label: "General Docs", value: "general" },
      { label: "API Contracts", value: "api" },
    ];
  } else {
    tabs = [
      { label: "General Docs", value: "general" },
      { label: "API Contracts", value: "api" },
    ];
  }

  return (
    <Container maxWidth="xl" sx={{ marginBottom: 5 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={tabChangeHandler}>
            {tabs.map((tab, idx) => (
              <Tab key={idx} label={tab.label} value={tab.value} />
            ))}
          </TabList>
        </Box>
        <TabPanel value={value}>
          <CardHolder type={value} />
        </TabPanel>
      </TabContext>
    </Container>
  );
};

export default HeroSection;
