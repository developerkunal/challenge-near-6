import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import { login, logout } from "./utils";
// React Bootstrap css
//import "./assets/css/animate.css";
import "./assets/css/stylesheet.css";
import "bootstrap/dist/css/bootstrap.min.css";

// React Bootstraps imports
import { Nav, Navbar, Container, Row, Card, Alert ,Button } from "react-bootstrap";

// Custom Components
import MintingTool from "./Components/MintingTool";
// assets
import Logo from "./assets/logo-white.svg";

import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  const [userHasNFT, setuserHasNFT] = useState(false);
  const [donated, setDonated] = useState();
  

  useEffect(() => {
    const receivedNFT = async () => {
      console.log(
        await window.contract.check_token({
          id: `${window.accountId}-tree`,
        })
      );
      if (window.accountId !== "") {
        console.log(
          await window.contract.check_token({
            id: `${window.accountId}-tree`,
          })
        );

        setuserHasNFT(
          await window.contract.check_token({
            id: `${window.accountId}-tree`,
          })
        );
      }
    };
    receivedNFT();
  }, []);

  useEffect(() => {
    const Donators = async () => {
      setDonated(
        await window.contract.get_num()
      );
    };
    Donators();
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
            <Nav><Nav.Link>{window.accountId}</Nav.Link>
              <Nav.Link
                onClick={window.walletConnection.isSignedIn() ? logout : login}
              >
                {window.walletConnection.isSignedIn()
                  ? "Logout"
                  : "Login"}
              </Nav.Link>{" "}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    <div className="wrapper " >
      <div id="big-text" className="wow bounceInDown" data-wow-delay="4s">
        <h1>Donate Now!</h1>
        <p>
You Came To Help the Zoo in Ukraine!
        </p>
      {window.accountId ?  <MintingTool   />:         <Row className='d-flex justify-content-center'>
<Button
            onClick={login}
            style={{ width: "50vw" }}
            variant="outline-light"
            className="rounded-pill px-3 mt-3 le-btn"
          >
            Login Now
          </Button></Row>}
      </div>
      <div id="leader-text" className="wow bounceInDown" data-wow-delay="4s">
        <p>
Zoo Got {donated} Donations!
        </p>
      </div>
          <div id="cock" className="wow bounceInDown" data-wow-delay="1s" ></div>
<div id="hand" className="wow bounceInUp" data-wow-delay="3.5s">
      
      </div> 
      <div id="grass" className="wow bounceInUp" data-wow-delay="1s"></div>
      <div id="grass2" className="wow bounceInUp" data-wow-delay="1.5s" ></div>
    </div>
    
    <a className="goto-top" href="#gotop"></a>
    
    </React.Fragment>
  );
}
