const cheerio = require("cheerio");
const http = require("https");

// deprecated


var requestQuery = 'kalkulators';
var page = 1;
var url = `https://www.kurpirkt.lv/cena.php?q=${requestQuery}`;

if(page == undefined || page == null || page == 1) {
    url = `https://www.kurpirkt.lv/cena.php?q=${requestQuery}`;
} else {
    url = `https://www.kurpirkt.lv/cena.php?q=${requestQuery}&page=${page}`;
}

let rawData = '';

function doRequest() {
    http.get(url, res => {
        res.on('data', chunk => {
            rawData += chunk
        })
        
        res.on('end', () => {
            console.log(`[1/2] done downloading kurpirkt.lv | page: ${page}`);
            
            const $ = cheerio.load(rawData);

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

            console.log(products);
            console.log('[2/2] got data');
        })
    }).on("error", err => reject(err));
}

doRequest();