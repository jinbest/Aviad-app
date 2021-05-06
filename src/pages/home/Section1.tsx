import React from "react"
import { storeDetails } from "../../store"
import { observer } from "mobx-react"
import Config from "../../config/config"
import { mockData } from "../../assets/mock-data"
import moment from "moment"
import { LazyImg } from "../../components/"
import 'moment/locale/he'

moment.locale('he');

const Section1 = () => {
  const thisPage = storeDetails.storeData.page
  const thisMock = mockData.static.section1
  const avatar = thisPage.image
  const birthDay = moment(thisPage.birthdate, "YYYY-MM-DD")
  const deathDay = moment(thisPage.deathdate, "YYYY-MM-DD")
  const age = Math.round(moment.duration(deathDay.diff(birthDay)).asYears())

  return (
    <div className="section">
      <div className="shape">
        <div className="avatar">
          <LazyImg
            style={{ width: "100%" }}
            src={avatar ? `${Config.SERVICE_API_URL}${avatar}` : thisMock.avatar}
          />
        </div>
      </div>
      <div className="introduction">
        <p className="heavy-text">{thisPage.fullname}</p>
        <p className="normal-text">{`נפטר בגיל ${age} בתאריך ${moment(deathDay).format(
          "DD.MM.YYYY"
        )}`}</p>
      </div>
      <div className="main-container">
        <p className="heavy-text">{thisMock.subTitle}</p>
        <p className="normal-text">{thisPage.about}</p>
      </div>
      <hr className="liner" />
    </div>
  )
}

export default observer(Section1)
