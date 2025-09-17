const isDev = process.env.REACT_APP_MODE === 'development'
const isProd = process.env.REACT_APP_MODE === 'production'

export const environment = Object.freeze({
  isDevMode: isDev,
  isProdMode: isProd,
  thirdWebClientId: process.env.REACT_APP_THIRD_WEB_CLIENT_ID as string,
  subgraphApiKey: process.env.REACT_APP_SUBGRAPH_API_KEY as string,
  subgraphDevApiKey:
    process.env.REACT_APP_DEV_SUBGRAPH_API_KEY,
  girhubToken: process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN as string,
})
