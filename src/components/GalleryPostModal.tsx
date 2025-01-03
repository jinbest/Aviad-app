import React, { useState } from "react"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import CameraAltIcon from "@material-ui/icons/CameraAlt"
import CloseIcon from "@material-ui/icons/Close"
import AddIcon from "@material-ui/icons/Add"
import { mockData } from "../assets/mock-data"
import { CustomToggler } from "../components"
import { ToastMsgParams } from "./toast/toast-msg-params"
import Toast from "./toast/toast"
import AuthenticatedAPiClient from "../services/authenticated-api-client"
import Config from "../config/config"
import Notification from "../const/notification"
import DcSpinner from "./dc-spinner"
import { TextField } from "@material-ui/core"
import moment from "moment"
import { storeDetails } from "../store"
import { observer } from "mobx-react"
import "moment/locale/he"

moment.locale("he")

type Props = {
  showModal: boolean
  onCloseModal: (val: boolean) => void
}

const GalleryPostModal = ({ showModal, onCloseModal }: Props) => {
  const apiClient = AuthenticatedAPiClient.getInstance()
  const thisPage = mockData.static.section3.modal

  // const [checked, setChecked] = useState(true)
  const [images, setImages] = useState<any[]>(new Array(3).fill(null))
  const [imageFiles, setImageFiles] = useState<any[]>(new Array(3).fill(null))
  const [toastParams, setToastParams] = useState<ToastMsgParams>({} as ToastMsgParams)
  const [submited, setSubmitted] = useState(false)
  const [uploader, setUploader] = useState("")
  const [aboutPicture, setAboutPicture] = useState("")
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"))

  const handleClose = () => {
    setImages(new Array(3).fill(null))
    setImageFiles(new Array(3).fill(null))
    // setChecked(true)
    onCloseModal(false)
    setUploader("")
    setAboutPicture("")
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (!uploader) {
      setToastParams({
        msg: "אנא מלא את כל הפרטים לפני העלאה",
        isError: true,
      })
      return
    }
    imageFiles.forEach((item: any) => {
      if (!item) return
      const bodyFormData = new FormData()

      bodyFormData.append("hash", storeDetails.hashCode)
      bodyFormData.append("uploader", uploader)
      bodyFormData.append("title", aboutPicture)
      bodyFormData.append("taken", new Date(date).getTime().toString())
      bodyFormData.append("image", item)

      handlePost(bodyFormData)
    })
  }

  const handlePost = async (bodyFormDatas: any) => {
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
    handleClose()
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
                {[0, 1, 2].map((item) => {
                  return (
                    <div className="image-uploader" key={item}>
                      {getImageSrc(item) && (
                        <CloseIcon
                          onClick={() => {
                            handleRemoveImage(item)
                          }}
                          className="close-icon"
                        />
                      )}
                      <label className="upload-input" htmlFor={`upload-${item + 1}`}>
                        {getImageSrc(item) ? (
                          <img src={getImageSrc(item)} className="content-img" />
                        ) : (
                          <AddIcon />
                        )}
                      </label>
                      <input
                        type="file"
                        value=""
                        id={`upload-${item + 1}`}
                        onChange={(e) => handleFileInput(e, item)}
                        hidden
                      />
                    </div>
                  )
                })}
              </div>
              <div className="modal-text-container">
                <input
                  placeholder={thisPage.aboutPicture}
                  value={aboutPicture}
                  onChange={(e) => {
                    setAboutPicture(e.target.value)
                  }}
                />
                <input
                  placeholder="שם מעלה התמונה"
                  value={uploader}
                  onChange={(e) => {
                    setUploader(e.target.value)
                  }}
                />
                <TextField
                  value={date}
                  onChange={(e) => {
                    if (e.target.value.length >= 0) {
                      setDate(e.target.value)
                    }
                  }}
                  className="custom-date-picker"
                  margin="dense"
                  autoComplete="off"
                  type="date"
                  placeholder={thisPage.datePhoto}
                  required
                />
                <div className="d-flex align-center space-between m-left fit-width">
                  <p className="normal-text" style={{ marginRight: "10px" }}>
                    {thisPage.description}
                  </p>
                  <CustomToggler
                    checked={true}
                    handleStatus={() => {
                      //EMPTY
                    }}
                  />
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

export default observer(GalleryPostModal)
