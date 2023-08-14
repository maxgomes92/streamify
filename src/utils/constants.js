const isProduction = process.env.NODE_ENV === 'production'
// const GITPAGES_PATH = '/streamify'

const DEFAULT_PATH = {
  home: '/home',
  app: '/app',
  login: '/',
}

const PRODUCTION_PATH = Object.entries(DEFAULT_PATH).reduce((acc, [key, value]) => {
  acc[key] = value
  return acc
}, {})

export const PATH = isProduction ? PRODUCTION_PATH : DEFAULT_PATH
