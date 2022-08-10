import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineContentCopy } from "react-icons/md";
import Navbar from "../../Components/Navbar";
import { BscConnector } from "@binance-chain/bsc-connector";
// import {  } from '@web3-react/metamask'

const Wallet = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);

  const handleClipBoard = () => {
    window.navigator.clipboard.writeText(state?.address);
  };

  const bsc = new BscConnector({
    supportedChainIds: [56, 97], 
  });

  const handleDeactivate = async () => {
    await bsc.deactivate();

    navigate("/");
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="wel-sli">
        <img
          src="https://www.pyramidions.com/new-webstatic/images/pyramidion_logo.gif"
          alt="pyramidionGIF"
        />
      </div>
      <div className="wallet_details_container">
        <h1
          style={{ color: state?.name === "Coinbase" ? "blue" : "#F3BA2F" }}
          className="text_center title_font"
        >
          {state?.name} Wallet
        </h1>
        <div className="center_align">
          <img
            src={state?.image}
            alt={state?.name}
            style={{
              width: "150px",
              borderRadius: state?.name === "Coinbase" ? "50%" : null,
            }}
          />
        </div>
        <div className="wallet_details_first_child_container">
          <div
            className="wallet_details_inner_container"
            style={{ display: "flex", alignItems: "center" }}
          >
            <span
              className="secondary_font"
              style={{ color: state?.name === "Coinbase" ? "blue" : "#F3BA2F" }}
            >
              Address:
            </span>
            <span>&nbsp;{state?.address}</span>
            &nbsp;&nbsp;{" "}
            <span
              onClick={handleClipBoard}
              style={{ marginTop: "5px" }}
              className="clipboard"
            >
              {" "}
              <MdOutlineContentCopy
                style={{ color: "white" }}
              ></MdOutlineContentCopy>
            </span>
          </div>
          <div className="wallet_details_inner_container">
            <span
              className="secondary_font"
              style={{ color: state?.name === "Coinbase" ? "blue" : "#F3BA2F" }}
            >
              Chain Id:
            </span>
            <span>&nbsp;{state?.chainId}</span>
          </div>
          {
            state?.balance&&

<div className="wallet_details_inner_container">
            <span
              className="secondary_font"
              style={{ color: state?.name === "Coinbase" ? "blue" : "#F3BA2F" }}
            >
              Balance:
            </span>
            <span>&nbsp;{state?.balance}</span>
          </div>
          }
          
          <div className="wallet_details_inner_container">
            <button
              className={state?.name === "Coinbase" ? "blue_btn" : "yellow_btn"}
              onClick={handleDeactivate}
            >
              Deactivate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
