import app from './app.js';
import 'dotenv/config';
import logger from './logs/logger.js';
import {sequelize} from './database/database.js';
async function main() {
    //iniciar zequelize
    await sequelize.sync({force:false}); // true vuelve a crear la base de datos /false no
    const port=process.env.PORT;
    app.listen(port);
    console.log(`usando ${port}`);
    logger.info(`usando ${port}`);
}
main();
