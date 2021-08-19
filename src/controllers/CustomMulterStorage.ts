import multer from 'multer'

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'storage/images/')
  },
  filename: function (req, file, cb) {
    const id = Date.now() + file.originalname
    cb(null, id)
  }
})
