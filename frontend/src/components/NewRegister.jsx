import React from "react";
// import "./App.css";
import "./Register.css";
import { useState, useCallback, useRef } from "react";
import axios from "axios";
import Webcam from "react-webcam";

export const NewRegister= (props) => {
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
//   const [imageFile, setImageFile] = useState(null);
  const webcamRef = useRef(null);
  //handle submit function
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:3002/users/api/register", formData)
      .then((res) => {
        setMessage(res.data);
        console.log(res.data);
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
  return (
    <div className="Register">
      <h1>Register</h1>
      <h3>{message}</h3>
      {submitting && <div>Submtting Form...</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <fieldset>
          <label>
            <span>First Name </span>
            <input name="firstname" onChange={handleInputs} />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <span>Last Name </span>
            <input name="lastname" onChange={handleInputs} />
          </label>
        </fieldset>
        {showCamera ? (
          <div>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              style={{ width: "100vh", height: "100vh" }}
            />
            <button name="image" onClick={onCapture}>
              Click Image
            </button>
          </div>
        ) : (
          <fieldset>
            <label>
              <span>Image: </span>
              <button onClick={handleImageUpload}>Image Input</button>
            </label>
          </fieldset>
        )}

        <fieldset>
          <label>
            <span>Phone </span>
            <input name="phone" onChange={handleInputs} />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <span>Email </span>
            <input type="email" name="email" onChange={handleInputs} />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <span>Gender </span>
            <input name="gender" onChange={handleInputs} />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <span>Wallet Address </span>
            <input name="wallet" onChange={handleInputs} />
          </label>
        </fieldset>
        <button type="submit">Submit</button>
        {formData.image && <img src={formData.image} />}
      </form>
    </div>
  );
}