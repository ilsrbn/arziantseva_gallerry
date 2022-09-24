function isSafari () {
  if (process.browser) {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  }
  return false
}
export default function (date, options = null) {
  if (!date) { return '' }
  let dateval = date
  if (typeof date === 'object') {
    dateval = date._i
  }
  if (isSafari()) {
    return dateval.replace(/-/g, '/')
  }
  const defaultOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }
  return Intl.DateTimeFormat('en-GB', options || defaultOptions).format(
    new Date(date)
  )
}
