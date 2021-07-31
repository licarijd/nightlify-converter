import RabbitMQClient from 'node-rabbitmq-client'
import { host, port, username, password } from './rabbitMq.config'
import "regenerator-runtime/runtime"

/*
    - options.findServers(callback) is a function which returns one or more servers to connect to. This should return either a single URL or an array of URLs. This is handy when you're using a service discovery mechanism such as Consul or etcd. Instead of taking a callback, this can also return a Promise. Note that if this is supplied, then urls is ignored.
        findServers,
    - options.connectionOptions is passed as options to the amqplib connect method.
        connectionOptions
*/
export const config = {
    scheme: 'amqps',
    host, // Eg. j-sd8f7d8f7-sfsd-4444-d444-sfsdfdfd.mq.ca-central-1.amazonaws.com (no amqps://)
    port,
    username,
    password,
    prefetch: process.env.PREFETCH_JOBS || 2,
    vhost: process.env.VHOST || '/',
    heartbeatInterval: process.env.HEARTBEAT || 5,
    reconnectTime: process.env.RECONNECT_TIME || 10,
    protocol: process.env.RABBITMQ_PROTOCOL || 'amqps',
    defaultQueueFeatures: { durable: true },
    options: {
        ssl_on: true,
        ssl_verify: true
    }
}
const RABBITMQ_QUEUE = 'image-conversion-job-broker'
const client = new RabbitMQClient(config)

client.consume({ queue: { name: RABBITMQ_QUEUE } }, (message, options) => {
    const { key, bucket } = message
    console.log(key)
    console.log(bucket)
    return Promise.resolve(key)
})