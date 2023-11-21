import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Headroom from "headroom.js";
import {
  Button,
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

const NavbarClientProfile = ({ sesion }) => {
  const history = useNavigate();
  const [state, setState] = useState({
    collapseClasses: "",
    collapseOpen: false,
  });
  const { info } = sesion;

  useEffect(() => {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialize
    headroom.init();

    return () => {
      console.log("Desmontar");
    };
  }, []);

  const onExiting = () => {
    setState((prev) => {
      return { ...prev, collapseClasses: "collapsing-out" };
    });
  };

  const onExited = () => {
    setState((prev) => {
      return { ...prev, collapseClasses: "" };
    });
  };

  const isSesion = useMemo(() => {
    return Object.keys(info).length > 0;
  }, [info]);

  return (
    <>
      <header className="header-global">
        <Navbar
          className="navbar-main navbar-transparent navbar-light headroom"
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
              <h2 className="text-white">Singular Chef</h2>
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar_global">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse
              toggler="#navbar_global"
              navbar
              className={state.collapseClasses}
              onExiting={onExiting}
              onExited={onExited}
            >
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img
                        alt="..."
                        src={require("assets/img/brand/argon-react.png")}
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button className="navbar-toggler" id="navbar_global">
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>

              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                {isSesion && (
                  <NavItem className="d-none d-lg-block ml-lg-4">
                    <i className="fa fa-user-circle text-light"></i>
                    <b className="text-light ml-1">
                      {sesion?.info?.name ?? ""}
                    </b>
                  </NavItem>
                )}
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default NavbarClientProfile;
