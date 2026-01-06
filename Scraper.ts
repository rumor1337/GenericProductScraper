import kurPirkt from './KurPirkt.ts';
import Salidzini from './Salidzini.ts';

class Scraper {

    public async scrape(searchQuery: string) {

        var salidziniScraper = new Salidzini(searchQuery, 1);
        var salidziniResults: any[] = await salidziniScraper.doRequest();

        var kurpirktScraper = new kurPirkt(searchQuery, 1);
        var kurpirktResults: any[] = await kurpirktScraper.doRequest();

        const allProducts = kurpirktResults.concat(salidziniResults);

        return allProducts;

    }

}

export default Scraper;