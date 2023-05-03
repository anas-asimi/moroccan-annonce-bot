import jsonfile from 'jsonfile';
import dotenv from 'dotenv';
dotenv.config();

export const browserConfig = {
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"]
};
let currentPath = process.cwd()
export const keywords = jsonfile.readFileSync(currentPath + '/keywords.json')
export const homePgaeUrl = 'https://www.marocannonces.com/'
export const loginPageUrl = 'https://www.marocannonces.com/mon-compte/'
export const offresPageUrl = 'https://www.marocannonces.com/categorie/309/Emploi/Offres-emploi/'
export const USERNAME = process.env.USER_NAME
export const PASSWORD = process.env.PASSWORD