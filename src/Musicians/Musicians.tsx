import { useState } from "react";
import Musician, { MusicianProps } from "./Musician/Musician";
import { Col, Container } from "react-bootstrap";
import "./Musicians.css";

interface MusiciansProps {
  musicians: MusicianProps[];
}

function Musicians(props: MusiciansProps) {
  const [update, setUpdate] = useState<boolean>(false);
  const handleBioChange = () => {
    setUpdate(!update);
  };
  const handleHeadshotChange = () => {
    setUpdate(!update);
  };

  const musicianList = props.musicians.map((musician) => (
    <Musician
      key={musician.id}
      id={musician.id}
      name={musician.name}
      bio={musician.bio}
      headshot_id={musician.headshot_id}
      type="musician"
      onBioChange={handleBioChange}
      onHeadshotChange={handleHeadshotChange}
    />
  ));

  return (
    <>
      <Col id="musicians">
        <Container>
          <h3 className="display-3 text-end musicians-title">
            Meet the Musicians
          </h3>
        </Container>
        {musicianList}
      </Col>
    </>
  );
}

export default Musicians;
