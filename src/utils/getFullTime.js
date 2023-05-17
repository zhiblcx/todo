export function getFullTime(time) {
  let data;
  if (time) {
    data = new Date(time)
  } else {
    data = new Date()
  }
  const year = data.getFullYear()
  const month = data.getMonth() + 1
  const day = data.getDate()
  return year + '/' + month + '/' + day;
}