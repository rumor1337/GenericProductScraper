import kurPirkt from './kurPirkt.ts';
import Salidzini from './salidzini.ts';

let query: string = '3d printeru filaments';

// var scraperKurPirkt = new kurPirkt('Kresls', 1);
// scraperKurPirkt.doRequest();

var scraperSalidzini = new Salidzini(query, 1);
console.log(scraperSalidzini.doRequest());

// var sorter = new Sort(scraperSalidzini.doRequest());
// sorter.sortFunction();


