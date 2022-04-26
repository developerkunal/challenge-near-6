import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Card, Container, Row, Alert } from "react-bootstrap";
import { keys } from "regenerator-runtime";
const BN = require("bn.js");

const MintingTool = (props) => {
  const mintNFT = async () => {
    await window.contract.increment();
    await window.contract.nft_mint(
      {
        token_id: `${props.reciveraddress || window.accountId}-tree`,
        metadata: {
          title: "Near Spring Tree NFT",
          description: "Nft only For near SpringField Users",
          media:
            "https://i.imgur.com/eqY0bcw.gif",
        },
        receiver_id: props.reciveraddress || window.accountId,
      },
      300000000000000, // attached GAS (optional)
      new BN("2000000000000000000000000")
    );
  };

  return (
    <>
      <>
        <>
          <p>
             After you have logged in, hit this button to mint your Token and go your{" "}
            <a href='https://wallet.testnet.near.org/'> wallet</a> and see your
            NFT
          </p>
        </>
        <Row className='d-flex justify-content-center'>
          <Button
            disabled={props.userNFTStatus || window.accountId === ""}
            onClick={mintNFT}
            style={{ width: "50vw" }}
            variant="outline-light"
            className="rounded-pill px-3 mt-3"
          >
            Mint NFT
          </Button>
        </Row>
        <Row className='d-flex justify-content-center'>
          {console.log(props.userNFTStatus)}
          {props.userNFTStatus ? (
            <Alert variant='danger' style={{ marginTop: "2vh",background:"black" }}>
              <p style={{ textAlign: "center" ,color:"blue" }}>
                Thanks for your humble participation for planting a tree.{" "} You can check your Nft {" "}
                <a href={"https://wallet.testnet.near.org/?tab=collectibles"}>
                  here!
                </a>
                :)
              </p>
            </Alert>
          ) : null}
        </Row>
      </>
    </>
  );
};

MintingTool.propTypes = {};

export default MintingTool;
