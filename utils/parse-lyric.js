export function parseLyric(lyrics) {
  const result = []
  const regExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
  lyrics = lyrics.split("\n")
  for (const item of lyrics) {
    if(!item) continue
    const matchRes = regExp.exec(item)
    const miniute = matchRes[1]
    const second = matchRes[2]
    const ms = matchRes[3].length === 3 ? matchRes[3] * 1 : matchRes[3] * 10
    const time = miniute * 60 * 1000 + second * 1000 + ms
    const text = item.replace(matchRes[0], "")
    result.push({ time, text })
  }
  return result
}