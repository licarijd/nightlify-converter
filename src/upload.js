import AWS from 'aws-sdk'
import { keys } from './s3AccessKeys';
import { config } from './s3.config'
import { sendEmail } from './emailUtils';
import { ORIGINAL_IMAGES_BUCKET } from './constants';

const S3Client = new AWS.S3()

S3Client.config.update({
    bucketName: ORIGINAL_IMAGES_BUCKET,
    region: config.region,
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
})

export const uploadConvertedFileToS3 = (file, key, email) => {
    const params = {
        Bucket: config.bucketName,
        Key: key,
        Body: file,
        ACL: 'public-read'
        //ContentType: image.mimetype
      };

      return S3Client.upload(params, async (err, data) => {
        if (err) {
            console.log(err)
            return err
        }
        sendEmail(email, data.Location)
        return data
      })
}

export const getFileFromS3 = async (key, bucket) => {
    try {
        const params = {
            Bucket: bucket,
            Key: key 
        }
    
        const data = await S3Client.getObject(params).promise();
    
        return data.Body
    } catch (e) {
        throw new Error(`Could not retrieve file from S3: ${e.message}`)
    }
}