const knex = require('knex')({
    client: 'mssql',
    connection: {
        server: 'localhost',
        user: 'saralibagarty',
        password: 'sql',
        database: 'reactpeoplecars',
        options: {
            port: 1433,
            instanceName: 'SQLEXPRESS'
        }
    }
});
const addPerson = async person => {
    await knex('people').insert(person);
}

const addCar = async (car) => {
    console.log(car);
    await knex('cars').insert(car);
}

const getAll = async () => {
    return await knex.from('people')
        .leftJoin('cars', 'people.id', 'cars.personId')
        .select('people.*').count({ carCount: 'cars.personId' })
        .groupBy('people.firstName', 'people.lastName', 'people.age', 'people.id');
}

const getCars = async personId => {
    return await knex.from('cars').select('*').where('personId', personId);
}

const deleteCars = async ({ personId }) => {
    return await knex.from('cars').where('personId', personId).del();
}

const getPerson = async (id) => {
    const person = await knex.from('people').select('*').where('id', id);
    return person[0];
}

module.exports = {
    addPerson,
    addCar,
    getAll,
    getCars,
    deleteCars,
    getPerson
}