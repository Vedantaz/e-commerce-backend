import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary';

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req:any, file:any) => ({
      folder:'products/images',
      // use filename + extension from original file
      // public_id : `${Date.now()}-${file.originalname.split('.')[0]}`,
      format:file.mimetype.split('/')[1], // auto derive jpg/png
      resource_type:'image'
    })
});

const upload = multer({storage,
  fileFilter : (req, file, cb)=>{
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if(!allowedTypes.includes(file.mimetype)){
      return cb(new Error('Only JPEG and PNG files are allowed'));

    }
    cb(null, true);
  },
   limits: {
    fileSize: 2 * 1024 * 1024, // Max 2MB
  },
})
export default upload;