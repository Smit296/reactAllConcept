import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import logo from "../../Image/logo.png";
import { Link } from "react-router-dom";
import Google from "../Google/login";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Action from "../../ActionCreater/user";

const { logout } = Action;

function NavBar(props) {
  const { Authenticated, logout, type } = props;
  return (
    <>
      <Navbar className="shadow pb-0 pt-0" expand="sm" bg="light" variant="light" sticky="top">
        <Link to="/">
          <Navbar.Brand href="#">
            <img className="mr-1" src={logo} width="35px" />
            Agricom
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/">
              <Nav.Link active className="text-secondary" href="/">Home</Nav.Link>
            </Link>
            <Link to="/bank">
              <Nav.Link active className="text-secondary" href="/bank">Banking</Nav.Link>
            </Link>
            <Link to="/blog">
              <Nav.Link className="text-secondary" active href="/blog">Blog</Nav.Link>
            </Link>
            <Nav.Link active className="text-secondary" href="#hom">About</Nav.Link>
            <Link to="/404">
              <Nav.Link active className="text-secondary" href="/404">404</Nav.Link>
            </Link>
          </Nav>
          <NavDropdown
            focusFirstItemOnShow={false}
            alignRight
            id="dropdown-no-caret"
            className="p-0"
            title={
              <img
                className="m-0 rounded-circle p-0 "
                width="35px"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQheGtOjDugQL_DtA6EDn5no8Hn5jnJNKJOdqoYwRXQJ6E24-fW&usqp=CAU"
                alt="user pic"
              />
            }
            id={`dropdown-button-drop`}
          >
            {!Authenticated ? (
              <>
                <NavDropdown.Item className="text-center">
                  <Link to="/login">
                    <Button variant="outline-success">Signin</Button>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item className="text-center">
                  <Link to="/signup">
                    <Button variant="outline-success">Signup</Button>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className="text-center">
                  <Google />
                </NavDropdown.Item>
              </>
            ) : (
                <>
                  <Link to='/profile'><NavDropdown.Item href='/profile' >Profile</NavDropdown.Item></Link>
                  {(type === "Consumer" || type === "Farmer") ?
                    <>
                      <Link to='/profile/purchased'><NavDropdown.Item href='/' >Ordered Product</NavDropdown.Item></Link>
                      <Link to='/cart'><NavDropdown.Item href='/'>Cart</NavDropdown.Item></Link> </> : ""}

                  {(type === "Seller" || type === "Farmer") ?
                    <>
                      <Link to='/profile/product'><NavDropdown.Item href='/' >Add Product</NavDropdown.Item></Link>
                      <Link to='/profile/sold'><NavDropdown.Item href='/'>Sold</NavDropdown.Item></Link> </> : ""}

                  {(type === "Farmer") ?
                    <>
                      <Link to='/sell_grain'><NavDropdown.Item href='/'>Sell Grain</NavDropdown.Item></Link> </> : ""}

                  <NavDropdown.Divider />
                  <Link to='/'><NavDropdown.Item href="/" onClick={() => logout()}>Logout</NavDropdown.Item></Link>
                </>
              )}


          </NavDropdown>
          <Form inline >
            <FormControl
              variant="outline-success"
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <Button className="mx-auto mt-1 mb-1" variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

const take = (state) => {
  const { Authenticated } = state.user;
  return {
    Authenticated, type: state.user.currentUser.type
  };
};

const change = (dispatch) => {
  return bindActionCreators({ logout }, dispatch);
};

export default connect(take, change)(NavBar);
