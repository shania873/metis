import React, { useContext, useDebugValue } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

const Menu = () => {
  return (
    <>
      <Navbar
        collapseOnSelect
        style={{ backgroundColor: "#91bd10" }}
        expand="xxl"
        className="mb-3 menu-metis"
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand href="#">
            <span className="text-uppercase text-white">Métis</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {/* <Link to="/admin">Go to the Admin page</Link> */}
              <Nav.Link href="/patients">Patients</Nav.Link>
              <NavDropdown
                title="Appels"
                className="text-white"
                id={`offcanvasNavbarDropdown-expand-${"xl"}`}
              >
                <NavDropdown.Item href="#action3">Tous</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Utilisateurs
                </NavDropdown.Item>
                {/* <NavDropdown.Divider /> */}
                {/* <NavDropdown.Item href="#action5">
                  Another action
                </NavDropdown.Item> */}
              </NavDropdown>
              <NavDropdown
                title="Administration"
                className="text-white"
                id={`offcanvasNavbarDropdown-expand-${"xl"}`}
              >
                <NavDropdown.Item href="#action3">Tous</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Contact/Organisation
                </NavDropdown.Item>
                {/* <NavDropdown.Divider /> */}
                {/* <NavDropdown.Item href="#action5">
                  Another action
                </NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              {/* <Button variant="outline-success">Search</Button> */}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;