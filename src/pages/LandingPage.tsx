import Container from "../components/layout/Container";
import Description from "../components/layout/Description";
import Title from "../components/layout/Title";

const LandingPage = () => {

  return (
    <Container>
      <Title text="Welcome to Eleanor" />
      <Description text="Media Library Server - Electronic Library for Entertainment, Audio, and ORganization." />
    </Container>
  );
};

export default LandingPage;
