import { Container, Row } from "react-bootstrap";
import { Cloudinary } from "@cloudinary/url-gen/index";
import "./Musician.css";
import Headshot from "./Headshot";
import Bio from "./Bio";

export interface MusicianProps {
  id: number;
  name: string;
  bio: string;
  headshot_id: string;
  type?: string;
  onBioChange: () => void;
  onHeadshotChange?: () => void;
}

function Musician(props: MusicianProps) {
  const textPosition = props.id % 2 === 0 ? "text-end" : "text-start";
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dreftv0ue",
    },
  });
  const image = cld.image(props.headshot_id);
  const imgUrl = image.toURL();

  const key = `musician-${props.id}`;

  const bioCard = (
    <Bio
      key={key}
      musician={props}
      textPosition={textPosition}
      onBioChange={props.onBioChange}
    />
  );

  const headshot = (
    <Headshot
      src={imgUrl}
      key="headshot"
      musician={props}
      onHeadshotChange={props?.onHeadshotChange}
    />
  );

  return (
    <Container id={`musician-${props.id}`} className="musician-container">
      <Row className="row-spacing">
        {props.id % 2 === 0 ? [bioCard, headshot] : [headshot, bioCard]}
      </Row>
    </Container>
  );
}

export default Musician;
