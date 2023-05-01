import puppeteer from "puppeteer";
import { params, homePgae, loginPage, offresPage, USERNAME, PASSWORD } from "./utils/config.js";
import { login, isStringContain } from "./utils/functions.js"
import keywords from './utils/keywords.json' assert { type: "json" };


(async () => {


    const browser = await puppeteer.launch(params);
    const [page] = await browser.pages()

    // login in
    // await page.goto(loginPage)
    // await login(page, USERNAME, PASSWORD)

    let offres
    // extract offres
    for (let i = 1; i <= 1; i++) {
        let URL =  `${offresPage}/${i}.html`
        await page.goto(URL)
        let allOffres = await page.evaluate(async () => {
            let list = document.querySelectorAll('#content .listing_set.list > article')
            let list2 = document.querySelectorAll('#content .listing_set.list > article')
            return [...list, ...list2].map(offre => {
                let link = offre.firstElementChild.href
                let title = offre.querySelector('.holder h3').innerText
                return { link, title }
            })
        })
        console.log(`found ${allOffres.length} in ${URL}`);
        offres = allOffres.filter(offre => {
            return isStringContain(offre.title,keywords)
        })
        console.log(`but just ${allOffres.length} is really good`);
    }


})()


// make unit test for isStringContain