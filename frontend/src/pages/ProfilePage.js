import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Form,
  Input,
  FormText,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  UncontrolledCarousel,
} from "reactstrap";
import axios from "axios";

// core components
import ExamplesNavbar from "../components/Navbars/ExamplesNavbar.js";
import Footer from "../components/Footer/Footer.js";

let ps = null;

export function ProfilePage(props) {
  const [tabs, setTabs] = React.useState(1);
  const [userData, setUserData] = React.useState({
    firstname:null,
    lastname:null,
    phone:null,
    email:null,
    gender:null
  });
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle("profile-page");
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.className += " perfect-scrollbar-off";
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
      document.body.classList.toggle("profile-page");
    };
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3002/users/api/users/${props.walletAddress}`
        );
        setUserData({
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          phone: response.data.phone,
          email: response.data.email,
          gender: response.data.gender,
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="dots"
            src={require("../assets/img/dots.png")}
          />
          <img
            alt="..."
            className="path"
            src={require("../assets/img/path4.png")}
          />
          <Container className="align-items-center">
            <Row>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid rounded-circle"
                      src={require("../assets/img/user.png")}
                    />
                    <h4 className="title">
                      {userData.firstname} {userData.lastname}
                    </h4>
                    {props.walletAddress}
                  </CardHeader>
                  <CardBody>
                    <Nav
                      className="nav-tabs-primary justify-content-center"
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(1);
                          }}
                          href="#pablo"
                        >
                          Wallet
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink tag={Link} to="/payment">
                          Send
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 3,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(3);
                          }}
                          href="#pablo"
                        >
                          History
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + tabs}
                    >
                      <TabPane tabId="tab1">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">COIN</th>
                              <th className="header">AMOUNT</th>
                              <th className="header">VALUE</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>ETH</td>
                              <td>{props.accountBalance}</td>
                              {props.accountBalance == 0.0 ? (
                                <td>0 INR</td>
                              ) : (
                                <td>2252193.24 / props.accountBalance USD</td>
                              )}
                            </tr>
                            <tr>
                              <td>BTC</td>
                              <td>0.0</td>
                              <td>0 INR</td>
                            </tr>
                            <tr>
                              <td>XRP</td>
                              <td>0.0</td>
                              <td>0 INR</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab2">
                        <Row>
                          <Label sm="3">Pay to</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                placeholder="e.g. 1Nasd92348hU984353hfid"
                                type="text"
                              />
                              <FormText color="default" tag="span">
                                Please enter a valid address.
                              </FormText>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Amount</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input placeholder="1.587" type="text" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-simple btn-icon btn-round float-right"
                          color="primary"
                          type="submit"
                        >
                          <i className="tim-icons icon-send" />
                        </Button>
                      </TabPane>
                      <TabPane tabId="tab3">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              {/* <th className="header">Latest Crypto News</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {/* <td>The Daily: Nexo to Pay on Stable...</td> */}
                            </tr>
                            <tr>
                              {/* <td>Venezuela Begins Public of Nation...</td> */}
                            </tr>
                            <tr>
                              {/* <td>PR: BitCanna – Dutch Blockchain...</td> */}
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        <Footer />
      </div>
    </>
  );
}
