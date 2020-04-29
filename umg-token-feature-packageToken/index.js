const funcInitDb = require("./sequelize");
const TokenServiceFunc=require("./service/tokenService");

module.exports= (config) => {  //config - вх параметр
    const { token } = funcInitDb(config);  //берет model ttoken
    const TokenService = TokenServiceFunc(token);  //crud operations

    return {
        TokenService
    };
}; //возвращает функцию