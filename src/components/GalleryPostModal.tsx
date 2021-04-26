import React, { useState } from "react"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import CameraAltIcon from "@material-ui/icons/CameraAlt"
import CloseIcon from "@material-ui/icons/Close"
import AddIcon from "@material-ui/icons/Add"
import { mockData } from "../assets/mock-data"
import { CustomToggler } from "../components"

type Props = {
  showModal: boolean
  onCloseModal: (val: boolean) => void
}

const GalleryPostModal = ({ showModal, onCloseModal }: Props) => {
  const thisPage = mockData.static.section3.modal

  const [checked, setChecked] = useState(false)
  const [images, setImages] = useState<any[]>(new Array(3).fill(null))
  const [imageFiles, setImageFiles] = useState<any[]>(new Array(3).fill(null))
  // const [submited, setSubmitted] = useState(false)

  const handleClose = () => {
    setImages(new Array(3).fill(null))
    setImageFiles(new Array(3).fill(null))
    setChecked(false)
    onCloseModal(false)
  }

  const handleSubmit = () => {
    console.log(images, imageFiles, checked)
  }

  const handleFileInput = (event: any, index: number) => {
    if (event.target.files && event.target.files[0]) {
      images[index] = URL.createObjectURL(event.target.files[0])
      imageFiles[index] = event.target.files[0]
      setImages([...images])
      setImageFiles([...imageFiles])
    }
  }

  const getImageSrc = (index: number) => {
    return images[index]
  }

  const handleRemoveImage = (index: number) => {
    images[index] = null
    imageFiles[index] = null
    setImages([...images])
    setImageFiles([...imageFiles])
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
        <div className="paper">
          <div className="d-flex space-between align-center modal-header">
            <button onClick={handleSubmit}>{thisPage.raise}</button>
            <CameraAltIcon className="camera-icon" />
            <div className="d-flex space-between align-center">
              <p className="heavy-text" style={{ marginRight: "10px" }}>
                {thisPage.fromGallery}
              </p>
              <CloseIcon onClick={handleClose} />
            </div>
          </div>
          <div className="modal-body">
            <div className="image-upload-container">
              <div className="image-uploader">
                {getImageSrc(0) && (
                  <CloseIcon
                    onClick={() => {
                      handleRemoveImage(0)
                    }}
                    className="close-icon"
                  />
                )}
                <label className="upload-input" htmlFor="upload-1">
                  {getImageSrc(0) ? (
                    <img src={getImageSrc(0)} className="content-img" />
                  ) : (
                    <AddIcon />
                  )}
                </label>
                <input
                  type="file"
                  value=""
                  id="upload-1"
                  onChange={(e) => handleFileInput(e, 0)}
                  hidden
                />
              </div>
              <div className="image-uploader">
                {getImageSrc(1) && (
                  <CloseIcon
                    onClick={() => {
                      handleRemoveImage(1)
                    }}
                    className="close-icon"
                  />
                )}
                <label className="upload-input" htmlFor="upload-2">
                  {getImageSrc(1) ? (
                    <img src={getImageSrc(1)} className="content-img" />
                  ) : (
                    <AddIcon />
                  )}
                </label>
                <input
                  type="file"
                  value=""
                  id="upload-2"
                  onChange={(e) => handleFileInput(e, 1)}
                  hidden
                />
              </div>
              <div className="image-uploader">
                {getImageSrc(2) && (
                  <CloseIcon
                    onClick={() => {
                      handleRemoveImage(2)
                    }}
                    className="close-icon"
                  />
                )}
                <label className="upload-input" htmlFor="upload-3">
                  {getImageSrc(2) ? (
                    <img src={getImageSrc(2)} className="content-img" />
                  ) : (
                    <AddIcon />
                  )}
                </label>
                <input
                  type="file"
                  value=""
                  id="upload-3"
                  onChange={(e) => handleFileInput(e, 2)}
                  hidden
                />
              </div>
            </div>
            <div className="modal-text-container">
              <p className="normal-text">{thisPage.aboutPicture}</p>
              <p className="normal-text">{thisPage.datePhoto}</p>
              <div className="d-flex align-center space-between m-left fit-width">
                <p className="normal-text" style={{ marginRight: "10px" }}>
                  {thisPage.description}
                </p>
                <CustomToggler checked={checked} handleStatus={setChecked} />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default GalleryPostModal
