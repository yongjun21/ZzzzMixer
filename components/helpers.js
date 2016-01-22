/* Functions */

export function shuffledArr (arr) {
  const shuffled = []
  for (let i = arr.length; i > 0; i--) {
    shuffled.push(arr.splice(Math.floor(Math.random() * i), 1)[0])
  }
  return shuffled
}

/* Constants */

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

export const bubbleSizes = [1, 1, 1, 1, 1, 1, 1]
