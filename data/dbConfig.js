// import knex from 'knex'
const knex = require('knex');

// import knexConfig from '../knexfile.js'
const knexConfig = require('../knexfile.js');

const dbEnv = process.env.DB_ENV || 'development';

module.exports = knex(knexConfig[dbEnv]);
