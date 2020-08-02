
function getYear () {
  let today = new Date()
  let year = today.getFullYear()
  let month = today.getMonth() + 1
  return `${(year - 1912) + (month >= 8 ? 1 : 0)}`
}

// 回傳學期字串(e.g. 107-1)
function getSemester () {
  let today = new Date()
  let year = today.getFullYear()
  let month = today.getMonth() + 1
  return ((year - 1912) + (month >= 8 ? 1 : 0)) + '-' + ((month >= 8 || month === 1) ? '1' : '2')
}

function semesterToChinese (semester) {
  const mapping = {
    '1': '上',
    '2': '下',
    '3': '暑'
  }
  const arr = semester.split('-')
  return `${arr[0]}${mapping[arr[1]]}`
}

function getTimestamp () {
  let today = new Date()
  let year = today.getFullYear()
  let month = today.getMonth() + 1
  let date = today.getDate()
  let hour = today.getHours()
  let minute = today.getMinutes()
  return year + '/' + month + '/' + date + '  ' + hour + ':' + minute
}

function base64encode (file) {
  return new Promise((resolve, reject) => {
    if (!file)  reject('no file selected')
    const reader = new window.FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export {
  getYear,
  getSemester,
  semesterToChinese,
  getTimestamp,
  base64encode
}
