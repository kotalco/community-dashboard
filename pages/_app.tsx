import { AppProps } from 'next/app'
import { ReactElement } from 'react'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />
}

export default MyApp
