import React, { useState, useCallback, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";

export const Payment = (props) => {
  const [showCamera, setShowCamera] = useState(false);
  const [paymentData, setPaymentData] = useState({
    amount: 0,
    image: null,
    paid: false,
  });
//   const [paymentError, setPaymentError] = useState(false);
//   const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const webcamRef = useRef(null);
  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPaymentData({
      ...paymentData,
      image: imageSrc,
    });
  }, [paymentData, setPaymentData]);

  const handleChange = (e) => {};

  const handlePayment = async (e) => {
    e.preventDefault();
    setShowProcessing(true);
    // Perform payment processing
    console.log("Payment processed:", paymentData);
    
    try {
      const response = await axios.post(
        "http://127.0.0.1:3002/users/api/matchUser",
        paymentData
      );
      if (response.data.successfull) {
        setPaymentSuccessful(true);
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
    setPaymentSuccessful(false);
    setShowProcessing(false);
    setErrorMessage(null);
  };

  if (paymentSuccessful) {
    return (
      <div>
        <h1>Payment successful!</h1>
        <button onClick={handleReset}>Make another payment</button>
      </div>
    );
  }else if (errorMessage) {
    return (
      <div>
        <h1>Error! Face didn't Match. Please try again</h1>
        <button onClick={handleReset}>Try again</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Payment with Face Scan</h1>
        <>
          {showCamera ? (
            <div>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
              />
              <button onClick={handleCapture}>Capture</button>
            </div>
          ) : (
            <button onClick={() => setShowCamera(true)}>Scan Face</button>
          )}

          {paymentData.image && <img src={paymentData.image} alt="Face" />}
          <div>
            <label>Amount:</label>
            <input
              type="number"
              value={paymentData.amount}
              onChange={(e) =>
                setPaymentData({
                  ...paymentData,
                  amount: e.target.value,
                })
              }
            />
          </div>
          {showProcessing ? (
            <p>Processing Payment...</p>
          ) : (
            <button onClick={handlePayment}>Make Payment</button>
          )}
        </>
      </div>
    );
  }
};

//   return (
//     <div>
//       <h1>Payment Page</h1>
//       {!paymentData.paid && (
//         <>
//           {showCamera ? (
//             <div>
//               <Webcam
//                 audio={false}
//                 ref={webcamRef}
//                 screenshotFormat="image/jpeg"
//               />
//               <button onClick={handleCapture}>Capture</button>
//             </div>
//           ) : (
//             <button onClick={() => setShowCamera(true)}>Scan Face</button>
//           )}
//           {paymentData.image && <img src={paymentData.image} alt="Face" />}
//           <div>
//             <label>Amount:</label>
//             <input
//               type="number"
//               value={paymentData.amount}
//               onChange={(e) =>
//                 setPaymentData({
//                   ...paymentData,
//                   amount: e.target.value,
//                 })
//               }
//             />
//           </div>
//           {paymentProcessing ? (
//             <p>Processing Payment...</p>
//           ) : (
//             <button onClick={handlePayment}>Make Payment</button>
//           )}
//           {paymentError && (
//             <p>Payment processing failed. Face does not match.</p>
//           )}
//         </>
//       )}
//       {paymentData.paid && (
//         <>
//           <p>Payment Successful!</p>
//           <button onClick={handleReset}>Make Another Payment</button>
//         </>
//       )}
//     </div>
//   );
// };
