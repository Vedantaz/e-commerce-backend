import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name:'your_cloud_name',
    cloud_key: '',
    api_secret:''
})

export default cloudinary.v2;