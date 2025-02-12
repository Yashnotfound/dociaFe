import { Fullscreen } from "@mui/icons-material";
import { Container, Paper, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const Homepage = () => {
  return (
    <>
      <Container>
        <Paper elevation={3} sx={{ padding: 2, marginTop: 5, flexGrow: 1 }}>
          <Typography variant="h3" align="center" fontFamily={"-moz-initial"}>
            Manage your docs with Docia
          </Typography>
        </Paper>
        <TabContext value="1">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList aria-label="lab API tabs example" centered>
              <Tab label="General Docs" value="1" />
              <Tab label="API Docs" value="2" />
              <Tab label="Your Docs" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Container>
    </>
  );
};
export default Homepage;
