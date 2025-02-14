import { Container,} from "@mui/material";
import Header from "./components/header";
import HeroSection from "./components/heroSection";
import Footer from "./components/footer";
import heroSectionLogic from "./containers/heroSectionLogic";
import AnimationWrapper from "../../utils/page-animation";
const Homepage = () => {
  const { value, tabChangeHandler, isAuthenticated } = heroSectionLogic();
  return (
    <>
      <Container maxWidth="xl">
        <AnimationWrapper />
        <Header />
        <HeroSection value = {value} tabChangeHandler = {tabChangeHandler} isAuthenticated = {isAuthenticated}/>
       <Footer />
      </Container>
    </>
  );
};
export default Homepage;
