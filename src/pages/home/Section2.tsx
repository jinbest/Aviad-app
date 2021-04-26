import React, { useState, useEffect } from "react"
import { storeDetails } from "../../store"
import { observer } from "mobx-react"
import { mockData } from "../../assets/mock-data"
import moment from "moment"
import { DateParam } from "../../model/date-param"
import { getFormattedDate } from "../../services/helper"
import { isEmpty } from "lodash"

const Section2 = () => {
  const thisPage = storeDetails.storeData.events
  const thisMock = mockData.static.section2

  const [startDates, setStartDates] = useState<DateParam[]>([] as DateParam[])
  const [endDates, setEndDates] = useState<DateParam[]>([] as DateParam[])

  useEffect(() => {
    const tmpStartDates: DateParam[] = [],
      tmpEndDates: DateParam[] = []
    thisPage.forEach((element: any) => {
      tmpStartDates.push({
        day: moment(element.startdate).format("DD"),
        month: Number(moment(element.startdate).format("MM")),
        time: moment(element.startdate).format("hh:mm"),
      })
      tmpEndDates.push({
        day: moment(element.enddate).format("DD"),
        month: Number(moment(element.enddate).format("MM")),
        time: moment(element.enddate).format("hh:mm"),
      })
    })
    setStartDates([...tmpStartDates])
    setEndDates([...tmpEndDates])
  }, [thisPage])

  return (
    <div className="section">
      <div className="main-container">
        <p className="heavy-text">{thisMock.subTitle}</p>
      </div>
      <div className="sec2-img-container">
        <img src={thisMock.familyBgImg} alt="family-background" />
      </div>
      <div className="main-container">
        {!isEmpty(startDates) &&
          startDates.map((item: DateParam, index: number) => {
            return (
              <div className="formatted-date-container" key={index}>
                <p className="medium-text">{getFormattedDate(item, endDates[index])}</p>
                <p className="heavy-text">{thisPage[index].location}</p>
              </div>
            )
          })}
      </div>
      <div className="main-container">
        <p className="normal-text">{thisMock.subProfile.title}</p>
        <div className="sub-profile">
          <p className="heavy-text">{thisMock.subProfile.name}</p>
          <img src={thisMock.subProfile.img} alt="sub-profile-avatar" />
        </div>
      </div>
      <hr className="liner" />
    </div>
  )
}

export default observer(Section2)
