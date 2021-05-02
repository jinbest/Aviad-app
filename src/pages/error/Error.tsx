import React from "react"
import { createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      textAlign: "center",
      padding: "30px 0",
    },
    title: {
      fontSize: "30px",
      padding: "0 50px 50px",
    },
  })
)

const Error = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>OOPS! YOU NEED TO INPUT HASHCODE TO RUN APP SUCCESSFULLY.</h1>
    </div>
  )
}

export default Error
