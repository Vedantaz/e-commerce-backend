import express from 'express'
import multer from 'multer'
import fs from 'fs'
import * as path from 'path'

const app = express()

// multer storage //

const uploadDir = path.join(process.cwd(), 'uploads');
const storage = multer.diskStorage({
  destination : (req, file, cb) => {
    fs.mkdirSync(uploadDir, {recursive:true});
    cb(null, uploadDir)
  },
  filename:(req, file, cb) => {
    cb(null, `${file.originalname}`)
  }
})

const upload = multer({storage});
export default upload;


// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from '../utils/cloudinary';

// for cloudinary storage
// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: async (req:any, file:any) => ({
//       folder:'products/images',
//       // use filename + extension from original file
//       format:file.mimetype.split('/')[1], // auto derive jpg/png
//       public_id : `${Date.now()}-${file.originalname.split('.')[0]}`,
//       resource_type:'image'
//     })
// });




// const upload = multer({storage,
//   fileFilter : (req, file, cb)=>{
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
//     if(!allowedTypes.includes(file.mimetype)){
//       return cb(new Error('Only JPEG and PNG files are allowed'));

//     }
//     cb(null, true);
//   },
//    limits: {
//     fileSize: 2 * 1024 * 1024, // Max 2MB
//   },
// })