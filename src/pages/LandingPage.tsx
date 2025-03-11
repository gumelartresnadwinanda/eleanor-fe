import { useOutletContext } from "react-router-dom";
import Title from "../components/Title";
import Description from "../components/Description";
import Container from "../components/Container";

const LandingPage = () => {
  const { isPhoneScreen } = useOutletContext<{ isPhoneScreen: boolean }>();

  return (
    <Container isPhoneScreen={isPhoneScreen}>
      <Title text="Welcome to Eleanor" />
      <Description text="Media Library Server - Electronic Library for Entertainment, Audio, and ORganization." />
    </Container>
  );
};

export default LandingPage;
