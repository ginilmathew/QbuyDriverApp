export const env = "dev"

const URLS = {
    dev: "https://apiqbuypanda.diginestsolutions.in/public/api/"
}

const IMG_BASEPATH = {
    live: "https://apiqbuygreen.diginestsolutions.in/public/",
    testing: "https://apiqbuypanda.diginestsolutions.in/public/",
    dev: "https://apiqbuypanda.diginestsolutions.in/public/"
}

//export const mode = "green" //"green" // "fashion" // "panda"


export const BASE_URL = URLS[env]

export const IMG_URL = IMG_BASEPATH[env]

//export const location = [8.5728749, 76.8636977];

//export const BASE_URL='https://apiqbuypanda.diginestsolutions.in/public/api/'

