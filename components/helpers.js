// Constants
export const tagNames = [
  'Nature',
  'Urban',
  'Sea',
  'Weather',
  'Instrumental',
  'Vocal',
  'New age',
  'White noise'
]

export const sampleNames = [
  'Rain',
  'Thunder',
  'Waves',
  'Wind',
  'Fire',
  'Birds',
  'Crickets',
  'Coffee shop',
  'Singing bowl',
  'White noise'
]

export const sampleFileNames = [
  'rain',
  'thunder',
  'waves',
  'wind',
  'fire',
  'birds',
  'crickets',
  'coffeeshop',
  'singingbowl',
  'whitenoise'
]

export const bgColors = [
  '#B08B0D',
  '#97282C',
  '#428F89',
  '#5F6024',
  '#805489'
]

export const bubbleSizes = [1, 1, 1, 1, 1, 1, 1]

export const bubbleTransform = [
  {WebkitTransform: 'scale(2) translate(1, 2) rotate(-30deg)',
  transform: 'scale(2) transform(1, 2) rotate(-30deg)'},
  {},
  {},
  {},
  {},
  {},
  {}
]

// Functions

export function shuffledArr (arr) {
  const shuffled = []
  for (let i = arr.length; i > 0; i--) {
    shuffled.push(arr.splice(Math.floor(Math.random() * i), 1)[0])
  }
  return shuffled
}
