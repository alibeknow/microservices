module.exports = (sequelize, type) => {
    return sequelize.define('ttoken', {
        id: {
            type: type.UUID, //INTEGER,
            defaultValue: type.UUIDV4,
            primaryKey: true
            },
        msisdn: {
            type: type.STRING(12),
            allowNull: false
            },
        token: {
            type: type.STRING(255),
            allowNull: false
            },
        status: {
            type: type.STRING(255)
            },
        dbosystem: {
            type: type.STRING(30),
            }, 
        datetime: {
            type: type.DATE,
            defaultValue: type.NOW  
            } 
        });
};

