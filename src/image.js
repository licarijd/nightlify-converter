import Jimp from 'jimp'
import { pipe } from './utils'

const BRIGHTNESS_MULTIPLIER = -0.25
const CONTRAST_MULTIPLIER = 0.25

const reduceBrightness = image => {
    return image.brightness(BRIGHTNESS_MULTIPLIER)
}

const increaseContrast = image => {
    return image.contrast(CONTRAST_MULTIPLIER)
}

const nightmodeImage = () => [reduceBrightness, increaseContrast].reduce(pipe)

export const convertImageToNightmode = async (url, watermark) => {
    const image = await Jimp.read(url)
    let newImage = nightmodeImage()(image)

    if (watermark) {
        const watermarkImage = await Jimp.read(watermark)
        const scaledWatermarkImage = watermarkImage.scale(0.1)
        newImage = await addWatermark(image, scaledWatermarkImage)
    }

    return newImage.getBufferAsync(Jimp.AUTO)
}

export const addWatermark = async (image, watermarkImage) => {
    return await image.composite(watermarkImage, 0, 0)
}