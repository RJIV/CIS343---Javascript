const express = require('express')
const app = express()
const port = 3000

app.set('port', process.env.PORT || 3000);
app.use(express.json());
var database = require('./programmers');

/* Returns all of the users in our database */
app.get('/', (req, res) => {
	res.send(database);
})

/* Returns the person from our database at index /:id */
app.get('/:id', (req, res) => {
	const id = req.params.id;
	let person = database[id];
	if (person != null){
		res.send(person);
	} else {
		res.sendStatus(404);
	}
});

/* Update the person in our database at index /:id */
app.put('/:id', (req, res) => {
	const id = req.params.id;

	const body = req.body;

	try {
		body.age = parseInt(body.age);
	} catch (e) {
		res.status(400).send("body.age must be a valid number").end();
	}
	if (body.firstName == null || typeof(body.firstName) != "string") {
		res.status(400).send("body.firstName must be a valid string").end();
	}
	else if (body.lastName == null || typeof(body.lastName) != "string") {
		res.status(400).send("body.lastName must be a valid string").end();
	}
	else if (body.age == null || typeof(body.age) != "number" || !Number.isInteger(body.age)) {
		res.status(400).send("body.age must be a valid number").end();
	}
	else if (body.role == null || typeof(body.role) != "string") {
		res.status(400).send("body.role must be a valid string").end();
	}
	else {
		let person = database[id];

		person.firstName = body.firstName;
		person.lastName = body.lastName;
		person.age = body.age;
		person.role = body.role;
		res.sendStatus(200).end();
	}
});


/** Create a new person for our database */
app.post('/', (req, res) => {

	const body = req.body;

	try {
		body.age = parseInt(body.age);
	} catch (e) {
		res.status(400).send("body.age must be a valid number").end();
	}

	if (body.firstName == null || typeof(body.firstName) != "string") {
		res.status(400).send("body.firstName must be a valid string").end();
	}
	else if (body.lastName == null || typeof(body.lastName) != "string") {
		res.status(400).send("body.lastName must be a valid string").end();
	}
	else if (body.age == null || typeof(body.age) != "number" || !Number.isInteger(body.age)) {
		res.status(400).send("body.age must be a valid number").end();
	}
	else if (body.role == null || typeof(body.role) != "string") {
		res.status(400).send("body.role must be a valid string").end();
	}
	else {
		database.push(body);
		res.sendStatus(200).end();
	}
});


app.listen(port, () => {
	console.log("App listening on port " + app.get('port'));
});

