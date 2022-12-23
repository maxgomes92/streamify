const isProduction = process.env.NODE_ENV === 'production'
const GITPAGES_PATH = '/spotify-create-playlist'

const DEFAULT_PATH = {
  home: '/',
  app: '/app',
  login: '/login',
}

const PRODUCTION_PATH = Object.entries(DEFAULT_PATH).reduce((acc, [key, value]) => {
  acc[key] = GITPAGES_PATH + value
  return acc
}, {})

export const PATH = isProduction ? PRODUCTION_PATH : DEFAULT_PATH