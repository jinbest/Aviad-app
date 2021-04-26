import React from "react"
import { mockData } from "../assets/mock-data"

const Header = () => {
  return (
    <div className="header">
      <img src={mockData.logo} alt="logo-header" />
    </div>
  )
}

export default Header
