import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container onClick={() => loginWithRedirect()}>
      <FontAwesomeIcon icon={faRightToBracket} /> Login
    </Container>
  );
};

export default LoginButton;
