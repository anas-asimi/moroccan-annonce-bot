import { keywords } from "./config.js";

export async function login(page, username, password) {
    await page.type("#username", username);
    await page.type("#password", password);
    let btn = await page.$('.login-form input[type="submit"]');
    await btn.click();
    await page.waitForNavigation();
    let user = await page.evaluate(() => {
        let user = document.querySelector(".welcomeuser .username")?.innerText;
        return user
    });
    if (user != username) {
        throw new Error("cant sign up to : " + username);
    }
}

export async function extractOffres(page) {
    let offres = await page.evaluate(async () => {
        let offresDiv = [
            ...document.querySelectorAll("#content .listing_set.list > article"),
            ...document.querySelectorAll("#content ul.cars-list > li"),
        ];
        return offresDiv
            .filter((offre) => !offre.classList.contains("adslistingpos"))
            .map((offreDiv) => {
                let link = offreDiv.firstElementChild.href;
                let title = offreDiv.querySelector(".holder h3")?.innerText;
                return { link, title };
            });
    });
    return offres.filter((offre) => includeAny(offre.title, keywords));
}

// function check if string include at least one word from array
export function includeAny(text, keywords) {
    // return false if text not string
    if (typeof text !== "string") return false;

    // return false if text empty
    if (text === "") return false;

    // return false if keywords not array
    if (!Array.isArray(keywords)) return false;

    // return false if keywords is empty array
    if (keywords.length === 0) return false;

    for (const word of keywords) {
        if (text.toLowerCase().includes(word)) {
            return true;
        }
    }
    return false;
}

export async function applyToAll(page, offres) {
    let appliedCount = 0;
    for (let offre of offres) {
        let isApplied = await applyToOne(page, offre);
        if (isApplied) appliedCount++;
    }
    return appliedCount;
}

export async function applyToOne(page, { title, link }) {
    let applyLink = 'https://www.marocannonces.com/index.php?a=13&b=' + link.slice(link.indexOf('/annonce/') + 9, link.lastIndexOf('/'))
    await page.goto(applyLink)
    let isAlreadyApplied = await page.$('.errorbox')
    if (isAlreadyApplied) return false
    await page.type("#c_senders_name", 'Anas Asimi');
    await page.type("#c_senders_phone", '0697748319');
    let btn = await page.$('#btn_envoyer')
    await btn.click()
    await page.waitForNavigation()
    let isApplied = await page.$('.repondre_success')
    if (isApplied) {
        console.log('has applied to :', title);
        return true
    }
    return false;
}