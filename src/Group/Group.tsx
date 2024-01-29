import { Container } from "react-bootstrap";
import "./Group.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import EditModal from "../EditModals/EditModal";
import { useState } from "react";
import EditBioForm from "../Forms/BioForm";

export interface GroupProps {
  id: number;
  name: string;
  bio: string;
  type: "group";
  onBioChange: () => void;
}

function Group(props: GroupProps) {
  const { isAuthenticated } = useAuth0();
  const [modalShow, setModalShow] = useState(false);
  const EditTitle = `Edit ${props.name}'s Bio`;

  const EditIcon = (
    <div>
      <FontAwesomeIcon
        icon={faPen}
        className="position-absolute edit-icon"
        onClick={() => {
          setModalShow(true);
        }}
      />
      <EditModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        currentvalue={props.bio}
        title={EditTitle}
        entity={props}
        form={
          <EditBioForm
            entity={props}
            hideModal={setModalShow}
            onBioChange={props.onBioChange}
          />
        }
      />
    </div>
  );

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center text-center">
      <div className="group-info" id="about">
        <h1 className="display-1">{props.name}</h1>
        <p className="lead group-bio">{props.bio}</p>
        {isAuthenticated && EditIcon}
      </div>
    </Container>
  );
}

export default Group;
