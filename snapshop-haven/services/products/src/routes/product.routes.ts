import express, {Request, Response} from 'express';
import {Product} from '../models/Product';
const router = express.Router();
import {authenticateJWT} from '../../../../shared/middleware/authMiddleware'

// adding the middleware
router.post('/',authenticateJWT, async (req:Request, res:Response) =>{
    try{
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);

    }catch(err){
        res.status(400).json({error:'Product creation failed'});
    }
})

// get all products
router.get('/', async(req, res) =>{
    const products = await Product.find();
    res.json(products);

});

// get single product 
router.get('/:id', async(req, res) =>{
    const product = await Product.findById(req.params.id);
    // if(!product) return res.status(404).json({"Product not found"});
    res.json(product);
});

// update the product
router.put('/:id',authenticateJWT, async(req, res)=>{
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json(product);
});

// delete the product
router.delete('/delete-product/:id', authenticateJWT, async(req, res)=>{
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

export default router;