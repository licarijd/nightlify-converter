import S3 from 'aws-s3';
import AWS from 'aws-sdk'
import { config } from './s3.config'

const S3UploadClient = new S3(config)
const S3DownloadClient = new AWS.S3()
S3DownloadClient.config.update({
    bucketName: 'original-uploaded-images-dev',
    region: config.region,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
})

export const uploadToS3 = async (file, fileName) => {
    return await S3UploadClient
        .uploadFile(file, fileName)
        .then(data => {
            console.log(data)
            return data
        })
        .catch(err => {
            console.error(err)
            return err
        })
    
    /**
     * {
     *   Response: {
     *     bucket: "your-bucket-name",
     *     key: "photos/image.jpg",
     *     location: "https://your-bucket.s3.amazonaws.com/photos/image.jpg"
     *   }
     * }
     */
}



export const uploadConvertedFileToS3 = (file, key) => {
    const params = {
        Bucket: config.bucketName,
        Key: key,
        Body: file,
        //ContentType: image.mimetype,
        ACL: 'public-read'
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
    
        return data.Body//.toString('utf-8');
    } catch (e) {
        throw new Error(`Could not retrieve file from S3: ${e.message}`)
    }
}