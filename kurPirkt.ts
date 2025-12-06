import * as cheerio from 'cheerio';

// es ienistu sevi
// kapec
// es izdomaju parlasit docs un atradu tik simple un chill solution
class kurPirkt {

    public requestQuery: string;
    public page: number;
    public url: string;

    constructor(requestQuery: string, page: number) {
        this.requestQuery = requestQuery;
        this.page = page;
        this.url = `https://www.kurpirkt.lv/cena.php?q=${this.requestQuery}`;
    }

    ensurePages(page: number) {
        switch(page) {
            case null: case undefined: case 0: case 1:
                this.url = `https://www.kurpirkt.lv/cena.php?q=${this.requestQuery}`;
                break;
            default:
                this.url = `https://www.kurpirkt.lv/cena.php?q=${this.requestQuery}&page=${this.page}`;
                break;
        }
    }

    async doRequest() {
        this.ensurePages(this.page);
        const $ = await cheerio.fromURL(this.url);
        let products = $('div[class=precebloks]').get().map(ele => {

            // mainigie 
            var price = $(ele).find('span[itemprop=price]').text();
            var campaignprice = $(ele).find('div[class=campaignprice]').text();

            var seller = $(ele).find('span[itemprop=seller]').text();
            var campaignseller = $(ele).find('div[class=campaignname]').text();
            
            var image = $(ele).find('img[class=resimg]').attr('src');
            // genuinely briesmigi bet strada
            var campaignimage = $(ele).find('.resimg.campaignimage').attr('src');

            var redirectLink = $(ele).find('a[target=_blank]').attr('href');

            return {
                title: $(ele).find('div[class=title]').text(),
                price: ((price != '') ? parseFloat(price) : parseFloat(campaignprice)),
                seller: ((seller != '') ? seller : campaignseller),
                image: 'kurpirkt.lv' + ((image != undefined) ? image : campaignimage),
                redirectLink: `https://kurpirkt.lv${redirectLink}`,
            }
        });
        return products;
    }


}

export default kurPirkt
