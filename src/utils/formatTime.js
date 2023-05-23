export const formatTime = (totalSecond) => {
  const hour =
    parseInt(totalSecond / 60 / 60) < 10 ? '0' + parseInt(totalSecond / 60 / 60) : parseInt(totalSecond / 60 / 60)
  const minute =
    parseInt((totalSecond / 60) % 60) < 10 ? '0' + parseInt((totalSecond / 60) % 60) : parseInt((totalSecond / 60) % 60)
  const second = parseInt(totalSecond % 60) < 10 ? '0' + parseInt(totalSecond % 60) : parseInt(totalSecond % 60)
  return hour + ':' + minute + ':' + second
}
