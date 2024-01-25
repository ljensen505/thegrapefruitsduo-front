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
    <NavDropdown.Item href={`#musician-${musician.id}`} key={musician.id}>
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
            <Nav.Link href="#about" className="navbar-text-color">
              About
            </Nav.Link>
            <NavDropdown title="Musicians" className="">
              {MusicianLinks}
            </NavDropdown>
            <AuthDropdown />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
