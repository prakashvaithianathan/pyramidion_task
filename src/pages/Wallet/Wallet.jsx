import React,{useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineContentCopy } from "react-icons/md";
import Navbar from "../../Components/Navbar";
import { BscConnector } from "@binance-chain/bsc-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import {ethers} from 'ethers'

// import {  } from '@web3-react/metamask'

const Wallet = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [chainID, setChainID] = useState(state?.chainId)

  const handleClipBoard = () => {
    window.navigator.clipboard.writeText(state?.address);
  };

  const bsc = new BscConnector({
    supportedChainIds: [56, 97], 
  });


  const [dropDownName, setDropDownName] = useState(state?.network&&state.network[0]?.name)
  const [networkDropDown, setNetworkDropDown] = useState(false)
  const [balance, setBalance] = useState(state?.balance)

  const handleDeactivate = async () => {



    if(state?.name==="Binance"){
        await bsc.deactivate();
    }



    navigate("/");
  };


  const handleNetwork = async(item)=>{
    // try {
        setDropDownName(item?.name);
        setNetworkDropDown(false)
        const accounts = await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{chainId:"0x"+item?.chainId}]
          });

 const account =  await window.ethereum.request({
    method: "eth_requestAccounts"
  });
  setChainID(item?.chainId)
  console.log(window.ethereum);
          const provider = new ethers.providers.Web3Provider(window.ethereum)
         
    let balance = await provider.getBalance(account[0]);
   
    balance = ethers.utils.formatEther(balance);
    setBalance(balance)

    // } catch (error) {
        
    //     console.log(error);
    // }
  }


//   console.log(state?.network);

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
            <span>&nbsp;{chainID}</span>
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
            <span>&nbsp;{balance}</span>
          </div>
          }

          {
            state?.network &&
<div className="wallet_details_inner_container " onMouseEnter={()=>{setNetworkDropDown(true)}} onMouseLeave={()=>{setNetworkDropDown(false)}}>
            <span
              className="secondary_font"
              style={{ color: state?.name === "Coinbase" ? "blue" : "#F3BA2F" }}
            >
              Network:
            </span>
           &nbsp; <span style={{marginTop:'5px',cursor:'pointer'}}>{dropDownName}</span>
            {
                  networkDropDown &&
            <div  className="dropDownContainer" >
    
      {
      
        state?.network?.map((item)=>{
            return(
                <ul className="drop_down_child" onClick={()=>{handleNetwork(item)}}>{item?.name}</ul>
            )
        })
      }
</div>
}
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
