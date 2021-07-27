import { convertImageToNightmode } from "../src/image"
import Jimp from 'jimp'

describe('Write image to file', () => {
    it('should convert an image to a nightmode friendly image and write it to a file', (done) => {
        const imageUrl = './integration-tests/data/smwmelephants3-4.png'
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