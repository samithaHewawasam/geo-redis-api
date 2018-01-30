var redis = require('redis'),
    client = redis.createClient()

var geo = require('georedis').initialize(client)

geo.addLocation('Toronto', {latitude: 43.6667, longitude: -79.4167}, function(err, reply){
  if(err) console.error(err)
  else console.log('added location:', reply)
})

geo.location('Toronto', function(err, location){
  if(err) console.error(err)
  else console.log('Location for Toronto is: ', location.latitude, location.longitude)
})

var options = {
  withCoordinates: true, // Will provide coordinates with locations, default false
  withHashes: true, // Will provide a 52bit Geohash Integer, default false
  withDistances: true, // Will provide distance from query, default false
  order: 'ASC', // or 'DESC' or true (same as 'ASC'), default false
  units: 'm', // or 'km', 'mi', 'ft', default 'm'
  count: 100, // Number of results to return, default undefined
  accurate: true // Useful if in emulated mode and accuracy is important, default false
}

// look for all points within ~5000m of Toronto.
geo.nearby({latitude: 43.646838, longitude: -79.403723}, 5000, options, function(err, locations){
  if(err) console.error(err)
  else console.log('nearby locations:', locations)
})
