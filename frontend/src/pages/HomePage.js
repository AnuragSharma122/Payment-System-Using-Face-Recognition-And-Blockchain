import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useState, useCallback, useRef } from "react";
// core components
import ExamplesNavbar from "../components/Navbars/ExamplesNavbar.js";
import Footer from "../components/Footer/Footer.js";

export function HomePage() {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, []);
  const followCursor = (event) => {
    // let posX = event.clientX - window.innerWidth / 2;
    // let posY = event.clientY - window.innerWidth / 6;
    // setSquares1to6(
    //   "perspective(500px) rotateY(" +
    //     posX * 0.05 +
    //     "deg) rotateX(" +
    //     posY * -0.05 +
    //     "deg)"
    // );
    // setSquares7and8(
    //   "perspective(500px) rotateY(" +
    //     posX * 0.02 +
    //     "deg) rotateX(" +
    //     posY * -0.02 +
    //     "deg)"
    // );
  };

  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <div className="page-header">
          <div className="page-header-image" />
          <div className="content">
            <Container>
              <Row>
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                  <div
                    className="square square-7"
                    id="square7"
                    style={{ transform: squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: squares7and8 }}
                  />
                  <Container>
                    <div style={{}}>
                      <h3>
                        This is Blockchain based payment system using face
                        recognition.
                      </h3>
                      <h4>Supervised by: Dr. Ashok Kehrodia</h4>
                      <h4>
                        <span>Anurag 2020kuec2015</span>
                        <br />
                        <span>Ritish 2020kuec2026</span>
                        <br />
                        <span>Aniket 2020kuec2030</span>
                      </h4>
                    </div>
                  </Container>
                </Col>
              </Row>
              <div className="register-bg" />
              <div
                className="square square-1"
                id="square1"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-2"
                id="square2"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-3"
                id="square3"
                style={{ transform: squares1to6 }}
              />

              <div
                className="square square-4"
                id="square4"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-5"
                id="square5"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-6"
                id="square6"
                style={{ transform: squares1to6 }}
              />
            </Container>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
