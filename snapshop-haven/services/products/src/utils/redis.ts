import Redis, {RedisOptions} from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const connection : RedisOptions = {
    host:process.env.REDIS_HOST,
    port : Number(process.env.REDIS_PORT),
    username:'default',
    password:process.env.REDIS_PASSWORD,
    tls:{}
}

const redis = new Redis(connection)

redis.on('connect', ()=>{console.log('redis connected!')});

redis.on('err', (err:any)=>{console.log('redis disconnected', err)});

redis.set("product:123", JSON.stringify({ name: "T-shirt", price: 20 }));
redis.get("product:123").then(console.log);

export default redis;