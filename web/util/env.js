// get variable of env
module.exports = (variable, initial) => {
  const env = process.env
  return env[variable] || initial
}
