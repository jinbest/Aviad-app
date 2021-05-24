import React from "react"
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined"
import PhoneIcon from '@material-ui/icons/Phone';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

type Props = {
  title: string
  type?: "AREA" | "PHONE" | "WHATSAPP"
}

const CustomButton = ({ title, type }: Props) => {
  return (
    <div className="custom-button">
      {type === "AREA" && <RoomOutlinedIcon />}
      {type === "PHONE" && <PhoneIcon />}
      {type === "WHATSAPP" && <WhatsAppIcon />}
      <span className="medium-text">{title}</span>
    </div>
      
  )
}

export default CustomButton
