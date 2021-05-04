import React from "react"
import { mockData } from "../assets/mock-data"

const Footer = () => {
  return (
    <div className="footer">
      <p className="mid-text">{mockData.footer.reserved}</p>
      <span className="mid-text">{` ${mockData.footer.designedby} `}&copy;</span>
      <a className="mid-text" href="https://oversight.co.il/">{` ${mockData.footer.oversight}`}</a>
    </div>
  )
}

export default Footer
