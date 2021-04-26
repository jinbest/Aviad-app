import logoImg from "./img/logo.jpg"
import avatar from "./img/avatar.jpg"
import lazyLoader from "./img/loading.gif"

const mockData = {
  logo: logoImg,
  lazyLoader: lazyLoader,
  static: {
    section1: {
      subTitle: "אודות",
      avatar: avatar,
    },
    section2: {
      familyBgImg: "https://clarkebenefits.com/wp-content/uploads/2018/07/family-background.jpg",
      subTitle: "ארועים",
      subProfile: {
        title: "באירוח של",
        name: "יונתן ארנון",
        img: avatar
      }
    },
    section3: {
      morePicture: "לעוד תמונות",
      photos: "תמונות"
    },
    section4: {
      subTitle: "תגובות",
      liked: "אהבתי",
      addedComment: "הוסיף תגובה:",
      placeHolder: {
        comment: "כתבו תגובה חדשה",
        fullname: "כתבו שם מלא"
      }
    }
  }
}

export {
  mockData
}