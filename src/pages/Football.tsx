import Container from "../components/layout/Container";
import { useParams } from "react-router-dom";
import Title from "../components/layout/Title";

const PlaylistPage = () => {
  const { team } = useParams<{ team: string }>();

  return (
    <Container >
      <Title text={`Playlist ${team || 'Liverpool'}`} withBack />
      <div className="w-full h-86 md:h-1116 lg:h-160 py-20">
        <iframe
          style={{ border: 0, height: "100%", width: "100%" }}
          src={`https://givemereddit.eu/soccer/${team || 'liverpool'}.html`}
          allowFullScreen
          allowTransparency />
      </div>
    </Container>
  );
};

export default PlaylistPage;
