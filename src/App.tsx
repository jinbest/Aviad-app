import React, { useEffect, useState } from "react"
import AuthenticatedAPiClient from "./services/authenticated-api-client"
import { Provider, observer } from "mobx-react"
import Config from "./config/config"
import { storeDetails } from "./store"
import { Preloader, Header } from "./components"
import { Home } from "./pages/home"
import { Error } from "./pages/error"
import "./assets/style/index.scss"

const App = () => {
  const apiClient = AuthenticatedAPiClient.getInstance()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const href = window.location.href,
      hashCode = href.split("/")[href.split("/").length - 1]
    if (hashCode) {
      loadData(hashCode)
    } else {
      setError(true)
      setLoading(true)
    }
    return () => {
      setLoading(false)
    }
  }, [])

  const loadData = async (hashCode: string) => {
    const storeData = await apiClient.get<any>(`${Config.SERVICE_API_URL}page/${hashCode}`)
    storeDetails.setStoreData(storeData)
    storeDetails.setHashCode(hashCode)
    setLoading(true)
  }

  return (
    <>
      {loading ? (
        <Provider storeDetails={storeDetails}>
          <div className="Container">
            <Header />
            {!error ? <Home /> : <Error />}
          </div>
        </Provider>
      ) : (
        <Preloader />
      )}
    </>
  )
}

export default observer(App)
