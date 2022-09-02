import React from "react";
import "./ChallengeBanner.css";

const protofire_img = new URL('../../../../assets/protofire.webp', import.meta.url).href
const platzi_img = new URL('../../../../assets/platzi.webp', import.meta.url).href


export function ChallengerBanner() {
  return (
    <div className="normalize row col-12 align-items-center">
      <h1 className="my-5 fw-bold text-center challenge-title">
        Platzi Challenge
      </h1>
      <h2 className="challenge-subtitle">
        Create a DApp that allows people to vote on a (binary) proposal. Each
        ethereum address should be allowed to vote only once and the vote should
        cost 0.01 ETH. When a user opens the page, it should see the result so
        far (number of positive votes vs. number of negative votes).
      </h2>
      <h2 className="challenge-subtitle mt-3">
        The contract is already deployed at:
      </h2>
      <h2 className="challenge-subtitle mt-3">
        0xacfc7725527ba2ee4311574f65e5d76f9f9585e9{"  "}
        <i
          onClick={() =>
            window.open(
              "https://goerli.etherscan.io/address/0xacfc7725527ba2ee4311574f65e5d76f9f9585e9#code"
            )
          }
          className="fa-solid fa-arrow-up-right-from-square icon-button"
        ></i>
      </h2>
      <h2 className="challenge-subtitle mt-3 icon-button">
        You can check the repo here:{" "}
        <i
          onClick={() =>
            window.open("https://github.com/reyesmfabian/platzi-web3-libs")
          }
          className="fa-brands fa-github"
        ></i>
      </h2>

      <h2 className="challenge-subtitle mt-5">Powered By:</h2>
      <img src={protofire_img} alt="protofire_logo" className="sponsor mx-2" />
      <img
        src={platzi_img}
        alt="platzi_logo"
        className="sponsor mx-2"
        onClick={() => window.open("https://platzi.com/")}
      />
      {/* <img
        src="/src/assets/platzi-eth.webp"
        alt="platzi_logo"
        className="program mx-2 mt-3"
        onClick={() => window.open("https://platzi.com/eth")}
      /> */}
    </div>
  );
}
