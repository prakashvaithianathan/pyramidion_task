import React, { useState } from "react";
import binance from "../../Assets/img/binance.png";
import metamask from "../../Assets/img/metamask.png";
import coinbase from "../../Assets/img/coinbase.png";
import { BscConnector } from "@binance-chain/bsc-connector";
import { useNavigate } from "react-router-dom";
import Wallet from "../Wallet/Wallet";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../utils/connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import Navbar from "../../Components/Navbar";

const Home = () => {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  let navigate = useNavigate();

  const handleBinance = async () => {
    const bsc = new BscConnector({
      supportedChainIds: [56, 97], 
    });

    const connectBinance = await bsc.activate();
    const getAddress = await bsc.getAccount();
    const getChain = await bsc.getChainId();

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    let balance = await provider.getBalance(getAddress);
    // we use the code below to convert the balance from wei to eth
    balance = ethers.utils.formatEther(balance);
    if (connectBinance?.account) {
      navigate("/wallet", {
        state: {
          name: "Binance",
          image: binance,
          address: getAddress,
          chainId: getChain,
          balance:balance
        },
      });
    }
  };

  const handleMetamask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
  
    const getMetamask = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    let balance = await provider.getBalance(getMetamask[0]);
  balance = ethers.utils.formatEther(balance);

  
    navigate("/wallet", {
      state: {
        name: "Metamask",
        image: metamask,
        address: getMetamask[0],
        chainId: window.ethereum.networkVersion,
        balance:balance,
        network:[{name:'Ethereum Mainnet',chainId:"1"},{name:"Ropsten",chainId:"3"},{name:"Rinkeby",chainId:"4"},{name:"Goerli",chainId:"5"}]
      },
    });
  };

  const handleCoinbase = async () => {
    const CoinbaseWallet = new WalletLinkConnector({
      url: `https://mainnet.infura.io/v3/f2869b5e9c7f4ae19ef05bc32101d9f1`,

      appName: "Pyramidion",

      supportedChainIds: [1, 3, 4, 5, 42],
    });

    const activate = await CoinbaseWallet.activate();
    const getAccount = await CoinbaseWallet.getAccount();
    const getChainId = await CoinbaseWallet.getChainId();


    const provider = new ethers.providers.Web3Provider(window.ethereum)
    let balance = await provider.getBalance(getAccount);
    // we use the code below to convert the balance from wei to eth
    balance = ethers.utils.formatEther(balance);



    navigate("/wallet", {
      state: {
        name: "Coinbase",
        image: coinbase,
        address: getAccount,
        chainId: getChainId,
        balance:balance,
        network:[{name:'Ethereum Mainnet',chainId:"1"},{name:"Ropsten",chainId:"3"},{name:"Rinkeby",chainId:"4"},{name:"Goerli",chainId:"5"}]
      },
    });
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
      <div className="wallet_container">
        <div className="wallet_inner_container" onClick={handleMetamask}>
          <img src={metamask} alt="metamask" style={{ width: "150px" }} />
          <h3 className="text_center">Metamask</h3>
        </div>
        <div className="wallet_inner_container" onClick={handleCoinbase}>
          <img
            src={coinbase}
            alt="coinbasewallet"
            style={{ width: "150px", borderRadius: "50%" }}
          />
          <h3 className="text_center">Coinbase Wallet</h3>
        </div>
        <div className="wallet_inner_container" onClick={handleBinance}>
          <img src={binance} alt="binance" style={{ width: "150px" }} />
          <h3 className="text_center">Binance Wallet</h3>
        </div>
      </div>
    </div>
  );
};
export default Home;
