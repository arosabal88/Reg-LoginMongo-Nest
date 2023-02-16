

export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    // con MongoCompass
    // mongodb: process.env.MONGODB_CNN,
    // con Docker y TablePlus
    mongodb: process.env.MONGO_DB,
    port: process.env.PORT || 3002,
    jwt: process.env.JWT_SECRET || 'secretkey'
    
});
