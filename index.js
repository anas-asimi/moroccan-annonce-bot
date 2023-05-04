import { offresPageUrl } from "./utils/config.js";
import { login, extractOffres, applyToAll } from "./utils/actions.js"
import browser from "./utils/browser.js";
import { turnOnDataSaving } from './utils/page.js'
import color from "colors";


async function main() {

    const [page] = await browser.pages()
    await turnOnDataSaving(page)

    // login in
    await login(page)
    console.log("login in succesfully".green);

    // extract offres
    let totalApplies = 0
    for (let i = 318; ; i++) {
        console.log('--------------------------------')
        let url = offresPageUrl + i + `.html`
        console.log(`url =>     ${url}`)
        await page.goto(url)

        let offres = await extractOffres(page)
        console.log(`offres :   ${offres.length}`);
        if (offres.length === 0) continue
        console.log(offres.map(offre => '   -'+offre.title).join('\n'));

        let appliesCount = await applyToAll(page, offres)
        totalApplies += appliesCount
        console.log(`applies :  ${appliesCount}`);
        console.log(`Total :    ${totalApplies}`);
        if (appliesCount === 0) continue
        if (totalApplies > 100000) break
    }
    console.log('--------------------------------')
    console.log(`${totalApplies} offres has applied in total`);
    await browser.close()
}

main()