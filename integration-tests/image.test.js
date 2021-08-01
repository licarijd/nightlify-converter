import { convertImageToNightmode } from "../src/image"
import Jimp from 'jimp'

describe('Write image to file', () => {
    it('should convert an image to a nightmode friendly image and write it to a file', (done) => {
        const imageUrl = 'https://original-uploaded-images-dev.s3.ca-central-1.amazonaws.com/dev-1627756609448-images.jpeg'
        const newImageUrl = './integration-tests/data/newImage.png'
        const sampleNewImageUrl = './integration-tests/data/testImage.png'
        
        convertImageToNightmode(imageUrl, newImageUrl).then(_ => {
            Jimp.read(newImageUrl).then(image => {
                Jimp.read(sampleNewImageUrl).then(sampleImage => {
                    expect(image).toEqual(sampleImage)
                })
            }).then(_ => {
                done()
            })
        }).catch(err => {
            console.error(err)
        })
    })
})