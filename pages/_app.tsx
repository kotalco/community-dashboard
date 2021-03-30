import { AppProps } from 'next/app'
import { ReactElement } from 'react'
import { Provider } from 'react-redux'
import 'tailwindcss/tailwind.css'

import store from '@store/store'

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
