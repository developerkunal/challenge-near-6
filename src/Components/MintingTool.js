import React ,{useState}from "react";
import PropTypes from "prop-types";
import { Form, Button, Card, Container, Row, Alert } from "react-bootstrap";
import { keys } from "regenerator-runtime";
import "./loading.css";
import { v4 as uuidv4 } from 'uuid';
import { useParams } from "react-router";
import Big from 'big.js';

const BN = require("bn.js");

const MintingTool = (props) => {
  const [loading, setLoading] = useState("false");
  const { v4: uuidv4 } = require('uuid');
  const queryParams = new URLSearchParams(window.location.search)
  const transactionHashes = queryParams.get("transactionHashes")
  const [amount,setAmount] =useState(1);
  const mintNFT = async () => {
   await window.contract.nft_mint(
      {
        token_id: `${props.reciveraddress || window.accountId}-${uuidv4()}`,
        metadata: {
          title: "Near Spring Zoo NFT",
          description: "Nft only For Donators",
          media:
            "https://i.imgur.com/iGUGtN3.gif",
        },
        receiver_id: props.reciveraddress || window.accountId,
      },
      300000000000000, // attached GAS (optional)
      new BN(Big(amount).times(10 ** 24).toFixed())
    ); 
  };
 
  function handleChange(event) {
    setAmount(event.target.value);
  }


  return (
    <>{loading === "true" && <div className="loading">Loading&#8230;</div>}
      <>
        <>
        </>
        <Row className='d-flex justify-content-center'>
          <label>Select nears you wanna donate</label>
        <input className="form-control" type="number"  value={amount} min={1} max={20} step={0.1} onChange={handleChange}/> 
       
          <Button
            disabled={props.userNFTStatus || window.accountId === ""}
            onClick={mintNFT}
            style={{ width: "50vw" }}
            variant="outline-light"
            className="rounded-pill px-3 mt-3 le-btn"
          >
            Mint NFT
          </Button>
        </Row>
        <Row className='d-flex justify-content-center'>
          {transactionHashes ? (
            <Alert variant='danger' style={{ marginTop: "2vh",background:"transparent" }}>
              <p style={{ textAlign: "center" ,color:"blue" }}>
                Thanks for your humble participation for donating food for animals.{" "} You can check your Nft {" "}
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
