const multer = require("multer"),
  randomNumber = require("../config/emailData").number(),
  storageVideo = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "source/video/") // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: (req, file, cb) => {
      cb(null, `${randomNumber}-${Date.now()}.mp4`) // cb 콜백함수를 통해 전송된 파일 이름 설정
    },
  }),
  uploadVideo = multer({ storage: storageVideo }),
  storageImg = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "source/images/") // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: (req, file, cb) => {
      cb(null, `${randomNumber}-${Date.now()}.jpeg`) // cb 콜백함수를 통해 전송된 파일 이름 설정
    },
  }),
  uploadImg = multer({ storage: storageImg })

module.exports = { uploadVideo, uploadImg }
