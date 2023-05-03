import { keywords } from "../utils/config.js";
import { includeAny, applyToOne } from "../utils/functions.js";
import assert from "assert"

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
// describe("testing applyToOne function :", async () => {
// 	// login in
// 	let page = await getPage()
// 	await page.goto(loginPageUrl)
// 	await login(page, USERNAME, PASSWORD)

// 	test(`test with already applied offre`, () => {
// 		const offre = {
// 			title: 'Développeuse de site web',
// 			link: 'https://www.marocannonces.com/categorie/309/Offres-emploi/annonce/9462912/D%C3%A9veloppeuse-de-site-web.html'
// 		}
// 		const isApplied = applyToOne(offre);
// 		expect(isApplied).toBe(false);
// 	});
// });