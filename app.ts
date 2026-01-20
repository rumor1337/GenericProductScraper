import Express from './services/express/Express.ts';

class app {

    public express = new Express(8080);

    constructor() {
        this.express.setRoutes();
        this.express.startExpress();
    }

}

new app();

