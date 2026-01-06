import Scraper from './Scraper.ts';
import Express from './express/Express.ts';
import SortUtil from './SortUtil.ts';

class app {

    public express = new Express(8080);
    private scraper = new Scraper();
    public sortUtil = new SortUtil();

    constructor() {
        this.express.setRoutes();
        this.express.startExpress();
    }

}

new app();

