import React, { useEffect, useState } from "react"
import { Section1, Section2, Section3, Section4 } from "."
import AuthenticatedAPiClient from "../../services/authenticated-api-client"
import { storeDetails } from "../../store"
import Config from "../../config/config"
import { Preloader, Header } from "../../components"
import { observer } from "mobx-react"

type Props = {
  hashCode: string
}

const Home = ({ hashCode }: Props) => {
  const apiClient = AuthenticatedAPiClient.getInstance()

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (hashCode) {
      loadData()
    }
  }, [])

  const loadData = async () => {
    const storeData = await apiClient.get<any>(`${Config.SERVICE_API_URL}page/${hashCode}`)
    storeDetails.setStoreData(storeData)
    storeDetails.setHashCode(hashCode)
    setLoaded(true)
  }

  return (
    <React.Fragment>
      {loaded ? (
        <>
          <Header />
          <div className="home">
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
          </div>
        </>
      ) : (
        <Preloader />
      )}
    </React.Fragment>
  )
}

export default observer(Home)
