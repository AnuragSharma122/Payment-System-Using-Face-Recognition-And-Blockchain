import React from 'react'
import "./RegisterPopUp.css";
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
export function RegisterPopUp(props) {
    return props.trigger ? (
      <div className="popup">
        <div className="popup-inner">
          <div className="popup-inner-title">
            {props.startScan == true && (
              <h3>Face scan started. Please wait few moments!</h3>
            )}
          </div>
          <div className="popup-inner-webcam">{props.children}</div>
          <div className="popup-inner-buttons">
            <Button
              className="click"
              color="primary"
              onClick={(e) => props.onCapture(e)}
            >
              Start scan
            </Button>
            <Button
              className="click"
              color="primary"
              onClick={(e) => props.closeTrigger(false)}
            >
              Close
            </Button> 
          </div>
        </div>
      </div>
    ) : (
      ""
    );
}

