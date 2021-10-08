const puppeteer = require('puppeteer');
// const url = 'https://listao.ufpa.br/listao/relacao_classificados.html'
const fs = require('fs');
(async () => {
  const browser = await puppeteer.launch({ headless: false});
  const page = await browser.newPage();
  await page.goto('https://listao.ufpa.br/listao/relacao_classificados.html');
  const list_itens = await page.evaluate(() => {
    const itens_node_list = document.querySelectorAll('tbody > tr')
    const list = []
    for (let i = 1; i < itens_node_list.length; i++) {
        // const element = itens_node_list[i].textContent;
        const element = itens_node_list[i]
        const elementCampus = element.cells[0].textContent
        const elementTest = elementCampus.search('BELEM')
        if (elementTest == 0){
          list.push(element.cells[1].children[0].href)
        }
    }
    return list
  })
  // json = JSON.stringify(list_itens)
  // // console.log(json)
  // fs.writeFileSync('data.json', json)
  await browser.close();
})();