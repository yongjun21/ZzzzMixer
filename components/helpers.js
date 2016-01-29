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

export const titleString = {
  '/library': 'Found anything you like?',
  '/compose': 'Ready to make some music',
  '/upload': 'One more step'
}

export const bgColors = [
  '#B08B0D',
  '#97282C',
  '#428F89',
  '#5F6024',
  '#805489'
]

export const bubbleStyles = [
  {
    WebkitTransform: 'translate(0, 50%) scale(1) rotate(-30deg)',
    transform: 'translate(0, 50%) scale(1) rotate(-30deg)'
  }, {
    WebkitTransform: 'translate(0, 150%) scale(1) rotate(-30deg)',
    transform: 'translate(0, 150%) scale(1) rotate(-30deg)'
  }, {
    WebkitTransform: 'translate(0, 250%) scale(1) rotate(-30deg)',
    transform: 'translate(0, 250%) scale(1) rotate(-30deg)'
  }, {
    WebkitTransform: 'translate(0, 350%) scale(1) rotate(-30deg)',
    transform: 'translate(0, 350%) scale(1) rotate(-30deg)'
  }, {
    WebkitTransform: 'translate(0, 450%) scale(1) rotate(-30deg)',
    transform: 'translate(0, 450%) scale(1) rotate(-30deg)'
  }, {
    WebkitTransform: 'translate(0, 550%) scale(1) rotate(-30deg)',
    transform: 'translate(0, 550%) scale(1) rotate(-30deg)'
  }, {
    WebkitTransform: 'translate(0, 650%) scale(1) rotate(-30deg)',
    transform: 'translate(0, 650%) scale(1) rotate(-30deg)'
  }
]

export const defaultBubbleStyle = {
  margin: '0 -0.4em 0 0',
  WebkitTransform: 'rotate(-30deg)',
  transform: 'rotate(-30deg)'
}

// Functions

export function shuffledArr (arr) {
  const shuffled = []
  for (let i = arr.length; i > 0; i--) {
    shuffled.push(arr.splice(Math.floor(Math.random() * i), 1)[0])
  }
  return shuffled
}
