import '../styles/globals.css'

import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'

import store from '../store'
import { githubSlice } from '../features/github/githubSlice'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApiProvider api={githubSlice}>
      <Component {...pageProps} />
    </ApiProvider>
  )
}
