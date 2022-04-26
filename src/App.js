import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import { login, logout } from "./utils";

// React Bootstrap css
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
  const [treeminted, settreeminted] = useState();

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
    const Plantnumber = async () => {
      settreeminted(
        await window.contract.get_num()
      );
    };
    Plantnumber();
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
      </Navbar><div
        className="d-flex justify-content-center flex-column text-center "
        style={{ background: "#000", minHeight: "95vh" }}
      >
        <div className="mt-auto text-light mb-5">
          <div
            className=" ratio ratio-1x1 mx-auto mb-2"
            style={{ maxWidth: "350px"}}
          >
            <img src="https://www.clipartmax.com/png/full/80-800867_tree-google-images-poster-planting-trees-png.png" alt="" />
          </div>{window.accountId === ""  ?<>
          <p>Please connect your wallet to continue.</p>
          <Button
            onClick={login}
            variant="outline-light"
            className="rounded-pill px-3 mt-3"
          >
            Connect Wallet
          </Button></> : <MintingTool userNFTStatus={userHasNFT}  />}
          <div style={{marginTop:"40px"}}>
          <p> {treeminted} Plants has been planted for Global Cause</p>
          </div>
        </div>
      </div>
      
    </React.Fragment>
  );
}
