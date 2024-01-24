import { Form, Image, Button, Container } from "react-bootstrap";
import { MusicianProps } from "../Musicians/Musician/Musician";

interface HeadshotUploadProps {
  currentHeadshot: string;
  musician: MusicianProps;
}

function HeadshotUpload(props: HeadshotUploadProps) {
  return (
    <Form>
      <Form.Group controlId="formFile" className="mb-3">
        <Image
          src={props.currentHeadshot}
          className="img-fluid rounded-circle"
          alt={`${props.musician.name} headshot`}
        />
        <Form.Label>Upload Headshot</Form.Label>
        <Form.Control type="file" />
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
