import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import DbManager from '../DbManager.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Express {

    private app = express();
    private port : Number = 8080;
    private dbManager = new DbManager();

    constructor(port: number) {
        this.port = port;
    }

    public startExpress() {
        this.app.use(express.static(join(__dirname, '../public')));
        this.app.listen(this.port, () => {
            console.log(`[!] Listening on port ${this.port}`)
        });
    }

    public async setRoutes() {
        this.app.get('/api/search', async (req, res) => {
            const searchQuery = String (req.query.q);

            const cache = await this.dbManager.retrieveData(searchQuery);

            if(cache.exists()) return res.json(cache.val());

            // run scraper here

        });

    }
}

export default Express