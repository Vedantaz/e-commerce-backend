import Redis from 'ioredis';

const redis = new Redis({
    host: '127.0.0.1',
    port:6379
})

redis.on('connect', ()=>{console.log('redis connected!')});

redis.on('err', (err:any)=>{console.log('redis disconnected', err)});

export default redis;