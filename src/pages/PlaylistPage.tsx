import { useOutletContext } from "react-router-dom";
import Title from "../components/Title";
import Description from "../components/Description";
import Container from "../components/Container";

const PlaylistPage = () => {
  const { isPhoneScreen } = useOutletContext<{ isPhoneScreen: boolean }>();

  return (
    <Container isPhoneScreen={isPhoneScreen}>
      <Title text="Playlists" />
      <Description text="Here you can manage your playlists." />
    </Container>
  );
};

export default PlaylistPage;
