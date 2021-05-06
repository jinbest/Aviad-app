import React from "react"
import { mockData } from "../assets/mock-data"
import { storeDetails } from "../store"
import { observer } from "mobx-react"
import moment from "moment"
import "moment/locale/he"

moment.locale("he")

const Footer = () => {
  return (
    <>
    <hr className="liner" />
    <div className="section">
      <div className="d-flex justify-center" style={{ margin: "20px 0" }}>
        <a href={storeDetails.systemInfo.googleplay} target="_blank" rel="noreferrer">
          <div className="play-button">
            <img src={require("../assets/img/google-play.png").default} alt="google-play" />
          </div>
        </a>
        <a href={storeDetails.systemInfo.appstore} target="_blank" rel="noreferrer">
          <div className="play-button">
            <img src={require("../assets/img/app-store.png").default} alt="app-store" />
          </div>
        </a>
      </div>
    </div>
    <div className="footer">
      <p className="mid-text">{mockData.footer.reserved}</p>
      <span className="mid-text">{` ${mockData.footer.designedby} `}&copy;</span>
      <a className="mid-text" href="https://oversight.co.il/">{` ${mockData.footer.oversight}`}</a>
    </div></>
  )
}

export default observer(Footer)
