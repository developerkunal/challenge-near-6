import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Card, Container, Row, Alert } from "react-bootstrap";
import { keys } from "regenerator-runtime";
const BN = require("bn.js");

const Mintforfriend = (props) => {
    const [address,SetAddress] = useState('');
  const mintNFT = async () => {
    await window.contract.nft_mint(
      {
        token_id: `${address}-near-challenge`,
        metadata: {
          title: "Near Spring Welcome Nft",
          description: "Nft only For near SpringField Users",
          media:
            "https://i.imgur.com/wpfc71x.png",
        },
        receiver_id: address,
      },
      300000000000000, // attached GAS (optional)
      new BN("1000000000000000000000000")
    )   
  };
 
  return (
    <Card style={{ padding: "2vh" }}>
      <Container>
        <Row style={{ marginBottom: "2vh" }}>
          <p>
            Step 3: You Can mint nft for your friend{" "}
            <a href='https://wallet.testnet.near.org/'> wallet</a> 
          </p>
        </Row>
        <Row> <Form.Label>Friend Address</Form.Label>
    <Form.Control type="address" placeholder="Enter Address" value={address} onChange={(e) => SetAddress(e.target.value)}  /></Row><br/>
        <Row className='d-flex justify-content-center'>
          <Button
            disabled={props.userNFTStatus || window.accountId === "" || !address}
            onClick={mintNFT}
            style={{ width: "50vw" }}
          >
            Mint NFT
          </Button>
        </Row>
        <Row className='d-flex justify-content-center'>
          {console.log(props.userNFTStatus)}
          {props.userNFTStatus ? (
            <Alert variant='danger' style={{ marginTop: "2vh" }}>
              <p style={{ textAlign: "center" }}>
                bruh/sis.... You have an NFT already. You can see it{" "}
                <a href={"https://wallet.testnet.near.org/?tab=collectibles"}>
                  here!
                </a>
                :)
              </p>
            </Alert>
          ) : null}
        </Row>
      </Container>
    </Card>
  );
};

Mintforfriend.propTypes = {};

export default Mintforfriend;
