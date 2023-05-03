import { loginPageUrl, offresPageUrl, USERNAME, PASSWORD } from "./utils/config.js";
import { login, extractOffres, applyToAll } from "./utils/functions.js"
import browser from "./utils/browser.js";
import { turnOnDataSaving } from './utils/page.js'


async function main() {

    const [page] = await browser.pages()
    await turnOnDataSaving(page)

    // login in
    await page.goto(loginPageUrl)
    await login(page, USERNAME, PASSWORD)
    console.log("login in succesfully");

    // extract offres
    let totalApplies = 0
    for (let i = 1; ; i++) {
        console.log('--------------------------------')
        let url = offresPageUrl + i + `.html`
        console.log(`url => ${url}`)
        await page.goto(url)

        let offres = await extractOffres(page)
        console.log(`offres => ${offres.length}`);
        if (offres.length === 0) continue
        console.log(offres.map(offre => offre.title).join('\n'));

        let appliesCount = await applyToAll(page, offres)
        console.log(`applies => ${appliesCount}`);
        if (appliesCount === 0) continue

        totalApplies += appliesCount
        if (totalApplies > 100000) break
    }

    console.log(`${totalApplies} offres has applied in total`);
    await browser.close()
}

main()