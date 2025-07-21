"use client";
import "./my_navbar.css";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { CiGlobe } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";

export default function MyNavbar() {
  return (
    <>
      <Navbar expand="lg" className="navbar">
        <Container>
          <Navbar.Brand href="#home">
            <img
              className="logo"
              src="/assets/logo_header.png"
              alt="logo iamge"
            />
            <p id="head">Aya Sir G!</p>
            <p id="descri">YOUR TRUSTED EVERYWHERE</p>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className="active">
                Home
              </Nav.Link>
              <Nav.Link href="#home">About Us</Nav.Link>
              <Nav.Link href="#home">Register Yourself</Nav.Link>
              {/* <Nav.Link href="#home">Blogs</Nav.Link>
              <Nav.Link href="#home">FAQ</Nav.Link>
              <Nav.Link href="#home">Contact Us</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
          <div className="d-flex align-items-center margin_right">
            <NavDropdown
              title={
                <span>
                  <CiGlobe className="web_globe_icon" /> EN
                  <IoIosArrowDown className="drop_arrow" />
                </span>
              }
              id="basic-nav-dropdown"
              className="language_div"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <div className="info_div d-flex align-items-center gap-2">
              <IoIosHeartEmpty className="icon_hearth ml_2" />
              <IoPersonCircle className="icon_person" />
              <div className="name_div">
                <p>Name</p>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  );
}
