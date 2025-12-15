import kurPirkt from './kurPirkt.ts';
import Salidzini from './salidzini.ts';
import { AceBase } from 'acebase';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// express
import express from 'express';
const app = express()
const port = 8080

const db = new AceBase('scraperData'); 

let searchQuery: string = 'datorkresls';
let sortDirection: string = 'descending';

const retrievedData = await db.ref(searchQuery.toLowerCase()).get();

// pretty much it for caching 00:39 07.12.25

// add duplicate removal 15.12.25 (please remember)

async function handleData() {

  if(retrievedData.exists()) {
    // self explanatory
    console.log(`[${searchQuery}] read data`);
    // sort
    switch(sortDirection) {
        case 'ascending':
            return retrievedData.val().sort((a: any, b: any) => a.price - b.price);
        case 'descending':
            return retrievedData.val().sort((a: any, b: any) => b.price - a.price);
    }
  } else {
    // all scraper calls
    var salidziniScraper = new Salidzini(searchQuery, 1);
    var salidziniResults: any[] = await salidziniScraper.doRequest();

    var kurpirktScraper = new kurPirkt(searchQuery, 1);
    var kurpirktResults: any[] = await kurpirktScraper.doRequest();

    const allProducts = kurpirktResults.concat(salidziniResults);

    // set and return the scraped data
    await db.ref(searchQuery.toLowerCase()).set(allProducts);
    console.log(`[${searchQuery}] pushed data to .db`);
    switch(sortDirection) {
        case 'ascending':
            return allProducts.sort((a: any, b: any) => a.price - b.price);
        case 'descending':
            return allProducts.sort((a: any, b: any) => b.price - a.price);
    }
  }

}

console.log(handleData());

// app.use(express.static(join(__dirname, 'public')));
// app.listen(port, () => {
//     console.log(`listening on port ${port}`)
// })
