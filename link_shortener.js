//Imports.------------------------------------------------------------
import { Application } from 'https://deno.land/x/abc@v1.3.1/mod.ts';
import denjucks from 'https://denopkg.com/alexpeattie/denjucks/mod.js';
import { Store } from "https://deno.land/x/store@v1.2.0/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts"
//Globals.------------------------------------------------------------
const store = new Store('shortenings');
const app = new Application();
app.renderer = { render: denjucks.render };
const PORT = 8080;
let linkHitCount = 0;
//Helper functions----------------------------------------------------
function getRandomString(length) 
{
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for ( let i = 0; i < length; i++ ) 
  {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

const randomShortcode = () => getRandomString(4);
//Program entry point.-------------------------------------------------  
app
  .static('/assets', './assets')
  .static('/css', './css')
  .static('/images', './images')
  .get('/', async server => 
  {// (1) LANDING PAGE
    await server.render("./html/link_shortener.html", {header: "Link shortener"});
  })
  .post('/shorten', async server => 
  {// (2) FORM IS SUBMITTED, USER IS SHOWN SHORTENED LINK
    const { fullurl } = await server.body;
    const shortcode = randomShortcode();
    await store.set(shortcode, { fullurl, visits: 0 });
    const shortendLink = `http://localhost:8080/${shortcode}`;
    await server.render('./html/link_shortend.html', {header: "Link has been shortend!", shortendLink});
  })
  .get("/:shortcode", async server => 
  {// (3) USER TRAVELLS TO SHORTNED LINK
    const { shortcode } = server.params;
    const shortcodeObject = await store.get(shortcode);
    if(shortcodeObject)
    {
      const { fullurl, visits} = shortcodeObject;
      await store.set(shortcode, {fullurl, visits: visits + 1});
      server.redirect(fullurl);
    }
    else
    {
      server.render("./html/404.html", {shortcode});
    }
  })
  .get("/visits/:shortcode", async (server) => 
  {// (OPTIONAL) USER WANTS TO TRAVEL TO VISITS PAGE
    const { shortcode } = server.params;
    const shortcodeObject = await store.get(shortcode);
    const visitsToShortCode = shortcodeObject.visits;
    server.render("./html/shortCodeVisits.html", {shortcode, visitsToShortCode});
  })
  .start({ port: PORT });

console.log(`Server running on http://localhost:${PORT}`);