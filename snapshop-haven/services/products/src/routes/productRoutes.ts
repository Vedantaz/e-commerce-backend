import express from 'express';
import { Product } from '../models/Product';
import {authenticateJWT} from '../../../../shared/middleware/authentication'
import upload from '../middleware/upload'
const router = express.Router();

console.log('product routes file is loaded..');

// all routes   
router.post('/add-product', authenticateJWT,upload.single('image') ,async(req, res)=>{
    console.log("Inside /add-product handler");
    try{
        const product = new Product(req.body);
        await product.save();
        // res.status(200).json({ message: 'It works!' });
        res.status(201).json(product);
    }catch(err){
        console.log(err);
        res.status(400).json({ error: 'Failed to create product' });
    }
})

router.get('/get-all-products', async(req, res)=>{
    // get all products
    console.log('getting all products')
    const products = await Product.find();
    res.json(products);
})

// get a single product with id
router.get('/get-product/:id', async(req, res)=>{
    console.log('get-product runing api');
    const product = await Product.findById(req.params.id);
    if (!product) { res.status(404).json({ error: 'Product not found' }); return;}
    res.json(product);
})

// update the product
router.put('/update-product/:id',authenticateJWT, (req, res, next) => {
  console.log("Passed auth, going into multer...");
  next();
},upload.single('image') ,async(req, res, next)=>{
    console.log("File upload success. Proceeding...");
    try{
        const {id} = req.params;

        // building update object
        const updateField:any = {...req.body};
        if(req.file){
            updateField.image = req.file.filename;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateField,
            {new:true}
        )
       
        if (!updatedProduct) {res.status(404).json({ error: 'Product not found' }); return;}
        res.json(updatedProduct);
    }catch(err){
        console.error(err);
        res.status(400).json({ error: 'Failed to update product' });}
})

// delete product
router.delete('/delete-product/:id',authenticateJWT ,async(req, res)=>{
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).send();
})

export default router;