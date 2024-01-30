import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.css";
import { useState, useEffect } from "react";
import AuthDropdown from "./AuthDropdown";
import { Image, NavDropdown } from "react-bootstrap";
import { MusicianProps } from "../Musicians/Musician/Musician";

interface NavBarProps {
  musicians: MusicianProps[];
}

function NavBar(props: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);

  const MusicianLinks = props.musicians.map((musician) => (
    <NavDropdown.Item
      className="navbar-text-color"
      href={"#" + musician.name.split(" ").join("-").toLowerCase()}
      key={musician.id}
    >
      {musician.name}
    </NavDropdown.Item>
  ));

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(!scrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <Navbar
      className={`navbar-color ${scrolled ? "navbar-scrolled" : ""}`}
      expand="lg"
      sticky="top"
    >
      <Container>
        <Navbar.Brand href="#root" className="navbar-text-color">
          <Image src="/favicon.ico" alt="TGD Logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link href="#home" className="navbar-text-color">
              About
            </Nav.Link>
            <NavDropdown title="Musicians" className="">
              <NavDropdown.Item href="#musicians" className="navbar-text-color">
                All
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {MusicianLinks}
            </NavDropdown>
            <Nav.Link href="#contact" className="navbar-text-color">
              Contact
            </Nav.Link>
            <AuthDropdown />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
