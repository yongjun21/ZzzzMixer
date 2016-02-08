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
  '/library': 'Found anything interesting?',
  '/compose': 'Ready to make some music?',
  '/upload': 'One more step...'
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
    WebkitTransform: 'translate(160%, 450%) scale(3) rotate(-20deg)',
    transform: 'translate(160%, 450%) scale(3) rotate(-20deg)'
  }, {
    WebkitTransform: 'translate(-120%, 560%) scale(2.5) rotate(0deg)',
    transform: 'translate(-120%, 560%) scale(2.5) rotate(0deg)'
  }, {
    WebkitTransform: 'translate(60%, 180%) scale(2.5) rotate(30deg)',
    transform: 'translate(60%, 180%) scale(2.5) rotate(30deg)'
  }, {
    WebkitTransform: 'translate(-70%, 350%) scale(1.5) rotate(10deg)',
    transform: 'translate(-70%, 350%) scale(1.5) rotate(10deg)'
  }, {
    WebkitTransform: 'translate(-180%, 190%) scale(2) rotate(-30deg)',
    transform: 'translate(-180%, 190%) scale(2) rotate(-30deg)'
  }, {
    WebkitTransform: 'translate(250%, 250%) scale(1.2) rotate(-30deg)',
    transform: 'translate(250%, 250%) scale(1.2) rotate(-30deg)'
  }, {
    WebkitTransform: 'translate(-240%, 370%) scale(1.6) rotate(20deg)',
    transform: 'translate(-240%, 370%) scale(1.6) rotate(20deg)'
  }, {
    WebkitTransform: 'translate(60%, 650%) scale(1.2) rotate(-30deg)',
    transform: 'translate(60%, 650%) scale(1.2) rotate(-30deg)'
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
