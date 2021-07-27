import Jimp from 'jimp'
import { pipe } from './utils'

const BRIGHTNESS_MULTIPLIER = -0.25
const CONTRAST_MULTIPLIER = 0.25

const reduceBrightness = image => {
    console.log(image)
    return image.brightness(BRIGHTNESS_MULTIPLIER)
}

const increaseContrast = image => {
    return image.contrast(CONTRAST_MULTIPLIER)
}

const nightmodeImage = () => [reduceBrightness, increaseContrast].reduce(pipe)

export const convertImageToNightmode = async (url, newImageUrl) => {
    const image = await Jimp.read(url)
    console.log(image)
    const newImage = nightmodeImage()(image)
    await newImage.writeAsync(newImageUrl)
}