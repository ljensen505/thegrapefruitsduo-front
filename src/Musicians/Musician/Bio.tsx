import { useAuth0 } from "@auth0/auth0-react";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Col, Card } from "react-bootstrap";
import EditBioForm from "../../Forms/BioForm";
import EditModal from "../../EditModals/EditModal";
import { MusicianProps } from "./Musician";

interface BioProps {
  musician: MusicianProps;
  textPosition: string;
  onBioChange?: () => void;
}

function Bio(props: BioProps) {
  const { isAuthenticated } = useAuth0();
  const [modalShow, setModalShow] = useState(false);
  const EditTitle = `Edit ${props.musician.name}'s Bio`;

  const EditIcon = (
    <div>
      <FontAwesomeIcon
        icon={faPen}
        className="position-absolute edit-icon"
        onClick={() => setModalShow(true)}
      />
      <EditModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        currentvalue={props.musician.bio}
        title={EditTitle}
        entity={props.musician}
        form={
          <EditBioForm
            entity={props.musician}
            hideModal={setModalShow}
            onBioChange={props?.onBioChange}
          />
        }
      />
    </div>
  );

  return (
    <Col md={6} key="bioCard">
      <Card className={`${props.textPosition}`}>
        <Card.Header className="display-6">{props.musician.name}</Card.Header>
        <Card.Body>
          <Card.Text>{props.musician.bio}</Card.Text>
        </Card.Body>
        {isAuthenticated && EditIcon}
      </Card>
    </Col>
  );
}

export default Bio;
