import React from "react"
import styled from "styled-components"

const CheckBoxWrapper = styled.div`
  position: relative;
  height: 22px;
`
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0px;
  left: 0;
  width: 30px;
  height: 20px;
  border-radius: 15px;
  background: #fdf6f8;
  border: 1px solid #efd2c2;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin: 0px;
    margin-left: 0px;
    transition: 0.2s;
    background-color: #efd2c2;
    transition: 0.2s;
  }
`
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 30px;
  height: 20px;
  &:checked + ${CheckBoxLabel} {
    background: #efd2c2;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      margin: 0px;
      margin-left: 10px;
      transition: 0.2s;
      background-color: #fdf6f8;
    }
  }
`

type Props = {
  checked: boolean
  handleStatus: (val: boolean) => void
}

const CustomToggler = ({ checked, handleStatus }: Props) => {
  return (
    <div style={{ height: "20px" }}>
      <CheckBoxWrapper>
        <CheckBox
          id="checkbox"
          type="checkbox"
          checked={checked}
          onChange={(e) => handleStatus(e.target.checked)}
        />
        <CheckBoxLabel htmlFor="checkbox" />
      </CheckBoxWrapper>
    </div>
  )
}

export default CustomToggler
