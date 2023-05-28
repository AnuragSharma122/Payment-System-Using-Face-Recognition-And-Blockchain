import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {useNavigate } from "react-router-dom";
import * as faceapi from "face-api.js";
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
import axios from "axios";
import Webcam from "react-webcam";
import ExamplesNavbar from "../components/Navbars/ExamplesNavbar.js";
import Footer from "../components/Footer/Footer.js";
// core components
import { RegisterPopUp } from "../components/RegisterPopUp";

export function PaymentsPage() {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [fullNameFocus, setFullNameFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [paymentData, setPaymentData] = useState({
    amount: 0,
    image: null,
    paid: false,
  });
  const [showProcessing, setShowProcessing] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [enteredOtpValue, setEnteredOtpValue] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const webcamRef = useRef(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [startScan, setStartScan] = useState(false);
  const [paymentID, setPaymentID] = useState("req_RyuNuYipV7smHH");
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    cardnumber: "",
    expiration: "",
    cvv: "",
    amount: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setIsModelLoaded(true));
    };
    loadModels();
  }, []);

  const captureFace = async () => {
    if (!isModelLoaded || !webcamRef.current) {
      if (!isModelLoaded) {
        alert("Models not loaded!");
      } else {
        alert("Webcam error!");
      }
      return;
    }
    // asdfasdfadsf
    const video = webcamRef.current.video;
    const canvas = faceapi.createCanvasFromMedia(video);
    const displaySize = { width: video.videoHeight, height: video.videoWidth };
    faceapi.matchDimensions(canvas, displaySize);
    const detections = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();
    console.log(detections.descriptor);

    setPaymentData({
      ...paymentData,
      image: detections.descriptor,
    });
    setShowCamera(false);
  };
  //handle submit function
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    if (enteredOtpValue == otpValue) {
      //make payment
      // setPaymentSuccessful(true);
      setOtpVerified(true);
    } else {
      setErrorMessage("OTP verification failed");
    }
  };
  const handlePayment = async (e) => {
    e.preventDefault();
    setShowProcessing(true);
    // Perform payment processing
    // console.log("Payment processed:", paymentData);
    try {
      const response = await axios.post(
        "http://127.0.0.1:3002/users/api/matchUser",
        paymentData
      );
      // console.log(response.data);
      if (response.data.otpSent) {
        setOtpSent(response.data.otpSent);
        setOtpValue(response.data.otp);
        setUserData({
          ...userData,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.email,
          phone: response.data.phone,
          cardnumber: response.data.cardnumber,
          expiration: response.data.expiration,
          cvv: response.data.cvv,
        });
      } else {
        setErrorMessage("Face does not match. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        "An error occurred while processing payment. Please try again later."
      );
    } finally {
      setShowProcessing(false);
    }
  };
  const handleReset = () => {
    setPaymentData({
      ...paymentData,
      image: null,
      paid: false,
    });
    setOtpSent(false);
    setOtpVerified(false);
    setOtpValue("");
    setEnteredOtpValue("");
    setPaymentSuccessful(false);
    setShowProcessing(false);
    setErrorMessage(null);
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
  

  const navigateToContacts = () => {
    // navigate(`/https://dashboard.stripe.com/test/logs/${paymentID}`);
    window.open(
      `https://dashboard.stripe.com/test/logs/${paymentID}`,
      "_blank",
      "noreferrer"
    );
  };

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
  const startPayment = async (e) => {
    e.preventDefault();
    setShowProcessing(true);
    // Perform payment processing
    // console.log("Payment processed:", paymentData);
    try {
      console.log(userData);
      const response = await axios.post(
        "http://127.0.0.1:3002/users/api/payment",
        userData
      );
      console.log(response.data);
      if (response.data.issuccesful == true) {
        setPaymentSuccessful(true);
        setPaymentID(response.data.payment_id);
      } else {
        setErrorMessage("Error occured during payment");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(
        "An error occurred while processing payment. Please try again later."
      );
    } finally {
      setShowProcessing(false);
    }
  }
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
                  <Card
                    className="card-register"
                    style={{
                      display: "flex",
                    }}
                  >
                    <CardHeader style={{ height: "130px" }}>
                      {/* <CardImg
                        alt="..."
                        src={require("../assets/img/square-purple-1.png")}
                      /> */}
                      <CardTitle
                        tag="h2"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "130px",
                        }}
                      >
                        {/* Pay */}
                        <span style={{ color: "#DF4FC8" }}>Pay</span>
                      </CardTitle>
                    </CardHeader>
                    <CardBody
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {paymentSuccessful ? (
                        <div>
                          <h1>Payment successful!</h1>
                          <Button
                            onClick={handleReset}
                            className="btn"
                            color="primary"
                            size="sm"
                          >
                            Make another payment
                          </Button>
                          {paymentID && (
                            <Button
                              onClick={navigateToContacts}
                              className="btn"
                              color="primary"
                              size="sm"
                            >
                              Check payment details
                            </Button>
                          )}
                        </div>
                      ) : errorMessage ? (
                        <div>
                          <h1>{errorMessage}</h1>
                          <Button
                            onClick={handleReset}
                            className="btn"
                            color="primary"
                            size="sm"
                          >
                            Try again
                          </Button>
                        </div>
                      ) : otpVerified ? (
                        <div>
                          <Form className="form" onSubmit={startPayment}>
                            <div className="form-row">
                              <FormGroup className="col-md-6">
                                <Label for="inputEmail4">First Name</Label>
                                <Input
                                  type="text"
                                  id="inputEmail4"
                                  placeholder={userData.firstname}
                                  disabled="on"
                                />
                              </FormGroup>
                              <FormGroup className="col-md-6">
                                <Label for="inputPassword4">Last Name</Label>
                                <Input
                                  type="text"
                                  id="inputPassword4"
                                  placeholder={userData.lastname}
                                  disabled="on"
                                />
                              </FormGroup>
                            </div>
                            <div className="form-row">
                              <FormGroup className="col-md-6">
                                <Label for="inputEmail4">Email</Label>
                                <Input
                                  type="email"
                                  id="inputEmail4"
                                  placeholder={userData.email}
                                  disabled="on"
                                />
                              </FormGroup>
                              <FormGroup className="col-md-6">
                                <Label for="inputPassword4">Phone</Label>
                                <Input
                                  type="phone"
                                  id="inputPassword4"
                                  placeholder={userData.phone}
                                  disabled="on"
                                />
                              </FormGroup>
                            </div>
                            <div className="form-row">
                              <FormGroup className="col-md-6">
                                <Label for="inputEmail4">Card Number</Label>
                                <Input
                                  type="number"
                                  id="inputEmail4"
                                  placeholder={userData.cardnumber}
                                  disabled="on"
                                />
                              </FormGroup>
                              <FormGroup className="col-md-6">
                                <Label for="inputPassword4">
                                  Expiration date
                                </Label>
                                <Input
                                  type="text"
                                  id="inputPassword4"
                                  placeholder={userData.expiration}
                                  disabled="on"
                                />
                              </FormGroup>
                            </div>
                            <div className="form-row">
                              <FormGroup className="col-md-3">
                                <Label for="inputPassword4">CVV</Label>
                                <Input
                                  type="number"
                                  id="inputPassword4"
                                  placeholder={userData.cvv}
                                  disabled="on"
                                />
                              </FormGroup>
                              <FormGroup className="col-md-9">
                                <Label for="inputPassword4">
                                  Enter Amount (in RS)
                                </Label>
                                <Input
                                  type="number"
                                  id="inputPassword4"
                                  placeholder="7000 RS"
                                  onChange={(e) =>
                                    setUserData({
                                      ...userData,
                                      amount: e.target.value,
                                    })
                                  }
                                />
                              </FormGroup>
                            </div>
                            <Button
                              type="submit"
                              className="btn"
                              color="primary"
                              size="sm"
                            >
                              Pay
                            </Button>
                          </Form>
                        </div>
                      ) : (
                        <div>
                          {!otpSent ? (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <InputGroup
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Button
                                  // type="submit"
                                  onClick={() => setShowCamera(true)}
                                  className="btn"
                                  color="primary"
                                  size="sm"
                                >
                                  Scan Face
                                </Button>
                              </InputGroup>
                              <RegisterPopUp
                                trigger={showCamera}
                                closeTrigger={setShowCamera}
                                onCapture={captureFace}
                                startScan={startScan}
                              >
                                <Card className="card-register">
                                  <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    style={{ width: "100%", height: "100%" }}
                                  />
                                </Card>
                              </RegisterPopUp>
                              {showProcessing ? (
                                <p>Processing Payment...</p>
                              ) : (
                                <Button
                                  type="submit"
                                  onClick={handlePayment}
                                  className="btn-round"
                                  color="primary"
                                  size="lg"
                                >
                                  Start Payment
                                </Button>
                              )}
                            </div>
                          ) : (
                            <>
                              <Form className="form" onSubmit={handleOtpVerify}>
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
                                    placeholder="OTP"
                                    type="number"
                                    name="otp"
                                    onChange={(e) =>
                                      setEnteredOtpValue(e.target.value)
                                    }
                                    onFocus={(e) => setFullNameFocus(true)}
                                    onBlur={(e) => setFullNameFocus(false)}
                                  />
                                </InputGroup>
                                <Button
                                  type="submit"
                                  className="btn-round"
                                  color="primary"
                                  size="lg"
                                >
                                  OTP Verify
                                </Button>
                              </Form>
                            </>
                          )}
                        </div>
                      )}
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
