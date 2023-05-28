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
import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
// core components
import { RegisterPopUp } from "../components/RegisterPopUp";
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
    cardnumber: "",
    expiration: "",
    cvv: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [enteredOtpValue, setEnteredOtpValue] = useState("");
  const [faceScanned, setFaceScanned] = useState(false);
  const [startScan, setStartScan] = useState(false);
  const [blinksCount, setBlinksCount] = useState(0);
  const [headRotate, setHeadRotate] = useState(0);
  const webcamRef = useRef(null);

  const [isModelLoaded, setIsModelLoaded] = useState(false);
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        // faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(() => setIsModelLoaded(true));
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
    const video = webcamRef.current.video;
    const canvas = faceapi.createCanvasFromMedia(video);
    const displaySize = { width: video.videoHeight, height: video.videoWidth };
    faceapi.matchDimensions(canvas, displaySize);

    const detections = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();
    if (detections == null) {
      setShowCamera(false);
      setFaceScanned(false);
    } else {
      console.log(detections);
      setShowCamera(false);
      setFaceScanned(true);
      console.log("Form data updated");
      setFormData({ ...formData, image: detections.descriptor });
      console.log(detections);
      setStartScan(true);
    }
  };
  const handleReset = () => {
    setOtpSent(false);
    setOtpVerified(false);
    setOtpValue("");
    setEnteredOtpValue("");
    setFormData({});
  };
  //handle submit function
  const handleSubmit = (event) => {
    // console.log(formData);
    event.preventDefault();
    if (otpValue != enteredOtpValue) {
      setMessage("OTP not matched");
      alert("OTP NOT MATCHED");
      handleReset();
      return;
    }
    //Final step after otp is verfied
    axios
      .post("http://127.0.0.1:3002/users/api/register", formData)
      .then((res) => {
        setMessage(res.data);
        // console.log(res.data);
        handleReset();
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(formData);
  };
  const sendOtpToUser = (event) => {
    event.preventDefault();
    //generate an OTP of 4 number and send it to the number given in form
    //Generate OTP
    let otp = "";
    for (let i = 0; i < 4; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    setOtpValue(otp);
    // console.log(otp);
    axios
      .post("http://127.0.0.1:3002/users/api/send-otp", {
        otp: otp,
        phone: formData.phone,
      })
      .then((res) => {
        if (res.status == 200) {
          setOtpSent(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //handle input functions
  const handleInputs = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  const onCapture = useCallback(
    (e) => {
      e.preventDefault();
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        setFormData((formData) => ({ ...formData, image: imageSrc }));
        setShowCamera(false);
      } else {
        alert("No webcam");
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
                    <CardHeader style={{ height: "130px" }}>
                      <CardTitle
                        tag="h4"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "130px",
                        }}
                      >
                        <span style={{ color: "#DF4FC8" }}>Register</span>
                      </CardTitle>
                    </CardHeader>
                    {/* {submitting && (
                      <CardTitle tag="h7">Submtting Form...</CardTitle>
                    )} */}
                    <CardBody>
                      {!otpSent ? (
                        <>
                          <Form className="form" onSubmit={sendOtpToUser}>
                            <div className="form-row">
                              <FormGroup className="col-md-6">
                                <Label for="inputPassword4">First Name</Label>
                                <Input
                                  placeholder="First Name"
                                  type="text"
                                  name="firstname"
                                  onChange={handleInputs}
                                  onFocus={(e) => setFullNameFocus(true)}
                                  onBlur={(e) => setFullNameFocus(false)}
                                />
                              </FormGroup>
                              <FormGroup className="col-md-6">
                                <Label for="inputPassword4">Last Name</Label>
                                <Input
                                  placeholder="Last Name"
                                  type="text"
                                  name="lastname"
                                  onChange={handleInputs}
                                  onFocus={(e) => setFullNameFocus(true)}
                                  onBlur={(e) => setFullNameFocus(false)}
                                />
                              </FormGroup>
                            </div>
                            <div className="form-row">
                              <FormGroup className="col-md-6">
                                <Label for="inputPassword4">Phone</Label>
                                <Input
                                  placeholder="Phone"
                                  type="number"
                                  name="phone"
                                  onChange={handleInputs}
                                  onFocus={(e) => setFullNameFocus(true)}
                                  onBlur={(e) => setFullNameFocus(false)}
                                />
                              </FormGroup>
                              <FormGroup className="col-md-6">
                                <Label for="inputPassword4">Email</Label>
                                <Input
                                  placeholder="Email"
                                  type="email"
                                  name="email"
                                  onChange={handleInputs}
                                  onFocus={(e) => setFullNameFocus(true)}
                                  onBlur={(e) => setFullNameFocus(false)}
                                />
                              </FormGroup>
                            </div>
                            <div className="form-row">
                              <FormGroup className="col-md-6">
                                <Label for="inputPassword4">Gender</Label>
                                <Input
                                  placeholder="Gender"
                                  type="text"
                                  name="gender"
                                  onChange={handleInputs}
                                  onFocus={(e) => setFullNameFocus(true)}
                                  onBlur={(e) => setFullNameFocus(false)}
                                />
                              </FormGroup>
                              <FormGroup className="col-md-6">
                                <Label for="inputPassword4">PAN Number</Label>
                                <Input
                                  placeholder="PAN Number"
                                  type="text"
                                  name="wallet"
                                  onChange={handleInputs}
                                  onFocus={(e) => setFullNameFocus(true)}
                                  onBlur={(e) => setFullNameFocus(false)}
                                />
                              </FormGroup>
                            </div>
                            <div className="form-row">
                              <FormGroup className="col-md-6">
                                <Label for="inputEmail4">Card Number</Label>
                                <Input
                                  type="number"
                                  id="inputEmail4"
                                  placeholder="Card Number"
                                  name="cardnumber"
                                  onChange={handleInputs}
                                />
                              </FormGroup>
                              <FormGroup className="col-md-6">
                                <Label for="inputPassword4">
                                  Expiration date
                                </Label>
                                <Input
                                  type="text"
                                  id="inputPassword4"
                                  placeholder="Expiration Date"
                                  name="expiration"
                                  onChange={handleInputs}
                                />
                              </FormGroup>
                            </div>
                            <div className="form-row">
                              <FormGroup className="col-md-6">
                                <Label for="inputPassword4">CVV</Label>
                                <Input
                                  type="number"
                                  id="inputPassword4"
                                  placeholder="CVV"
                                  name="cvv"
                                  onChange={handleInputs}
                                />
                              </FormGroup>
                              <FormGroup className="col-md-5">
                                <Label for="inputPassword4">
                                  Press to scan face
                                </Label>
                                <Button
                                  type="button"
                                  onClick={handleImageUpload}
                                  className="btn"
                                  color="primary"
                                  size="sm"
                                >
                                  Scan Face
                                </Button>
                                {faceScanned && <>Scanned</>}
                              </FormGroup>
                            </div>
                            <RegisterPopUp
                              trigger={showCamera}
                              onCapture={captureFace}
                              closeTrigger={setShowCamera}
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
                          </Form>
                        </>
                      ) : (
                        <>
                          <Form className="form" onSubmit={handleSubmit}>
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
                      {/* </CardFooter> */}

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
