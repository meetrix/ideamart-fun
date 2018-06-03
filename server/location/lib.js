const mapLocation = (lon,lat) => {

  return `https://www.google.lk/maps/@${lon},${lat}`
}
module.exports = {
  mapLocation,
}
