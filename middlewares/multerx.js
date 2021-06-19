const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: 'public/images',
  filename: function(req, file, cb){
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {fileSize: 1000000},
  fileFilter: function(req, file, cb){
    cekFileType(file, cb);
  }

}).single('image');

function cekFileType(file, cb){
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());
  const mimeType = fileTypes.test(file.mimeType);
  if(mimeType && extname) {
    cb(null, true);
  }else{
    cb('error: image only !!!');
  }
}

module.exports = {upload};
