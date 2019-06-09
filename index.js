let store = { drivers: [], passengers: [], trips: [] };

let driverId = 0;

class Driver {
	// has many trips
	// has many passengers through trips

	constructor(name) {
		this.id = ++driverId;
		this.name = name;

		store.drivers.push(this);
	}

	trips() {
    return store.trips.filter(trip => {
      return trip.driverId === this.id;
    });
  }

  passengers() {
  	return this.trips().map(trip => {
  		return trip.passenger();
  	})
  }
}

let passengerId = 0;

class Passenger {
	// has many trips
	// has many drivers through trips

	constructor(name) {
		this.id = ++passengerId;
		this.name = name;

		store.passengers.push(this);
	}

	drivers() {
		return this.trips().map(trip => {
			return trip.driver();
		})
	}

	setTrip(trip) {
		this.tripId = trip.id;
	}

	trips() {
		return store.trips.filter(
			function(trip) {
				return trip.passengerId === this.id;
			}.bind(this)
		);
	}
}

let tripId = 0

class Trip {
	// belongs to driver
	// belongs to passenger

	constructor(driver = undefined, passenger = undefined) {
		this.id = ++tripId;
		this.name = name;
		if (driver) {
			this.driverId = driver.id;
		}
		if (passenger) {
			this.passengerId = passenger.id;
		}

		store.trips.push(this);
	}

	setDriver(driver) {
		this.driverId = driver.id;
	}

	driver() {
		return store.drivers.find(
			function(driver) {
				return driver.id === this.driverId;
			}.bind(this)
		);
	}

	passenger() {
		return store.passengers.find(
			function(passenger) {
				return passenger.id === this.passengerId;
			}.bind(this)
		);
	}
}

