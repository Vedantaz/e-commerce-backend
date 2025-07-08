import {Queue} from 'bullmq';
import  Redis from '../utils/redis'

export const orderQueue = new Queue('orderQueue', {connection: Redis});

export async function addOrderToQueue(order:any){
    try{
        await orderQueue.add('newOrder', order);
        console.log('Order added to queue: ', order);
    }catch(err){
        console.error('Failed to add order to queue: ', err);
    }
}
