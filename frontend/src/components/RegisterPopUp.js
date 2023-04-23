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
          {props.children}
          <InputGroup>
            <Button
              className="click"
              color="primary"
              onClick={(e) => props.onCapture(e)}
            >
              Click me
            </Button>
          </InputGroup>
        </div>
      </div>
    ) : (
      ""
    );
}

