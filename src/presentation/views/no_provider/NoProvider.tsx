import React from "react";
const metamask_img = new URL(
  "../../../assets/metamask_img.webp",
  import.meta.url
).href;
import "./NoProvider.css";

export function NoProvider() {
  return (
    <>
      <section className="row col-12 normalize no-provider">
        <div className="col col-12 my-auto">
          <h1 className="fw-bold text-center no-provider-title my-3">
            Protofire - Platzi Challenge
          </h1>
          <h2 className="fw-bol text-center no-provider-subtitle my-3">
            To use the Dapp, please install Metamask and refresh the page
          </h2>
          <img
            src={metamask_img}
            alt="metamask_logo"
            className="metamask-img mx-auto mt-5"
            onClick={() => window.open("https://metamask.io/download/")}
          />
        </div>
      </section>
    </>
  );
}
