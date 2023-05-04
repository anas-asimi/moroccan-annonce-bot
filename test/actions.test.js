import { keywords, loginPageUrl, USERNAME, PASSWORD } from "../utils/config.js";
import { login, includeAny, applyToOne } from "../utils/actions.js";
import { turnOnDataSaving } from "../utils/page.js";
import assert from "assert"
import browser from "../utils/browser.js";


describe("testing includeAny function :", () => {

	it(`should return true when contain any keyword`, () => {
		const paraghraph = "Rédacteur web / journaliste (h-f) - stage rémunéré";
		const result = includeAny(paraghraph, keywords);
		assert.equal(result, true);
	});

	it(`should return false when contain non of keyword`, () => {
		const paraghraph = "Rédacteur / journaliste (h-f) - stage rémunéré";
		const result = includeAny(paraghraph, keywords);
		assert.equal(result, false);
	});

	it(`should return false if paraghraph is empty`, () => {
		const paraghraph = "";
		const result = includeAny(paraghraph, keywords);
		assert.equal(result, false);
	});

	it(`should return false if paraghraph not string`, () => {
		const paraghraph = 666;
		const result = includeAny(paraghraph, keywords);
		assert.equal(result, false);
	});
});

describe("testing applyToOne function :", () => {
	before(async () => {
		const [page] = await browser.pages()
		// login in
		await page.goto(loginPageUrl)
		await login(page, USERNAME, PASSWORD)
	});
	it(`test with already applied offre`, async () => {
		const page = await browser.newPage()
		const link = 'https://www.marocannonces.com/categorie/309/Offres-emploi/annonce/9462912/D%C3%A9veloppeuse-de-site-web.html'
		const isApplied = await applyToOne(page, link);
		assert.equal(isApplied, false);
	});
	it(`test with new offre`, async () => {
		const page = await browser.newPage()
		// ! this should not be link to an already applied offre
		const link = 'https://www.marocannonces.com/index.php?a=13&b=9418746'
		const isApplied = await applyToOne(page, link);
		assert.equal(isApplied, true);
	});
});
