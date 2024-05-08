import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/storage/imgs');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}.png`);
  }
})

export const upload = multer({ storage: storage });
