module.exports = token => {
    return {
        Save: TokenModel => {
            return token.create(TokenModel) //можно добавить данные через tokenmodel
                .then(token => {
                    return token;
                    })
                .catch(err => {
                    return err.message;
                    });
            },
        Get: (data, limit, offset) => {
            /*let whereClause = null;
            if (data) {
                whereClause = { where: data };
                }*/
            return token.findAndCountAll({
                where: data,  //whereClause,
                limit: limit,
                offset: offset,
                raw: true
                })
                .then(tokensRes => {
                return tokensRes;
                    })
                .catch(err => {
                return err.message;
                    });
            },
        GetById: uid => {
        return token.findOne({ where: { id: uid } })
            .then(token => {
                if (token) {
                    return token;
                    } 
                else {
                    return "not found";
                    }
                })
            .catch(err => {
                return err.message;
                });
            },

        GetByMsisdn: msisdn => {
            return token.findAll({ where: { msisdn : msisdn } })
                .then(token => {
                    if (token) {
                        return token;
                        } 
                    else {
                        return "not found";
                        }
                    })
                .catch(err => {
                    return err.message;
                    });
            },

        Update: TokenModel => {
            return token.update(TokenModel, {
                fields: Object.keys(TokenModel),
                where: { id: TokenModel.uid}
            })
            .then(affectedRows => {
                return {
                    affectedRows
                    };
                })
            .catch(err => {
                return err.message;
                    });
            },  
        Delete:(uid) =>{
            return  token.destroy({
                where: {id: uid }
            })
            .then((removedRows) => {
                return {
                    removedRows: removedRows
                    };
                })
            .catch((err) => {
                return err.message;
                    });
            }
                   
        };
    };
