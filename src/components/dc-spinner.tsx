import { Modal } from "@material-ui/core"
import React, { FunctionComponent } from "react"
import { Spinner } from "reactstrap"

interface DcSpinnerProps {
  show: boolean
}

const DcSpinner: FunctionComponent<DcSpinnerProps> = ({ show }) => {
  return (
    <Modal
      open={show}
      disableBackdropClick={true}
      aria-labelledby="spinner"
      aria-describedby="modal for spinner"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          outline: "none",
        }}
      >
        <Spinner
          style={{
            color: "blue",
            width: "60px",
            height: "60px",
          }}
        ></Spinner>
      </div>
    </Modal>
  )
}

export default DcSpinner
