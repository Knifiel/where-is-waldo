export function millisecondsToTime(s: number) {
  var pad = (n: any, z = 2) => ('00' + n).slice(-z)
  return (
    pad((s / 3.6e6) | 0) +
    ':' +
    pad(((s % 3.6e6) / 6e4) | 0) +
    ':' +
    pad(((s % 6e4) / 1000) | 0) +
    '.' +
    pad(s % 1000, 3)
  )
}
