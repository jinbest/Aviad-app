import logoImg from "./img/logo.jpg"
import avatar from "./img/avatar.jpg"
import lazyLoader from "./img/loading.gif"
import submit from "./img/submit.png"

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
      photos: "תמונות",
      modal: {
        aboutPicture: "ספרו משהו על התמונה הזאת",
        datePhoto: "תאריך צילום",
        description: "תיאור ותאריך זהים לכל התמונות",
        raise: "העלאה",
        fromGallery: "מהגלריה"
      }
    },
    section4: {
      subTitle: "תגובות",
      liked: "אהבתי",
      addedComment: "הוסיף תגובה:",
      placeHolder: {
        comment: "כתבו תגובה חדשה",
        fullname: "כתבו שם מלא"
      },
      submit: submit
    }
  }
}

export {
  mockData
}