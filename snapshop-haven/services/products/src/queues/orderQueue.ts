import {Queue} from 'bullmq';
import { RedisOptions } from 'ioredis';

const connection: RedisOptions ={
    host:'localhost',
    port:6379
}

export const orderQueue = new Queue('orderQueue', {connection});