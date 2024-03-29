import { Button, Container, Form } from "react-bootstrap";
import { MusicianProps } from "../Musicians/Musician/Musician";
import { GroupProps } from "../Group/Group";
import { patchMusician, patchGroup } from "../api";
import { useState } from "react";
import { useAuth } from "../Auth/AuthContext";

interface EditBioFormProps {
  entity: MusicianProps | GroupProps;
  hideModal: React.Dispatch<React.SetStateAction<boolean>>;
  onBioChange: () => void;
}

function EditBioForm(props: EditBioFormProps) {
  const [bio, setBio] = useState<string>(props.entity.bio);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const { userToken } = useAuth();

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
    setCanSubmit(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (props.entity.type === "musician") {
      updateMusician(userToken, props.entity);
    }

    if (props.entity.type === "group") {
      updateGroup(userToken, props.entity);
    }

    props.hideModal(false);
  };

  const updateMusician = async (accessToken: string, data: MusicianProps) => {
    patchMusician(data.id, bio, data.name, data.headshot_id, accessToken)
      .then(() => {
        props.onBioChange();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateGroup = async (
    accessToken: string,
    data: GroupProps | MusicianProps
  ) => {
    patchGroup(data.id, bio, data.name, accessToken)
      .then(() => {
        if (props.onBioChange) {
          props.onBioChange();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SubmitButton = canSubmit ? (
    <Button variant="primary" type="submit">
      Submit
    </Button>
  ) : (
    <Button variant="primary" type="submit" disabled>
      Submit
    </Button>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBio">
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          required
          value={bio}
          autoFocus
          onChange={handleBioChange}
        />
        <Form.Text className="text-muted">
          entity id: {props.entity.id}
        </Form.Text>
      </Form.Group>
      <Container className="d-flex justify-content-end">
        {SubmitButton}
      </Container>
    </Form>
  );
}

export default EditBioForm;
