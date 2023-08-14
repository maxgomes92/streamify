export default function useAuthorize() {
  const locationHash = window.location.hash.includes("access_token") ? window.location.hash : ""
  const storageHash = localStorage.getItem('login-hash')

  if (!locationHash && !storageHash) {
    return {}
  }

  if (locationHash) {
    localStorage.setItem('login-hash', locationHash)
  }

  const hash = locationHash || storageHash

  const params = new URLSearchParams(hash.substring(1))
  const accessToken = params.get('access_token')
  const tokenType = params.get('token_type')
  const expiresIn = params.get('expires_in')

  return {
    accessToken,
    tokenType,
    expiresIn,
  }
}
