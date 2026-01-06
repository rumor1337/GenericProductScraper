import { AceBase } from 'acebase';

class DbManager {

    private db: AceBase;

    constructor() {
        this.db = new AceBase('scraperData');
    }

    public async retrieveData(query: string) {
        var retrievedData = await this.db.ref(query.toLowerCase()).get();
        console.info(`[${query}] retrieved data`);
        return retrievedData;

    }

    public async saveData(query: string, data: any[]) {
        await this.db.ref(query.toLowerCase()).set(data);
        console.info(`[${query}] saved data`);
        // probably return something aswell idk
    }

}

export default DbManager;