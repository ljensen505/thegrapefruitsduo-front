import { useAuth0 } from "@auth0/auth0-react";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container, Image } from "react-bootstrap";
import HeadshotUpload from "../../Forms/HeadshotUploadForm";
import EditModal from "../../EditModals/EditModal";
import { useState } from "react";
import { MusicianProps } from "./Musician";

export interface HeadshotProps {
  src: string;
  musician: MusicianProps;
  onHeadshotChange?: () => void;
}

function Headshot(props: HeadshotProps) {
  const { isAuthenticated } = useAuth0();
  const [modalShow, setModalShow] = useState(false);

  const EditIcon = (
    <Container>
      <FontAwesomeIcon
        icon={faUpload}
        className="position-absolute edit-icon"
        onClick={() => {
          setModalShow(true);
        }}
      />
      <EditModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Edit Headshot"
        currentvalue={props.src}
        entity={props.musician}
        form={
          <HeadshotUpload
            currentHeadshot={props.src}
            musician={props.musician}
            onHeadshotChange={props?.onHeadshotChange}
            hideModal={setModalShow}
          />
        }
      />
    </Container>
  );

  return (
    <Col
      key="headshot"
      className="d-flex align-items-center justify-content-center position-relative"
    >
      <Container className="d-flex align-items-center justify-content-center">
        <Image
          src={props.src}
          className="img-fluid rounded-circle"
          alt={props.musician.name}
        />
        {isAuthenticated && EditIcon}
      </Container>
    </Col>
  );
}

export default Headshot;
