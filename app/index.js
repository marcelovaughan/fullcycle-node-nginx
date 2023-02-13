const express = require('express')
const { queryPromise } = require('./queryPromise')

async function createApp() {
	const app = express()
	const sqlTable = `CREATE TABLE IF NOT EXISTS people(id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY(id))`;

	await queryPromise.query(sqlTable)

	// A cada vez que o seridor subir, um nome será sorteado e inserido no banco
	const names = ['Luke Skywalker', 'Darth Vader', 'Han Solo', 'Chewbacca', 'Leia Organa', 'Obi-Wan Kenobi', 'Yoda', 'R2-D2', 'C-3PO']
	const name_rnd = names[names.length * Math.random() | 0]

	const sqlInsert = `INSERT INTO people (name) VALUES ('${name_rnd}')`;

	await queryPromise.query(sqlInsert)

	app.get('/', async (req, res) => {
		const selectCharacters = `SELECT * FROM people`
		const allCharacters = await queryPromise.query(selectCharacters)

		const html = `
			<h1>Full Cycle Rocks!</h1>\n
			<ul>
				${allCharacters.map(character => `<li>${character.name}</li>`).join('')}
			</ul>
		`
		res.send(html)
	})
	return app
}

module.exports = createApp