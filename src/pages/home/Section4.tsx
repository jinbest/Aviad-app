import React, { useState } from "react"
import { storeDetails } from "../../store"
import { observer } from "mobx-react"
import { mockData } from "../../assets/mock-data"
import moment from "moment"
import { ToastMsgParams } from "../../components/toast/toast-msg-params"
import Toast from "../../components/toast/toast"
import Config from "../../config/config"
import Notification from "../../const/notification"
import AuthenticatedAPiClient from "../../services/authenticated-api-client"
import { hashCode } from "../../const/token"
import DcSpinner from "../../components/dc-spinner"

const Section4 = () => {
  const apiClient = AuthenticatedAPiClient.getInstance()

  const thisPage = storeDetails.storeData.comments
  const thisMock = mockData.static.section4

  const [fullname, setFullName] = useState("")
  const [comment, setComment] = useState("")
  const [toastParams, setToastParams] = useState<ToastMsgParams>({} as ToastMsgParams)
  const [submited, setSubmitted] = useState(false)

  const resetStatuses = () => {
    setToastParams({
      msg: "",
      isError: false,
      isWarning: false,
      isInfo: false,
      isSuccess: false,
    })
  }

  const handleSubmit = async () => {
    setSubmitted(true)
    if (fullname && comment) {
      let msg = Notification.SUCCESS_MSG
      let failed = false
      try {
        await apiClient.post(`${Config.SERVICE_API_URL}page/comment/request`, {
          name: fullname,
          comment: comment,
          hash: hashCode,
        })
      } catch (error) {
        msg = Notification.FAILED_RUQUEST
        failed = true
      } finally {
        setToastParams({
          msg,
          isError: failed,
          isSuccess: !failed,
        })
        setFullName("")
        setComment("")
      }
    } else {
      setToastParams({
        msg: Notification.FAILED_MSG,
        isError: true,
      })
    }
    setSubmitted(false)
  }

  return (
    <div className="section">
      <div className="main-container">
        <p className="heavy-text">{thisMock.subTitle}</p>
      </div>
      <div className="main-container">
        {thisPage.map((item: any, index: number) => {
          return (
            <div className="comment-card" key={index}>
              <p className="heavy-text">{`${item.name} ${thisMock.addedComment}`}</p>
              <p className="normal-text">{item.comment}</p>
              <p className="mid-text" style={{ marginTop: "20px" }}>
                {`${moment(item.created).format("hh:mm")} - ${moment(item.created).fromNow()}`}
              </p>
              <hr className="comment-liner" />
            </div>
          )
        })}
        <div className="comment-card">
          <textarea
            placeholder={thisMock.placeHolder.comment}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value)
            }}
          />
          <hr className="comment-liner" />
          <div className="d-flex space-between align-center">
            <div onClick={handleSubmit} className="submit">
              <img src={thisMock.submit} alt="submit-img" />
            </div>
            <input
              placeholder={thisMock.placeHolder.fullname}
              value={fullname}
              onChange={(e) => {
                setFullName(e.target.value)
              }}
            />
          </div>
        </div>
      </div>
      <Toast params={toastParams} resetStatuses={resetStatuses} />
      <DcSpinner show={submited} />
    </div>
  )
}

export default observer(Section4)
