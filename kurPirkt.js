import * as cheerio from 'cheerio';

// es ienistu sevi
// kapec
// es izdomaju parlasit docs un atradu tik simple un chill solution
class kurPirkt {

    constructor(requestQuery, page) {
        this.requestQuery = requestQuery;
        this.page = page;
        this.url = `https://www.kurpirkt.lv/cena.php?q=${this.requestQuery}`;
    }

    ensurePages(page) {
        switch(page) {
            case undefined || null || 1:
                this.url = `https://www.kurpirkt.lv/cena.php?q=${requestQuery}`;
                break;
            default:
                this.url = `https://www.kurpirkt.lv/cena.php?q=${requestQuery}&page=${page}`;   
        }
    }

    doRequest() {
        const $ = cheerio.fromURL(url);
        let products = $('div[class=precebloks]').get().map(ele => {

            // mainigie 
            var price = $(ele).find('span[itemprop=price]').text();
            var campaignprice = $(ele).find('div[class=campaignprice]').text();

            var seller = $(ele).find('span[itemprop=seller]').text();
            var campaignseller = $(ele).find('div[class=campaignname]').text();
            
            var image = $(ele).find('img[class=resimg]').attr('src');
            // genuinely briesmigi bet strada
            var campaignimage = $(ele).find('.resimg.campaignimage').attr('src');

            return {
                title: $(ele).find('div[class=title]').text(),
                price: ((price != '') ? price : campaignprice),
                seller: ((seller != '') ? seller : campaignseller),
                image: 'kurpirkt.lv' + ((image != undefined) ? image : campaignimage)
            }
        });
    }

}

// console.log(products);
