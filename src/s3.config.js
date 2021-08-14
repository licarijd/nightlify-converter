import { DEV_CONVERTED_IMAGES_BUCKET, PROD_CONVERTED_IMAGES_BUCKET } from "./constants";

export const config = {
    bucketName: process.env.NODE_ENV == 'production' ? PROD_CONVERTED_IMAGES_BUCKET : DEV_CONVERTED_IMAGES_BUCKET,
    // dirName: 'photos', /* optional */
    region: 'ca-central-1'
    // s3Url: 'https://my-s3-url.com/', /* optional */
}