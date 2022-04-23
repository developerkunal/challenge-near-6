import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import { login, logout } from "./utils";

// React Bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";

// React Bootstraps imports
import { Nav, Navbar, Container, Row, Card, Alert } from "react-bootstrap";

// Custom Components
import MintingTool from "./Components/MintingTool";
import InfoBubble from "./Components/InfoBubble";
import Mintforfriend from "./Components/MintforFriend"
// assets
import Logo from "./assets/logo-white.svg";

import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  const [userHasNFT, setuserHasNFT] = useState(false);
 
  useEffect(() => {
    const receivedNFT = async () => {
      console.log(
        await window.contract.check_token({
          id: `${window.accountId}-near-challenge`,
        })
      );
      if (window.accountId !== "") {
        console.log(
          await window.contract.check_token({
            id: `${window.accountId}-near-challenge`,
          })
        );

        setuserHasNFT(
          await window.contract.check_token({
            id: `${window.accountId}-near-challenge`,
          })
        );
      }
    };
    receivedNFT();
  }, []);

  return (
    <React.Fragment>
      {" "}
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>
            <img
              alt=''
              src={Logo}
              width='30'
              height='30'
              className='d-inline-block align-top'
            />{" "}
            NEar SpringField challenge
            </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'></Nav>
            <Nav>
              <Nav.Link
                onClick={window.walletConnection.isSignedIn() ? logout : login}
              >
                {window.walletConnection.isSignedIn()
                  ? window.accountId
                  : "Login"}
              </Nav.Link>{" "}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{ marginTop: "3vh" }}>
        {" "}
        <Row className='d-flex justify-content-center'>

          <img src="https://i.imgur.com/wpfc71x.png" style={{'height':'350px','width':'300px','justifyContent': 'center',
    'alignItems': 'center',}}></img>
        </Row>
        <br/>
        <Row>
          <InfoBubble />
        </Row>
        <Row style={{ marginTop: "3vh" }}>
          <MintingTool userNFTStatus={userHasNFT}  />
          
          <Mintforfriend  reciveraddress={'kunaltest1.testnet'} />

        </Row>
      </Container>
    </React.Fragment>
  );
}
