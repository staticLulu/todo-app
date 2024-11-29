'use client'
import { Spinner } from '@nextui-org/react'
import React from 'react'

const LoadingIndicator = () => {
  return (
    <div className='h-screen w-screen'>
      <Spinner color='success' size='lg' />
    </div>
  )
}

export default LoadingIndicator