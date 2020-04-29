const Sequelize = require('sequelize')
const TokenModel = require('./models/tokenModels');

module.exports =  (config) =>
{
  const sequelize = new Sequelize( config.dbName || 'inpdb', config.dbUser || 'in_user', config.dbPass || 'owndev$pass', {
    host: config.dbHost || '10.15.123.177',
    dialect: config.dbDialect || 'postgres',  /* //- or */
  pool: {
    max: 10,
    min: 1,
    acquire: 30000,
    idle: 10000
  },
  define:{
    freezeTableName:true, //model name without s(willnot be plural)  
    timestamps:false, //don't add the timestamp attributes (updatedAt, createdAt)
    schema:"token"
  }
});

let token =  TokenModel(sequelize, Sequelize);

sequelize.sync({ 
    force: false
    })
    .then(() => {
        console.log('Database & tables created!'); //if we have table in database it will not be created
    });
    return {
        token
        };
    };  

