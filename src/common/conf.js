export const TEST_API_DOMAIN = "http://api3.8pig.com";
export const PROD_API_DOMAIN = "http://api.8pig.com/";
export const TEST_API = TEST_API_DOMAIN + "/8pig-api/";
export const PROD_API = PROD_API_DOMAIN + "/8pig-api/";
export const API = process.env.NODE_ENV === 'production' ? PROD_API : TEST_API;