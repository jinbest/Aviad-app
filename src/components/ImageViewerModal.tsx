import React from "react"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import CloseIcon from "@material-ui/icons/Close"

type Props = {
  showModal: boolean
  onCloseModal: (val: boolean) => void
  img: string
}

const ImageViewerModal = ({ showModal, onCloseModal, img }: Props) => {
  const handleClose = () => {
    onCloseModal(false)
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="gallery-post-modal"
        open={showModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className="image-viewer">
          <CloseIcon onClick={handleClose} />
          <img src={img} alt="image-viewer-modal" />
        </div>
      </Modal>
    </div>
  )
}

export default ImageViewerModal
