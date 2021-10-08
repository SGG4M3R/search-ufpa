const puppeteer = require('puppeteer');
// const url = 'https://listao.ufpa.br/listao/relacao_classificados.html'

(async () => {
  const data = require('./data.json')
  const urls = data.links
  const browser = await puppeteer.launch({ headless: false});
  const page = await browser.newPage();
  console.log('INICIANDO A BUSCA...\n')
  for (let i = 0; i < urls.length; i++) {
    let url = urls[i];
    await page.goto(url);
    await page.waitForTimeout(2)
    result = await page.evaluate(() => {
      aprovados = document.getElementsByTagName('pre')[0].textContent
      if ( aprovados.search('SANTIAGO') > -1 ) {
        return true
      } else {
        return false      
      }
    })
    if (result == true) {
      console.log(`${url} ${result}`)
    }
  }
  console.log('Busca finalizada!')
  await browser.close();
})();