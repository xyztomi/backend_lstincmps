const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // replace whitespace with -
    const sanitizedFileName = file.originalname.replace(/\s+/g, '-');
    cb(null, Date.now() + '-' + sanitizedFileName);
  }
});

const Upload = multer({ storage: storage });

module.exports = Upload;
