import React from "react"
import { storeDetails } from "../../store"
import { observer } from "mobx-react"
import { mockData } from "../../assets/mock-data"
import moment from "moment"
// import _ from "lodash"
// import FavoriteIcon from "@material-ui/icons/Favorite"

const Section4 = () => {
  const thisPage = storeDetails.storeData.comments
  const thisMock = mockData.static.section4

  // const [liked, setLiked] = useState<any[]>([])

  // useEffect(() => {
  //   const tmpLiked = new Array(thisPage.length).fill(false)
  //   setLiked([..._.cloneDeep(tmpLiked)])
  // }, [])

  // const handleLike = (index: number) => {
  //   liked[index] = !liked[index]
  //   setLiked([...liked])
  // }

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
              {/* <div
                className="commented-liked"
                style={{ background: liked[index] ? "#efd2c2" : "#fdf6f8" }}
                onClick={() => {
                  handleLike(index)
                }}
              >
                <FavoriteIcon
                  className="fav-icon"
                  style={{ color: liked[index] ? "#fdf6f8" : "#efd2c2" }}
                />
                <p className="medium-text">{thisMock.liked}</p>
              </div> */}
            </div>
          )
        })}
        <div className="comment-card">
          <textarea placeholder={thisMock.placeHolder.comment} />
          <hr className="comment-liner" />
          <div className="d-flex space-between">
            <button>POST</button>
            <input placeholder={thisMock.placeHolder.fullname} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(Section4)
