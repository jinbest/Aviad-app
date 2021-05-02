import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./pages/home"
import { Error } from "./pages/error"

type Props = {
  hashCode: string
}

const BaseRouter = ({ hashCode }: Props) => {
  return (
    <>
      <Route path="/" exact component={() => <Error />} />
      <Route path="/hash" component={() => <Home hashCode={hashCode} />} />
    </>
  )
}

export default BaseRouter
