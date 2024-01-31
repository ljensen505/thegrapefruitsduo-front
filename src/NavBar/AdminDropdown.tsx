import { ButtonGroup } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Profile from "../Auth/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Auth/LogoutButton";
import LoginButton from "../Auth/LoginButton";

interface AdminDropdownProps {
  appVersion: string;
  apiVersion: string;
}

function AdminDropdown(props: AdminDropdownProps) {
  const { isAuthenticated } = useAuth0();
  const AuthButton = () => {
    return isAuthenticated ? <LogoutButton /> : <LoginButton />;
  };

  return (
    <>
      <DropdownButton
        as={ButtonGroup}
        align={{ lg: "end" }}
        title="Admin"
        id="admin-dropdown"
        variant="link"
        className="navbar-text-color"
      >
        {isAuthenticated && <Profile />}
        <Dropdown.Item eventKey="1" className="text-end">
          <AuthButton />
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="2" className="text-end">
          API: {props.apiVersion} | App: {props.appVersion}
        </Dropdown.Item>
      </DropdownButton>
    </>
  );
}

export default AdminDropdown;
