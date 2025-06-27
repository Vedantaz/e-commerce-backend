import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary';

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
    return {
      folder: 'products',
      allowed_formats: ['jpg', 'png'],
    };
  },

});

const upload = multer({storage})
export default upload;