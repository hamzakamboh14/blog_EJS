const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'public/uploads/')
    },
    filename(req,file,cb){
        let ext = path.extname(file.originalname)
        cb(null,Date.now()+ext)
    }
})

const upload = multer({
    storage:storage,
    fileFilter(req,file,callback){
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/PNG" || file.mimetype == "image/JPG" || file.mimetype == "image/JPEG"){
            callback(null,true)
        }else{
            console.log('only png & jpg file supoorted!')
            callback(null,false)
        }
    },
    limits:{
        fileSize:1024 * 1024 * 2
    }
})

module.exports = upload