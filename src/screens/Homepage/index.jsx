import { Container,} from "@mui/material";
import Header from "./components/header";
import HeroSection from "./components/heroSection";
import Footer from "./components/footer";
import heroSectionLogic from "./containers/heroSectionlogic";
const Homepage = () => {
  const { value, changeHandler } = heroSectionLogic();
  return (
    <>
      <Container>
        <Header />
       <HeroSection value = {value} changeHandler = {changeHandler}/>
       <Footer />
      </Container>
    </>
  );
};
export default Homepage;
