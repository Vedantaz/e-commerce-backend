import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary';

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req:any, file:any) => {
    return {
      folder: 'products',
      allowed_formats: ['jpg', 'png'],
      public_id: (req:any, file:any) => Date.now().toString(), // Optional naming
    };
  },
});

const upload = multer({storage})
export default upload;