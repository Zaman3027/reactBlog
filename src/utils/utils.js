import dotenv from 'dotenv';

dotenv.config();

const devURL = 'http://localhost:5000/';
const proURL = 'https://young-everglades-08176.herokuapp.com/';
const url = process.env.DEV_MODE;
console.log({ url });
export { devURL, proURL };