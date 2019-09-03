import React from 'react'
import App from 'next/app'
import { UserSession, AppConfig } from 'blockstack';
import Nav from '../components/nav'
import Head from '../components/head'
import Hero from '../components/hero'
import { configure } from 'radiks';
import MainContainer from '../unstated/MainContainer'

const makeUserSession = () => {
  const appConfig = new AppConfig(['store_write', 'publish_data'], 'http://localhost:3000');
  return new UserSession({ appConfig });
};

class MyApp extends App {
  state = {
    userSession: null,
  }

  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  static async getInitialProps(appContext) {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);

    const userSession = makeUserSession();

    configure({
      apiServer: 'http://localhost:3000',
      userSession
    });
  
    return { ...appProps }
  }

  componentWillMount() {
    const userSession = makeUserSession();

    configure({
      apiServer: 'http://localhost:3000',
      userSession
    });

    this.setState({
      userSession
    })
  }
  
  render() {
    const { Component, pageProps } = this.props

    return (
      <MainContainer>
        <Head title="Home" />
        <Nav />
        <Hero />
        <Component {...pageProps} />
      </MainContainer>
    )
  }
}

export default MyApp