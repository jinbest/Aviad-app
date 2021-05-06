import React, { useEffect, useState } from "react"
import { Section1, Section2, Section3, Section4 } from "."
import AuthenticatedAPiClient from "../../services/authenticated-api-client"
import { storeDetails } from "../../store"
import Config from "../../config/config"
import { Preloader, Header, Footer } from "../../components"
import { observer } from "mobx-react"

type Props = {
  hashCode: string
}

const Home = ({ hashCode }: Props) => {
  const apiClient = AuthenticatedAPiClient.getInstance()

  const [loaded, setLoaded] = useState(false)
  const [isanon, setIsaNan] = useState(false)

  useEffect(() => {
    if (hashCode) {
      loadData()
    }
  }, [])

  const loadData = async () => {
    const storeData = await apiClient.get<any>(`${Config.SERVICE_API_URL}page/${hashCode}`)
    const systemInfo = await apiClient.get<any>(`${Config.SERVICE_API_URL}system/info`)
    storeDetails.setStoreData(storeData)
    storeDetails.setHashCode(hashCode)
    storeDetails.setSystemInfo(systemInfo)
    setIsaNan(storeData.isanon)
    setLoaded(true)
  }

  return (
    <React.Fragment>
      {loaded ? (
        <div style={{minHeight: '100vh'}}>
          <Header />
          <div className="home">
            {!isanon && <Section1 />}
            <Section2 />
            {!isanon && <Section3 />}
            {!isanon && <Section4 />}
          </div>
          <Footer />
        </div>
      ) : (
        <Preloader />
      )}
    </React.Fragment>
  )
}

export default observer(Home)
