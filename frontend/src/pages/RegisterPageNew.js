import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import axios from "axios";
// import { canvas } from "face-api.js";

export function RegisterPageNew(props) {
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
    // const detections = await faceapi
    //   .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
    //   .withFaceLandmarks()
    //   .withFaceExpressions();
    const detections = await faceapi
      .detectSingleFace(video)
      .withFaceLandmarks()
      .withFaceDescriptor();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    // const detections = await faceapi
    //   .detectAllFaces(video)
    //   .withFaceLandmarks()
    //   .withFaceExpressions();
    // const resizedDetections = faceapi.resizeResults(detections, displaySize);
    // faceapi.draw.drawDetections(canvas, resizedDetections);
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    const faceData = {
      detections: detections,
      //   image: canvas.toDataURL("image/jpeg", 0.8),
    };
    console.log(faceData);
    // Send the face data to the backend
    // sendFaceDataToBackend(faceData);
  };

  const sendFaceDataToBackend = async (data) => {
    try {
      const response = await axios.post("/api/face-detection", data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Hello World</h1>
      <Webcam ref={webcamRef} />
      <button onClick={captureFace}>Capture Face</button>
    </div>
  );
}
