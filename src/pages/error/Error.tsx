import React from "react"
import { createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      textAlign: "center",
      padding: "50px 10px",
    },
    title: {
      fontSize: "30px",
    },
  })
)

const Error = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>
        OOPS! YOU NEED TO INPUT HASHCODE IN THE LINK TO RUN APP SUCCESSFULLY.
      </h1>
    </div>
  )
}

export default Error