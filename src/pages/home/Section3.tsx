import React, { useState } from "react"
import { storeDetails } from "../../store"
import { observer } from "mobx-react"
import { mockData } from "../../assets/mock-data"
import Config from "../../config/config"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { GalleryPostModal, LazyImg } from "../../components"

const Section3 = () => {
  const thisPage = storeDetails.storeData.gallery
  const thisMock = mockData.static.section3

  const [sliceNum, setSliceNum] = useState(4)
  const [showModal, setShowModal] = useState(false)

  const handleViewMore = () => {
    setSliceNum(Math.min(sliceNum + 4, thisPage.length))
  }

  return (
    <div className="section">
      <div className="main-container d-flex space-between">
        <p className="heavy-text">{thisMock.morePicture}</p>
        <p className="heavy-text">{thisMock.photos}</p>
      </div>
      <div className="main-container">
        <div className="home-sec3-img-container">
          {thisPage.slice(0, sliceNum).map((item: any, index: number) => {
            return (
              <div className="img-card" key={index}>
                <div className="image">
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
            {sliceNum < thisPage.length && (
              <MoreVertIcon className="view-more" onClick={handleViewMore} />
            )}
          </div>
        </div>
      </div>
      <hr className="liner" />
      <GalleryPostModal showModal={showModal} onCloseModal={() => setShowModal(false)} />
    </div>
  )
}

export default observer(Section3)
