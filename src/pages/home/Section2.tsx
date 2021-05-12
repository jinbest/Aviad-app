import React, { useState, useEffect } from "react"
import { storeDetails } from "../../store"
import { observer } from "mobx-react"
import { mockData } from "../../assets/mock-data"
import moment from "moment"
import { DateParam } from "../../model/date-param"
import { getFormattedDate } from "../../services/helper"
import { isEmpty } from "lodash"
import { CustomButton } from "../../components"
import 'moment/locale/he'

moment.locale('he');

const Section2 = () => {
  const thisPage = storeDetails.storeData.events
  const pageData = storeDetails.storeData.page
  const thisMock = mockData.static.section2

  const [startDates, setStartDates] = useState<DateParam[]>([] as DateParam[])
  const [endDates, setEndDates] = useState<DateParam[]>([] as DateParam[])

  useEffect(() => {
    const tmpStartDates: DateParam[] = [],
      tmpEndDates: DateParam[] = []
    thisPage.forEach((element: any) => {
      tmpStartDates.push({
        day: moment.utc(element.startdate).format("DD"),
        month: Number(moment.utc(element.startdate).format("MM")),
        time: moment.utc(element.startdate).format("HH:mm"),
        typeName: element.typeName
      })
      tmpEndDates.push({
        day: moment.utc(element.enddate).format("DD"),
        month: Number(moment.utc(element.enddate).format("MM")),
        time: moment.utc(element.enddate).format("HH:mm"),
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
      <div className="custom-button-container">
        <a
          href={`https://waze.com/ul?q=${thisPage.length > 0 ? thisPage[0].location : ''}`}
          target="_blank"
          rel="noreferrer"
        >
          <CustomButton title="נווט לאירוע" type="AREA" />
        </a>
        <a href={`tel:${pageData != null ? pageData.phone : ''}`}>
          <CustomButton title="התקשר ליוצר הדף" type="PHONE" />
        </a>
      </div>
      <div className="main-container">
        {!isEmpty(startDates) &&
          startDates.map((item: DateParam, index: number) => {
            return (
              <div className="formatted-date-container" key={index}>
                <p className="medium-text">{item.typeName} ב{getFormattedDate(item, endDates[index])}</p>
                <p className="medium-text">{thisPage[index].message}</p>
                <p className="heavy-text">{thisPage[index].location}</p>
              </div>
            )
          })}
      </div>      
    </div>
  )
}

export default observer(Section2)
