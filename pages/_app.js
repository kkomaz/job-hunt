import React from 'react'
import App from 'next/app'
import { UserSession, AppConfig } from 'blockstack';
import { configure } from 'radiks';

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  static async getInitialProps(appContext) {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);

    const userSession = new UserSession({
      appConfig: new AppConfig(['store_write', 'publish_data'])
    })

    configure({
      apiServer: 'http://localhost:5000',
      userSession
    });
  
    return { ...appProps }
  }

  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default MyApp