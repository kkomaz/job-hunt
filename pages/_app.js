import React from 'react'
import App from 'next/app'
import { UserSession, AppConfig } from 'blockstack';
import Nav from '../components/nav'
import Hero from '../components/hero'
import { configure } from 'radiks';
import user from 'radiks/lib/models/user';

const makeUserSession = () => {
  const appConfig = new AppConfig(['store_write', 'publish_data'], 'http://localhost:5000');
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
      apiServer: 'http://localhost:5000',
      userSession
    });
  
    return { ...appProps }
  }

  componentDidMount() {
    const userSession = makeUserSession();

    configure({
      apiServer: 'http://localhost:5000',
      userSession
    });

    this.setState({
      userSession
    })
  }
  
  render() {
    const { Component, pageProps } = this.props
    const { userSession } = this.state

    if (!userSession) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Nav />
        <Hero />
        <Component {...pageProps} />
      </div>
    )
  }
}

export default MyApp