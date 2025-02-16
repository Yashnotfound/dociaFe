import { Container,} from "@mui/material";
import Header from "./header";
import HeroSection from "./heroSection";
import Footer from "./footer";
import heroSectionLogic from "../containers/heroSectionLogic";
import AnimationWrapper from "../../../navigation/hoc/page-animation";
const Homepage = () => {
  const { value, tabChangeHandler, isAuthenticated } = heroSectionLogic();
  return (
    <>
      <AnimationWrapper >
      <Container maxWidth="xl">
        <Header />
        <HeroSection value = {value} tabChangeHandler = {tabChangeHandler} isAuthenticated = {isAuthenticated}/>
       <Footer />
      </Container>
      </AnimationWrapper>
    </>
  );
};
export default Homepage;
