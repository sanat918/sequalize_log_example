
const databaseName=process.env.Database_Name
const databaseUserName=process.env.Database_UserName
const databasePassword=process.env.Database_Password
const hostName=process.env.DatabaseHost
const databasePort=process.env.DatabasePort
const databaseDialect=process.env.DatabaseDialect
const saltRound=Number(process.env.saltRound)

/*Secrets*/
const accessTokenSecret=process.env.AccessTokenSecret
const accessTokenExpiry=process.env.AccessTokenExpiry
const refreshTokenSecret=process.env.RefreshTokenSecret
const refreshTokenExpiry=process.env.RefreshTokenExpiry

module.exports={databaseName,databaseUserName,databasePassword,hostName,databasePort,databaseDialect,saltRound,accessTokenSecret,
    accessTokenExpiry,refreshTokenSecret,refreshTokenExpiry
}