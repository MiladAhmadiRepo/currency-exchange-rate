export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3001,
  // jwt: {
  //   secret: process.env.APP_SECRET,
  //   expiresIn: process.env.APP_EXPIRES_IN
  // },
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    db: process.env.DATABASE_DB,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
  }

})

export const fiatCurrencies: string[] = [
  "AUD",
  "BGN",
  "BRL",
  "CAD",
  "CHF",
  "CNY",
  "CZK",
  "DKK",
  "EUR",
  "GBP",
  "GEL",
  "HKD",
  "HUF",
  "IDR",
  "IRR",
  "ILS",
  "INR",
  "ISK",
  "JPY",
  "KRW",
  "MXN",
  "MYR",
  "NOK",
  "NZD",
  "PHP",
  "PLN",
  "RON",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "USD",
  "ZAR"
];