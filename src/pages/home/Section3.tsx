import React, { useState } from "react"
import { storeDetails } from "../../store"
import { observer } from "mobx-react"
import { mockData } from "../../assets/mock-data"
import Config from "../../config/config"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import { GalleryPostModal, LazyImg, ImageViewerModal, ViewAllGalleryModal } from "../../components"

const Section3 = () => {
  const thisPage = storeDetails.storeData.gallery
  const thisMock = mockData.static.section3

  const [showModal, setShowModal] = useState(false)
  const [showImageViewer, setShowImageViewerModal] = useState(false)
  const [showAllGallery, setShowAllGallery] = useState(false)
  const [img, setImg] = useState("")

  return (
    <div className="section">
    <hr className="liner" />
      <div className="main-container d-flex space-between">
        <p
          className="heavy-text"
          onClick={() => {
            setShowAllGallery(true)
          }}
          style={{ cursor: "pointer" }}
        >
          {thisMock.morePicture}
        </p>
        <p className="heavy-text">{thisMock.photos}</p>
      </div>
      <div className="main-container">
        <div className="home-sec3-img-container">
          {thisPage.slice(0, 4).map((item: any, index: number) => {
            return (
              <div className="img-card" key={index}>
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
          <div className="d-flex space-between full-width align-center">
            <AddCircleIcon className="view-more" onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>
      <GalleryPostModal showModal={showModal} onCloseModal={() => setShowModal(false)} />
      <ImageViewerModal
        showModal={showImageViewer}
        onCloseModal={() => setShowImageViewerModal(false)}
        img={img}
      />
      <ViewAllGalleryModal
        showModal={showAllGallery}
        onCloseModal={() => {
          setShowAllGallery(false)
        }}
      />
    </div>
  )
}

export default observer(Section3)
