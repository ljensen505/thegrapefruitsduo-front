import BGStyleFinal from "./BackgroundStyle";
import "./App.css";
import Musicians from "./Musicians/Musicians";
import NavBar from "./NavBar/NavBar";
import ContactForm from "./Forms/Contact/ContactForm";
import { Container } from "react-bootstrap";
import Group, { GroupProps } from "./Group/Group";
import { useState, useEffect } from "react";
import Footer from "./Footer/Footer";
import { getGroup, getUsers, getRoot, getMusicians } from "./api";
import { MusicianProps } from "./Musicians/Musician/Musician";
import { useAuth0 } from "@auth0/auth0-react";

interface User {
  id: number;
  name: string;
  email: string;
  auth0_id: string;
}

function App() {
  const [group, setGroup] = useState<GroupProps>();
  const [update, setUpdate] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [apiVersion, setApiVersion] = useState<string>("");
  const [musicians, setMusicians] = useState<MusicianProps[]>([]);
  const { user, isAuthenticated, logout } = useAuth0();
  const appVersion = import.meta.env.PACKAGE_VERSION;

  const handleGroupBioChange = () => {
    setUpdate(!update);
  };

  useEffect(() => {
    getMusicians()
      .then((response) => {
        setMusicians(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [update]);

  useEffect(() => {
    getRoot()
      .then((response) => {
        setApiVersion(response.data.version);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getGroup()
      .then((response) => {
        setGroup(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [update]);

  useEffect(() => {
    getUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isAuthenticated && user) {
    const userSub = user.sub;
    const adminIDs = users.map((admin) => admin.auth0_id);
    if (!userSub || !adminIDs.includes(userSub)) {
      logout({ logoutParams: { returnTo: window.location.origin } });
      return;
    }
  }

  return (
    <div id="home" style={BGStyleFinal}>
      <NavBar musicians={musicians} />
      <Container id="content" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Container style={{ marginBottom: "400px" }}>
          <Group
            id={group?.id || 0}
            name={group?.name || ""}
            bio={group?.bio || ""}
            type={group?.type || "group"}
            onBioChange={handleGroupBioChange}
          />
        </Container>
        <Musicians musicians={musicians} />
        <ContactForm />
      </Container>
      <Footer apiVersion={apiVersion} appVersion={appVersion} />
    </div>
  );
}

export default App;
