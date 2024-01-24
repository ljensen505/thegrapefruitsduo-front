import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Container
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      <FontAwesomeIcon icon={faRightFromBracket} /> Logout
    </Container>
  );
};

export default LogoutButton;
