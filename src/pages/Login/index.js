import React, { useEffect } from 'react'
import useAuthorize from '../../helpers/useAuthorize';
import { PATH } from '../../utils/constants';

export default function Login () {
  const { accessToken } = useAuthorize()

  useEffect(() => {
    if (!accessToken) return;

    window.location.href = PATH.app;
  }, [accessToken])

  return (
    <>Logging in...</>
  )
}