import React, { useState } from "react"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import CameraAltIcon from "@material-ui/icons/CameraAlt"
import CloseIcon from "@material-ui/icons/Close"
import AddIcon from "@material-ui/icons/Add"
import { mockData } from "../assets/mock-data"
import { CustomToggler } from "../components"
import { hashCode } from "../const/token"
import { ToastMsgParams } from "./toast/toast-msg-params"
import Toast from "./toast/toast"
import AuthenticatedAPiClient from "../services/authenticated-api-client"
import Config from "../config/config"
import Notification from "../const/notification"
import DcSpinner from "./dc-spinner"
import moment from "moment"

type Props = {
  showModal: boolean
  onCloseModal: (val: boolean) => void
}

const GalleryPostModal = ({ showModal, onCloseModal }: Props) => {
  const apiClient = AuthenticatedAPiClient.getInstance()
  const thisPage = mockData.static.section3.modal

  const [checked, setChecked] = useState(false)
  const [images, setImages] = useState<any[]>(new Array(3).fill(null))
  const [imageFiles, setImageFiles] = useState<any[]>(new Array(3).fill(null))
  const [toastParams, setToastParams] = useState<ToastMsgParams>({} as ToastMsgParams)
  const [submited, setSubmitted] = useState(false)
  const [uploader, setUploader] = useState("")

  const handleClose = () => {
    setImages(new Array(3).fill(null))
    setImageFiles(new Array(3).fill(null))
    setChecked(false)
    onCloseModal(false)
    setUploader("")
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const bodyFormData = new Array(3).fill(new FormData())

    imageFiles.forEach((item: any, index: number) => {
      bodyFormData[index].append("hash", hashCode)
      bodyFormData[index].append("uploader", uploader)
      bodyFormData[index].append("title", item.name)
      bodyFormData[index].append("taken", moment().format())
      bodyFormData[index].append("image", item)
    })

    handlePost(bodyFormData)
  }

  const handlePost = async (bodyFormDatas: any[]) => {
    setSubmitted(true)
    let msg = Notification.SUCCESS_MSG
    let failed = false
    try {
      await apiClient.post(`${Config.SERVICE_API_URL}page/gallery/request`, bodyFormDatas)
    } catch (error) {
      msg = Notification.FAILED_RUQUEST
      failed = true
    } finally {
      setToastParams({
        msg,
        isError: failed,
        isSuccess: !failed,
      })
    }
    setSubmitted(false)
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

  const resetStatuses = () => {
    setToastParams({
      msg: "",
      isError: false,
      isWarning: false,
      isInfo: false,
      isSuccess: false,
    })
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
        <form onSubmit={handleSubmit}>
          <div className="paper">
            <div className="d-flex space-between align-center modal-header">
              <button type="submit">{thisPage.raise}</button>
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
                {/* <p className="normal-text">{thisPage.aboutPicture}</p> */}
                <input
                  placeholder={thisPage.aboutPicture}
                  value={uploader}
                  onChange={(e) => {
                    setUploader(e.target.value)
                  }}
                />
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
        </form>
      </Modal>
      <Toast params={toastParams} resetStatuses={resetStatuses} />
      <DcSpinner show={submited} />
    </div>
  )
}

export default GalleryPostModal
