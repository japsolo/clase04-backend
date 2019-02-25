const express = require('express');
const faker = require('faker');
const fs = require('fs');
const path = require('path');

const app = express();

let students = [];

for (var i = 1; i <= 35; i++) {
	students.push({
		id: i,
		name: faker.name.firstName(),
		lastName: faker.name.lastName(),
		address: faker.address.streetAddress(),
		avatar: faker.image.imageUrl()
	});
}

app.listen(3030, function () {
	console.log('Listening de port: 3030');
});

// Damos acceso a la carpeta public para aquellos archivos estáticos
app.use('/public', express.static(path.join(__dirname, '/public')));

// Routeo de mi app
app.get('/', function (req, res) {
	res.send('Esta es la home');
});

app.get('/about', function (req, res) {
	let pathToAbout = path.join(__dirname, '/pages/about.html');
	let aboutHTML = fs.readFileSync(pathToAbout, 'utf-8');
	res.send(aboutHTML);
});

app.get('/api', function (req, res) {
	res.json(students);
});

app.get('/student-detail/:id', function (req, res) {
	let idOnUrl = Number(req.params.id);
	for (let student of students) {
		if (idOnUrl === student.id) {
			return res.json(student);
		}
	}
	return res.send('No se encontró el estudiante');
});
