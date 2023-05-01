import dotenv from 'dotenv';
dotenv.config();

export const params = {
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"]
};

export const homePgae = 'https://www.marocannonces.com/'
export const loginPage = 'https://www.marocannonces.com/mon-compte/'
export const offresPage = 'https://www.marocannonces.com/categorie/309/Emploi/Offres-emploi'


export const USERNAME = process.env.USER_NAME
export const PASSWORD = process.env.PASSWORD