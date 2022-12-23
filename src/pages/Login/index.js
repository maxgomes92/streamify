import React from 'react'
import { Navigate } from 'react-router-dom';
import useAuthorize from '../../helpers/useAuthorize';
import { PATH } from '../../utils/constants';

export default function Login () {
  const { accessToken } = useAuthorize()

  return (
    <>
      Logging in...
      {accessToken && (
        <Navigate to={PATH.app} replace={true} />
      )}  
    </>
  )
}