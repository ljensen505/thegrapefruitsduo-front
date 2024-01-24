import { Button, Container, Form } from "react-bootstrap";
import { MusicianProps } from "../Musicians/Musician/Musician";
import { GroupProps } from "../Group/Group";
import { patchMusician, patchGroup } from "../api";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

interface EditBioFormProps {
  entity: MusicianProps | GroupProps;
  hideModal: React.Dispatch<React.SetStateAction<boolean>>;
  onBioChange?: () => void;
}

function EditBioForm(props: EditBioFormProps) {
  const [bio, setBio] = useState<string>(props.entity.bio);
  const { getAccessTokenWithPopup, getAccessTokenSilently } = useAuth0();

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
    let accessToken = await getAccessTokenSilently({
      authorizationParams: { audience: audience },
    }).catch(async (error) => {
      console.log(error);
      accessToken = await getAccessTokenWithPopup({
        authorizationParams: { audience: audience },
      });
    });

    if (!accessToken) {
      console.log("no access token");
      return;
    }
    if (props.entity.type === "musician") {
      updateMusician(accessToken, props.entity);
    }

    if (props.entity.type === "group") {
      updateGroup(accessToken, props.entity);
    }

    props.hideModal(false);
  };

  const updateMusician = async (accessToken: string, data: MusicianProps) => {
    patchMusician(data.id, bio, data.name, data.headshot_id, accessToken)
      .then(() => {
        if (props.onBioChange) {
          props.onBioChange();
        }
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

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBio">
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          required
          value={bio}
          onChange={handleBioChange}
        />
        <Form.Text className="text-muted">
          entity id: {props.entity.id}
        </Form.Text>
      </Form.Group>
      <Container className="d-flex justify-content-end">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Container>
    </Form>
  );
}

export default EditBioForm;
