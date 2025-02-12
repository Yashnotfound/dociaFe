import { Container,} from "@mui/material";
import Header from "./components/header";
import HeroSection from "./components/heroSection";
import Footer from "./components/footer";
const Homepage = () => {
  const value = "1";
  return (
    <>
      <Container>
        <Header />
       <HeroSection props = {value}/>
       <Footer />
      </Container>
    </>
  );
};
export default Homepage;
