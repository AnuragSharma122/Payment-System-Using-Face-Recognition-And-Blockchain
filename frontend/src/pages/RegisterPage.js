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
import axios from "axios";
import Webcam from "react-webcam";
// core components
import {RegisterPopUp} from "../components/RegisterPopUp";
import ExamplesNavbar from "../components/Navbars/ExamplesNavbar.js";
import Footer from "../components/Footer/Footer.js";

export function RegisterPage(props) {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [fullNameFocus, setFullNameFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    image: null,
    phone: "",
    gender: "",
    email: "",
    wallet: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef(null);
  //handle submit function
  const handleSubmit = (event) => {
    // console.log(formData);
    event.preventDefault();
    axios
      .post("http://127.0.0.1:3002/users/api/register", formData)
      .then((res) => {
        setMessage(res.data);
        console.log(res.data);
        setFormData({});
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(formData);
  };
  //handle input functions
  const handleInputs = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onCapture = useCallback(
    (e) => {
      e.preventDefault();
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        setFormData((formData) => ({ ...formData, image: imageSrc }));
        setShowCamera(false);
      } else {
        console.log("No webcam");
      }
      // hide camera overlay after capturing the image
    },
    [webcamRef, setFormData]
  );

  const handleImageUpload = () => {
    setShowCamera(true);
  };
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
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)"
    );
    setSquares7and8(
      "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    );
  };

  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper" style={{ height: 50 }}>
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
                  <Card className="card-register">
                    <CardHeader>
                      <CardImg
                        alt="..."
                        src={require("../assets/img/square-purple-1.png")}
                      />
                      <CardTitle tag="h4">Register</CardTitle>
                    </CardHeader>
                    {submitting && (
                      <CardTitle tag="h7">Submtting Form...</CardTitle>
                    )}
                    <CardBody>
                      <Form
                        className="form"
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                      >
                        <InputGroup
                          className={classnames({
                            "input-group-focus": fullNameFocus,
                          })}
                        >
                          {/* <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon> */}
                          <Input
                            placeholder="First Name"
                            type="text"
                            name="firstname"
                            onChange={handleInputs}
                            onFocus={(e) => setFullNameFocus(true)}
                            onBlur={(e) => setFullNameFocus(false)}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": fullNameFocus,
                          })}
                        >
                          {/* <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon> */}
                          <Input
                            placeholder="Last Name"
                            type="text"
                            name="lastname"
                            onChange={handleInputs}
                            onFocus={(e) => setFullNameFocus(true)}
                            onBlur={(e) => setFullNameFocus(false)}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": fullNameFocus,
                          })}
                        >
                          {/* <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon> */}
                          <Input
                            placeholder="Phone"
                            type="number"
                            name="phone"
                            onChange={handleInputs}
                            onFocus={(e) => setFullNameFocus(true)}
                            onBlur={(e) => setFullNameFocus(false)}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": fullNameFocus,
                          })}
                        >
                          {/* <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon> */}
                          <Input
                            placeholder="Email"
                            type="email"
                            name="email"
                            onChange={handleInputs}
                            onFocus={(e) => setFullNameFocus(true)}
                            onBlur={(e) => setFullNameFocus(false)}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": fullNameFocus,
                          })}
                        >
                          {/* <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon> */}
                          <Input
                            placeholder="Gender"
                            type="text"
                            name="gender"
                            onChange={handleInputs}
                            onFocus={(e) => setFullNameFocus(true)}
                            onBlur={(e) => setFullNameFocus(false)}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": fullNameFocus,
                          })}
                        >
                          {/* <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon> */}
                          <Input
                            placeholder="Wallet Address"
                            type="text"
                            name="wallet"
                            onChange={handleInputs}
                            onFocus={(e) => setFullNameFocus(true)}
                            onBlur={(e) => setFullNameFocus(false)}
                          />
                        </InputGroup>
                        <InputGroup>
                          <Button
                            // type="submit"
                            onClick={handleImageUpload}
                            className="btn"
                            color="primary"
                            size="sm"
                          >
                            Scan Face
                          </Button>
                        </InputGroup>
                        <RegisterPopUp
                          trigger={showCamera}
                          onCapture={onCapture}
                        >
                          <Card className="card-register">
                            <Webcam
                              audio={false}
                              ref={webcamRef}
                              screenshotFormat="image/jpeg"
                              style={{ width: "100%", height: "100%" }}
                            />
                          </Card>
                          {/* <button name="image" onClick={onCapture}>
                            Click Image
                          </button> */}
                        </RegisterPopUp>
                        {/* <CardFooter> */}
                        <Button
                          type="submit"
                          className="btn-round"
                          color="primary"
                          size="lg"
                        >
                          Register
                        </Button>
                        {/* </CardFooter> */}
                      </Form>
                      <h3>{message}</h3>
                      {submitting && <div>Submtting Form...</div>}
                    </CardBody>
                  </Card>
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
