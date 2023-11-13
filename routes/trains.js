var express = require('express');
var router = express.Router();
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')

//var adapter = new FileSync('data/trains.json')
var db = {
	"trains": [
		{
			"name": "Hogwarts Express",
			"stops": [
				{
					"station": "Sycamore",
					"status": "ON-TIME",
					"arrival": "12:00pm",
					"departure": "12:10pm"
				},
				{
					"station": "Pine",
					"status": "ON-TIME",
					"arrival": "1:00pm",
					"departure": "1:10pm"
				}
			]
		},
		{
			"name": "Flying Scotsman",
			"stops": [
				{
					"station": "Pine",
					"status": "ON-TIME",
					"arrival": "12:00pm",
					"departure": "12:10pm"
				},
				{
					"station": "Sycamore",
					"status": "DELAYED",
					"arrival": "1:00pm",
					"departure": "1:10pm",
					"delayedArrival": "1:00pm",
					"delayedDeparture": "1:17pm"
				}
			]
		},
		{
			"name": "Orient Express",
			"stops": [
				{
					"station": "Sycamore",
					"status": "ON-TIME",
					"arrival": "12:00pm",
					"departure": "12:10pm"
				},
				{
					"station": "Cypress",
					"status": "DELAYED",
					"arrival": "1:00pm",
					"departure": "1:10pm",
					"delayedArrival": "1:07pm",
					"delayedDeparture": "1:17pm"
				}
			]
		},
		{
			"name": "Golden Arrow",
			"stops": [
				{
					"station": "Cypress",
					"status": "ON-TIME",
					"arrival": "12:00pm",
					"departure": "12:10pm"
				},
				{
					"station": "Pine",
					"status": "DELAYED",
					"arrival": "1:00pm",
					"departure": "1:10pm",
					"delayedArrival": "1:07pm",
					"delayedDeparture": "1:17pm"
				},
				{
					"station": "Hickory",
					"status": "DELAYED",
					"arrival": "1:00pm",
					"departure": "1:10pm",
					"delayedArrival": "1:07pm",
					"delayedDeparture": "1:17pm"
				}
			]
		}
	]
}

/* GET trains listing. */
router.get('/', function(req, res, next) {
  res.send(db.get('trains').sortBy('name').value());
});

module.exports = router;
