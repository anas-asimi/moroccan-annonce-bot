async function login(page, username, password) {
    await page.type('#username', username);
    await page.type('#password', password);
    let btn = await page.$('.login-form input[type="submit"]')
    await btn.click()
    await page.waitForNavigation();
    let isSignIn = await page.evaluate(() => {
        let user = document.querySelector('.welcomeuser .username')?.innerText
        return user ? true : false
    })
    if (!isSignIn) {
        throw new Error('cant sign up')
    }
    console.log('login in succesfully');
}

// function check if string include at least one word from array
export function isStringContain(text,keywords) {

    // return false if text not string
    if (typeof text !== 'string') return false

    // return false if text empty
    if (text === '') return false

    // return false if keywords not array
    if (!Array.isArray(keywords)) return false

    // return false if keywords is empty array
    if (keywords.length === 0) return false

    for (const word of keywords) {
        if (text.includes(word)) {
            return true
        }
    }
    return false
}

export {
    login,
}