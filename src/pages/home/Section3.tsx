import React, { useState } from "react"
import { storeDetails } from "../../store"
import { observer } from "mobx-react"
import { mockData } from "../../assets/mock-data"
import Config from "../../config/config"
import AddCircleIcon from "@material-ui/icons/AddCircle"

const Section3 = () => {
  const thisPage = storeDetails.storeData.gallery
  const thisMock = mockData.static.section3

  const [sliceNum, setSliceNum] = useState(4)

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
              <div
                className="img-card"
                key={index}
                style={{ backgroundImage: `url(${Config.SERVICE_API_URL}${item.file})` }}
              />
            )
          })}
          {sliceNum < thisPage.length && (
            <AddCircleIcon className="view-more" onClick={handleViewMore} />
          )}
        </div>
      </div>
      <hr className="liner" />
    </div>
  )
}

export default observer(Section3)
