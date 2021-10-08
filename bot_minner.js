const puppeteer = require('puppeteer');
// const url = 'https://listao.ufpa.br/listao/relacao_classificados.html'

(async () => {
  const data = require('./data.json')
  const url = data.links[0]
  console.log(url)
  const browser = await puppeteer.launch({ headless: false});
  const page = await browser.newPage();
  await page.goto(url);
  result = await page.evaluate(() => {
    aprovados = document.getElementsByTagName('pre')[0].textContent
    if ( aprovados.search('ARTHUR') > -1 ) {
      return true
    } else {
      return false      
    }
  })
  console.log(result)
  await browser.close();
})();