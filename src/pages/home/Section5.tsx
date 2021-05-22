import React from "react"
import { storeDetails } from "../../store"
import { observer } from "mobx-react"
import { mockData } from "../../assets/mock-data"
import moment from "moment"
import { isEmpty } from "lodash"
import 'moment/locale/he'

moment.locale('he');

const Section5 = () => {
  const linksData = storeDetails.storeData.links
  const thisMock = mockData.static.section5

  return (
    <div className="section">
          <hr className="liner" />
      <div className="main-container">
        <p className="heavy-text">{thisMock.subTitle}</p>
      </div>
      <div className="main-container">
        {!isEmpty(linksData) &&
          linksData.map((item: any, index: number) => {
            return (
              <div key={index}>
                <p className="medium-text">{item.title} - <a href={item.url}>{item.url}</a></p>
              </div>
            )
          })}
      </div>      
    </div>
  )
}

export default observer(Section5)
