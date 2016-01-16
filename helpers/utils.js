export function shuffledArr (arr) {
  const shuffled = []
  for (let i = arr.length; i > 0; i--) {
    shuffled.push(arr.splice(Math.floor(Math.random() * i), 1)[0])
  }
  return shuffled
}
