import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
import { Container, Row, Col } from "react-bootstrap";
import { Nav } from "react-bootstrap";

interface FooterProps {
  apiVersion: string;
  appVersion: string;
}

const copyright = (
  <p className="text-center">&copy; 2024 The Grapefruits Duo</p>
);

function Footer(props: FooterProps) {
  const { apiVersion, appVersion } = props;
  const versionInfo = (
    <p className="text-center">
      API Version: {apiVersion} | App Version: {appVersion}
    </p>
  );

  return (
    <footer className="footer py-3">
      <Container>
        <Row>
          <Col className="text-center">
            <Nav className="justify-content-center">
              <Nav.Link
                href="https://www.instagram.com/thegrapefruitsduo/"
                className="m-2"
                target="_blank"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </Nav.Link>
              <Nav.Link
                href="https://www.facebook.com/thegrapefruitsduo"
                className="m-2"
                target="_blank"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </Nav.Link>
              <Nav.Link
                href="https://www.youtube.com/channel/UCzc-ds_awbx3RpGmLWEetKw"
                className="m-2"
                target="_blank"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">{copyright}</Col>
        </Row>
        <Row>
          <Col className="text-center">{versionInfo}</Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
