import {Worker} from 'bullmq';

new Worker(
    'orderQueue',
    async (job)=>{
        console.log('Processing job: ', job.name, job.data);

    },
    {
        connection:{
            host:'localhost',
            port:6379
        }
    }

);