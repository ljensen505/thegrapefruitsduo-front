import { Form, Image, Button, Container } from "react-bootstrap";
import { MusicianProps } from "../Musicians/Musician/Musician";
import { useState } from "react";
import { postHeadshot } from "../api";
import { useAuth0 } from "@auth0/auth0-react";

interface HeadshotUploadProps {
  currentHeadshot: string;
  musician: MusicianProps;
  onHeadshotChange?: () => void;
  hideModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

function HeadshotUpload(props: HeadshotUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(props.currentHeadshot);
  const { getAccessTokenWithPopup, getAccessTokenSilently } = useAuth0();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
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
      console.error("no access token");
      return;
    }
    event.preventDefault();

    if (props.musician && selectedFile) {
      uploadHeadshot(accessToken, props.musician, selectedFile);
      props.hideModal?.(false);

      return;
    }
    console.error("no file selected");
  };

  const uploadHeadshot = async (
    accessToken: string,
    musician: MusicianProps,
    file: File
  ) => {
    postHeadshot(musician.id, file, accessToken)
      .then(() => {
        props.onHeadshotChange?.();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFile" className="mb-3">
        <Image
          src={preview}
          className="img-fluid rounded-circle"
          alt={`${props.musician.name} headshot`}
        />
        <Form.Label>Upload Headshot</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
        <Form.Text className="text-muted">
          entity id: {props.musician.id}
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

export default HeadshotUpload;
