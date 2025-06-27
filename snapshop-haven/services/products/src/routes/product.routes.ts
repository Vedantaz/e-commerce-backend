import express, {Request, Response} from 'express';
import {Product} from '../models/Product';
const router = express.Router();
import {authenticateJWT} from '../../../../shared/middleware/authMiddleware'
import redis from '../utils/redis'
import upload from '../middleware/upload'

import Stripe from 'stripe';

const stripe = new Stripe('sk_test_...');

// checkout session for the stripe
router.post('/checkout', authenticateJWT, async (req, res) => {
  const { products } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: products.map((p: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: p.name,
        },
        unit_amount: p.price * 100,
      },
      quantity: p.qty,
    })),
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });

  res.json({ url: session.url });
});

// generate the cache key
const generateCacheKey = (query:any): string => {
    const {page=1, search='', category=''} =query;
    return `products:page=${page}:search=${search}:cat=${category}`
}

router.post(
    '/upload',
    authenticateJWT,
    upload.single('image'),
    async (req, res)=>{
        
        req.user?.role !== 'admin'?  res.status(403).json({message:'fordbidden'}) : res.status(403).json({message:'Access granted!'});
        const imageurl = req.file?.path;
        res.json({imageurl});
    }
);

// adding the middleware
router.post('/',authenticateJWT, async (req:Request, res:Response) =>{
    try{
        req.user?.role == 'customer' ? res.status(403).json({message:'Forbidden'}): res.status(201) ;
        const product = new Product(req.body);
        await product.save();
        await redis.flushall();    
        res.status(201).json(product);

    }catch(err){
        res.status(400).json({error:'Product creation failed'});
    }
})

// get all products
router.get('/', async(req, res) =>{
    // const products = await Product.find();
    // res.json(products);

    const {page=1, limit = 10, search = '', category = ''} = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    const cacheKey = generateCacheKey(req.query);

    const cached = await redis.get(cacheKey);
    cached ? res.json(JSON.parse(cached)) : 'Cached is coming null';
    
    const query: any = {};
    if (search) {
        query.name = { $regex: search, $options: 'i' };
    }
    if (category) {
        query.category = category;
    }
    const products = await Product.find(query)
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum);
    await redis.setex(cacheKey, 60, JSON.stringify(products));

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
    req.user?.role == 'customer' ? res.status(403).json({message:'Forbidden'}): res.status(204).json({message:"resource updated successfully."}) ;
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true});
    await redis.flushall();
    res.json(product);
});

// delete the product
router.delete('/delete-product/:id', authenticateJWT, async(req, res)=>{
     req.user?.role == 'customer' ? res.status(403).json({message:'Forbidden'}): res.status(204).json({message:"resource deleted successfully."})  ;
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

export default router;