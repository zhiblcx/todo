export function getFullTime(timer = new Date()) {
  const year = getYearTimer(timer)
  const month = getMonthTimer(timer)
  const day = getDateTimer(timer)
  return year + '/' + month + '/' + day
}

export function getYearTimer(timer = new Date()) {
  return timer.getFullYear()
}

export function getMonthTimer(timer = new Date()) {
  return timer.getMonth() + 1
}

export function getDateTimer(timer = new Date()) {
  return timer.getDate()
}

export function getHourTimer(timer = new Date()) {
  return timer.getHours()
}

export function getMinutesTimer(timer = new Date()) {
  return timer.getMinutes()
}

export function getSecondTimer(timer = new Date()) {
  return timer.getSeconds()
}

export function getTimer(timer = new Date()) {
  const hour = getHourTimer(timer) < 10 ? '0' + getHourTimer() : getHourTimer()
  const minute = getMinutesTimer(timer) < 10 ? '0' + getMinutesTimer() : getMinutesTimer()
  const second = getSecondTimer(timer) < 10 ? '0' + getSecondTimer() : getSecondTimer()
  return hour + ':' + minute + ':' + second
}

export function getFirstDayOfWeek(timer = new Date()) {
  const dayOfWeek = timer.getDay()
  const difference = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  const firstDayOfWeek = new Date(timer.getFullYear(), timer.getMonth(), timer.getDate() + difference)
  return getFullTime(firstDayOfWeek)
}

export function getLastDayOfWeek(timer = new Date()) {
  const dayOfWeek = timer.getDay()
  const difference = dayOfWeek === 0 ? 0 : 7 - dayOfWeek
  const lastDayOfWeek = new Date(timer.getFullYear(), timer.getMonth(), timer.getDate() + difference)
  return getFullTime(lastDayOfWeek)
}
