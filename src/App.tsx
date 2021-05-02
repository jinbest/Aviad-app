import React, { useEffect, useState } from "react"
import { Provider, observer } from "mobx-react"
import { storeDetails } from "./store"
import "./assets/style/index.scss"
import BaseRouter from "./BaseRouter"
import { BrowserRouter as Router } from "react-router-dom"

const App = () => {
  const [hashCode, setHashCode] = useState("")

  useEffect(() => {
    const href = window.location.href,
      hash = href.split("/")[href.split("/").length - 1],
      code = hash ? hash.split("?")[1] : ""
    setHashCode(code)
  }, [])

  return (
    <Provider storeDetails={storeDetails}>
      <div className="Container">
        <Router>
          <BaseRouter hashCode={hashCode} />
        </Router>
      </div>
    </Provider>
  )
}

export default observer(App)
