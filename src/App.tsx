import React, { useEffect, useState } from "react"
import AuthenticatedAPiClient from "./services/authenticated-api-client"
import { Provider, observer } from "mobx-react"
import Config from "./config/config"
import { storeDetails } from "./store"
import { hashCode } from "./const/token"
import { Preloader, Header } from "./components"
import { Home } from "./pages/home"
import "./assets/style/index.scss"

const App = () => {
  const apiClient = AuthenticatedAPiClient.getInstance()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadData()
    return () => {
      setLoading(false)
    }
  }, [])

  const loadData = async () => {
    const storeData = await apiClient.get<any>(`${Config.SERVICE_API_URL}page/${hashCode}`)
    storeDetails.setStoreData(storeData)
    setLoading(true)
  }

  return (
    <>
      {loading ? (
        <Provider storeDetails={storeDetails}>
          <div className="Container">
            <Header />
            <Home />
          </div>
        </Provider>
      ) : (
        <Preloader />
      )}
    </>
  )
}

export default observer(App)
