import React, { useState } from "react"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import CloseIcon from "@material-ui/icons/Close"
import { storeDetails } from "../store"
import { observer } from "mobx-react"
import Config from "../config/config"
import { LazyImg, ImageViewerModal, GalleryPostModal } from "."
import AddCircleIcon from "@material-ui/icons/AddCircle"
import _ from "lodash"
import moment from "moment"

type Props = {
  showModal: boolean
  onCloseModal: (val: boolean) => void
}

const ViewAllGalleryModal = ({ showModal, onCloseModal }: Props) => {
  const thisPage = storeDetails.storeData.gallery

  const gallery = _.sortBy(_.cloneDeep(thisPage), (o) => o.created).reverse()
  const allYears: any[] = []
  gallery.forEach((item: any) => {
    allYears.push(moment(item.created).format("YYYY"))
  })
  const years = _.uniqBy(allYears, (item) => item)
  const groupByGallery = _.groupBy(gallery, (o) => moment(o.created).format("YYYY"))

  const [showImageViewer, setShowImageViewerModal] = useState(false)
  const [img, setImg] = useState("")
  const [showPostModal, setShowPostModal] = useState(false)

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
        <div className="all-gallery-viewer">
          <CloseIcon onClick={handleClose} />
          <div className="main-container">
            <div className="gallery-viewer-header">
              <p className="heavy-text">גלריית תמונות</p>
              <AddCircleIcon
                onClick={() => {
                  setShowPostModal(true)
                }}
              />
            </div>
          </div>
          <div className="viewer custom-scroll-bar">
            <div className="main-container">
              {years.map((it: any, id: number) => {
                return (
                  <div className="all-gallery-container" key={id}>
                    <div className="timeline">
                      <span className="dot"></span>
                      <p className="heavy-text">{it}</p>
                    </div>
                    {groupByGallery[it].map((item: any, index: number) => {
                      return (
                        <div className="gallery-card" key={index}>
                          <div
                            className="image"
                            onClick={() => {
                              setImg(`${Config.SERVICE_API_URL}${item.file}`)
                              setShowImageViewerModal(true)
                            }}
                          >
                            <LazyImg
                              src={`${Config.SERVICE_API_URL}${item.file}`}
                              style={{ width: "100%", margin: "auto" }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
          <ImageViewerModal
            showModal={showImageViewer}
            onCloseModal={() => setShowImageViewerModal(false)}
            img={img}
          />
          <GalleryPostModal
            showModal={showPostModal}
            onCloseModal={() => setShowPostModal(false)}
          />
        </div>
      </Modal>
    </div>
  )
}

export default observer(ViewAllGalleryModal)
