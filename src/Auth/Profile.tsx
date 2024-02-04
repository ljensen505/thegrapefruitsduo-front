import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "react-bootstrap";
import { useAuth } from "./AuthContext";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { userToken } = useAuth();
  console.log(userToken);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <Container className="text-end">
        <img src={user?.picture} alt={user?.name} />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </Container>
    )
  );
};

export default Profile;
