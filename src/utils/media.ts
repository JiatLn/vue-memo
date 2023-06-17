export function loadMedia(url?: string) {
  if (!url)
    return
  const mp3 = new Audio(url)
  mp3.play()
}
