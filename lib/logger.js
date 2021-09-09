function buildObjectLog(obj) {
  if (!Object.keys(obj).length) return 'None'
  const values = []
  for (const key in obj) {
    values.push([key, obj[key]])
  }
  return values.reduce((str, curr) => {
    const [key, value] = curr
    return str + `    ${key}: ${value} \n`
  }, '{ \n') + '}'
}

export default function logger(req, _res, next) {
  console.log(`--------------------------------
(^_^) INCOMING REQUEST!
(^_^) Request Method: ${req.method}
(^_^) Request URl: ${req.url}
('_') Request Headers: ${buildObjectLog(req.headers)}
('_') Request Body: ${buildObjectLog(req.body)}
('_') Request Query: ${buildObjectLog(req.query)}
--------------------------------`)

  next()
}
