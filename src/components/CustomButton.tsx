import React from "react"
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined"
import PhoneIcon from '@material-ui/icons/Phone';

type Props = {
  title: string
  type?: "AREA" | "PHONE"
}

const CustomButton = ({ title, type }: Props) => {
  return (
    <div className="custom-button">
      {type === "AREA" && <RoomOutlinedIcon />}
      {type === "PHONE" && <PhoneIcon />}
      <span className="medium-text">{title}</span>
    </div>
      
  )
}

export default CustomButton
