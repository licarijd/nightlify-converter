import Jimp from 'jimp'
import { pipe } from './utils'

const BRIGHTNESS_MULTIPLIER = -0.5
const CONTRAST_MULTIPLIER = 0.5

const reduceBrightness = async imageUrl => {
    const image = await Jimp.read(imageUrl)
    return image.brightness(BRIGHTNESS_MULTIPLIER)
}

const increaseContrast = async imageUrl => {
    const image = await Jimp.read(imageUrl)
    return image.contrast(CONTRAST_MULTIPLIER)
}

export const nightmodeImage = () => [reduceBrightness, increaseContrast].reduce(pipe)