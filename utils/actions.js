import { loginPageUrl, USERNAME, PASSWORD } from "./config.js";
import { keywords } from "./config.js";
import UserAgent from 'user-agents';

export async function login(page) {
    await page.goto(loginPageUrl)
    await page.type("#username", USERNAME);
    await page.type("#password", PASSWORD);
    let btn = await page.$('.login-form input[type="submit"]');
    await btn.click();
    await page.waitForNavigation();
    let user = await page.evaluate(() => {
        let user = document.querySelector(".welcomeuser .username")?.innerText;
        return user
    });
    if (user != USERNAME) {
        throw new Error("cant sign up to : " + USERNAME);
    }
}

export async function isLogin(page) {
    await page.goto(loginPageUrl)
    let user = await page.evaluate(() => {
        let user = document.querySelector(".welcomeuser .username")?.innerText;
        return user
    });
    if (user == USERNAME) return true
    return false
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
        let isApplied = await applyToOne(page, offre.link, 0.25);
        if (isApplied) appliedCount++;
    }
    return appliedCount;
}

async function isAlreadyApplied(page) {
    let errElement = await page.$('.errorbox')
    if (errElement) return true
    return false
}

export async function applyToOne(page, link, delayTime = 0.25) {
    // visite offre link
    let applyLink = 'https://www.marocannonces.com/index.php?a=13&b=' + link.slice(link.indexOf('/annonce/') + 9, link.lastIndexOf('/'))
    await page.goto(applyLink)
    await delay(delayTime)
    if (await isAlreadyApplied(page)) {
        console.log('       already Applied'.yellow);
        return false
    }
    // fill form and submit
    console.log('       applying')
    await page.type("#c_senders_name", 'Anas Asimi');
    await page.type("#c_senders_phone", '0697748319');
    await page.type("#c_senders_comments", 'Je suis étudiant en développement informatique pour devenir Frontend développement , Pour cela, au travers de ma formation, nous devons effectuer un stage de 2 mois dans une entreprise en rapport tant avec notre formation que la suite que nous souhaitons donner à notre carrière professionnelle , Votre société a retenu mon attention car elle s’inscrit au niveau de son activité dans le type de fonction que je souhaiterais exercer après mes études , En effet, j’ai une attirance tout particulière pour la programmation informatique , Je pourrais ainsi beaucoup apprendre et mettre en pratiques mes connaissances en la matière , Restant à votre disposition pour vous convaincre de ma motivation pour effectuer mon stage dans votre établissement, veuillez recevoir, Madame, Monsieur, toute ma considération');
    let btn = await page.$('#btn_envoyer')
    await btn.click()
    await page.waitForNavigation({ waitUntil: 'networkidle2' })
    await delay(delayTime)
    // checking if applying has succesfully
    await page.goto(applyLink)
    if (await isAlreadyApplied(page)) {
        console.log('           applying succesfully'.green)
        return true
    }
    // try again until delayTime become bigger (after 3 tries)
    if (delayTime < 1) {
        console.log('           applying fail, trying again'.red);
        const userAgent = new UserAgent({ deviceCategory: 'desktop' });
        await page.setUserAgent(userAgent.data.userAgent);
        if (await isLogin(page) == false) {
            console.log('login in'.yellow);
            await login(page)
        }
        else {
            console.log('u r already login in'.yellow);
        }
        return await applyToOne(page, link, delayTime * 2)
    }
    // after 3 tries without success we gonna skip
    else {
        console.log('           applying fail, skiping offre'.red);
        return false
    }
}

async function delay(second) {
    await new Promise((res) => {
        setTimeout(res, 1000 * second)
    })
}