import Modal from "react-bootstrap/Modal";
import { MusicianProps } from "../Musicians/Musician/Musician";
import { GroupProps } from "../Group/Group";

interface EditModalProps {
  title: string;
  show: boolean;
  currentvalue: string;
  onHide: () => void;
  form: JSX.Element;
  entity: MusicianProps | GroupProps;
}

function EditModal(props: EditModalProps) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.form}</Modal.Body>
    </Modal>
  );
}

export default EditModal;
