import * as cheerio from 'cheerio';

// es ienistu sevi
// kapec
// es izdomaju parlasit docs un atradu tik simple un chill solution
class Salidzini {

    public requestQuery: string;
    public page: number;
    public url: string;

    constructor(requestQuery: string, page: number) {
        this.requestQuery = requestQuery;
        this.page = page;
        this.url = `https://www.salidzini.lv/cena?q=${this.requestQuery}`;
    }

    ensurePages(page: number) {
        switch(page) {
            case null: case undefined: case 0: case 1:
                this.url = `https://www.salidzini.lv/cena?q=${this.requestQuery}`;
                break;
            default:
                this.url = `https://www.salidzini.lv/cena?q=${this.requestQuery}&offset=${this.page}`;
                break;
        }
    }

    async doRequest() {
        this.ensurePages(this.page);
        const $ = await cheerio.fromURL(this.url);
        let products = $('div[class=item_box_main]').get().map(ele => {

            // mainigie 
            var price: Number = parseFloat($(ele).find('div[class=item_price]').find('span').text().replace(',', '.'));

            var seller = $(ele).find('div[class=item_shop_name]').text();
            
            var image = $(ele).find('img[loading=lazy]').attr('src');

            var redirectLink = $(ele).find('a[class=item_link]').attr('href');

            return {
                title: $(ele).find('h2[class=item_name]').text(),
                price: price,
                seller: seller,
                image: image,
                redirectLink: `https://www.salidzini.lv${redirectLink}`
            }
        });
        
        return products.sort();

    }
}


export default Salidzini
