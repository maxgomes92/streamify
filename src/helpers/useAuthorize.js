// https://7ce8-78-67-173-210.ngrok.io/#access_token=BQBrF1lGkSFcrDdsJU6gDs25R5d4VZpb8pIPECnqqejkJ3Unqr10gd0eMg5jv2glPelPer2mMchO6bZZhNmQokIzVyhLYjYD1nAuMaLiOMH4sBoN5UwzhRjS5MpeFLSs0XjTpUmTrVTW0fT3KeayyCQ9d_hFMBbWf6zW3Sa1SgIzmNCZ6X53OINXuwxjIQ5XiQ0NB0FJxC8Rh44_F04ZbDFGtDQ&token_type=Bearer&expires_in=3600


export default function useAuthorize () {
  const locationHash = window.location.hash
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