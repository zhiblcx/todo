export const countTotalSecond = (oldTime, startTime) => {
  return (
    parseInt(oldTime.split(':')[0] * 60 * 60) +
    parseInt(oldTime.split(':')[1] * 60) +
    parseInt(oldTime.split(':')[2]) +
    parseInt((new Date().getTime() - new Date(startTime).getTime()) / 1000)
  )
}
