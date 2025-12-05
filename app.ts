import kurPirkt from './kurPirkt.ts';
import Salidzini from './salidzini.ts';

let query: string = '3d printeru filaments';

var scraperSalidzini = new Salidzini(query, 1);
var salidziniArray: any = await scraperSalidzini.doRequest();

var scraperkurPirkt = new kurPirkt(query, 1);
var kurpirktArray: any = await scraperkurPirkt.doRequest();


const combinedPrices = kurpirktArray.concat(salidziniArray);

console.log(combinedPrices.sort());