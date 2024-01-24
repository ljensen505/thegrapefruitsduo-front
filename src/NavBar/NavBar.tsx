import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.css";
import { useState, useEffect } from "react";
import AuthDropdown from "./AuthDropdown";
import { Image } from "react-bootstrap";

function NavBar() {
  const [scrolled, setScrolled] = useState(false);

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
            <Nav.Link href="#musicians" className="navbar-text-color">
              Musicians
            </Nav.Link>
            <AuthDropdown />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
