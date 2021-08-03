import AWS from 'aws-sdk'
import { keys } from './s3AccessKeys';
import { config } from './s3.config'

const S3DownloadClient = new AWS.S3()

S3DownloadClient.config.update({
    bucketName: 'original-uploaded-images-dev',
    region: config.region,
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
})

export const uploadConvertedFileToS3 = (file, key) => {
    const params = {
        Bucket: config.bucketName,
        Key: key,
        Body: file,
        ACL: 'public-read'
        //ContentType: image.mimetype
      };

      S3DownloadClient.upload(params, async (err, data) => {
        if (err) {
            console.log(err)
            return err
        }
        console.log(data)
        return data
      })
}

export const getFileFromS3 = async (key, bucket) => {
    try {
        const params = {
            Bucket: bucket,
            Key: key 
        }
    
        const data = await S3DownloadClient.getObject(params).promise();
    
        return data.Body
    } catch (e) {
        throw new Error(`Could not retrieve file from S3: ${e.message}`)
    }
}