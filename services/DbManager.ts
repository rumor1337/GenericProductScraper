import { AceBase } from 'acebase';
import Logger from '../util/Logger.ts';

class DbManager {

    private db: AceBase;
    private logger;

    constructor() {
        this.db = new AceBase('scraperData');
        this.logger = new Logger();
    }

    public async retrieveData(query: string) {
        try {
            const sanitizedQuery = query.trim().toLowerCase();
            var retrievedData = await this.db.ref(query).get();
            this.logger.info(`[${query}] retrieved data`);
            return retrievedData;
        } catch(error: any) {
            this.logger.error(`Caught an exception at retrieveData in DbManager. ${error.message}`);
            return null;
        }
    }

    public async saveData(query: string, data: any[]) {
        try {
            const sanitizedQuery = query.trim().toLowerCase();
            await this.db.ref(sanitizedQuery).set(data);
            this.logger.info(`[${query}] saved data`);
        } catch(error: any) {
            this.logger.warn(`Caught an exception at saveData in DbManager. ${error.message}`);
            return null;
        }
    }

}

export default DbManager;