import React from 'react';
import Router from 'next/router';
import { getConfig, User } from 'radiks';
import {
  Layout,
  Menu
} from 'antd';

const {
  Header,
} = Layout;

class Nav extends React.Component {
  constructor(props) {
    super(props);

    const { userSession } = getConfig();

    this.state = {
      isSignedIn: userSession.isUserSignedIn(),
      isSigningIn: false,
    };
  }

  componentDidMount = () => {
    const { userSession } = getConfig();
    
    if (userSession.isUserSignedIn()) {
      const result = userSession.loadUserData();
      return this.setState({
        isSignedIn: true,
        username: result.username,
      });
    }

    if (userSession.isSignInPending()) {
      this.setState({ isSigningIn: true }, async () => {
        await userSession.handlePendingSignIn();
        await User.createWithCurrentUser();
        const result = userSession.loadUserData();

        this.setState({
          isSignedIn: true,
          isSigningIn: false,
          username: result.username,
        });
      });
    }
  }
  

  handleSignIn = (e) => {
    const { userSession } = getConfig();
    userSession.redirectToSignIn();
  }

  handleSignOut = () => {
    const { userSession } = getConfig();

    userSession.signUserOut();
    window.location = '/';
  }

  onMenuClick = (value) => {
    const { username } = this.state

    if (value.key === 'home') {
      Router.push('/');
    }

    if (value.key === 'profile') {
      Router.push('/users/_id', `/users/${username}`)
    }

    if (value.key === 'sign-out') {
      this.handleSignOut();
    }

    if (value.key === 'sign-in') {
      this.handleSignIn();
    }
  }

  render() {
    const {
      isSignedIn,
      isSigningIn,
    } = this.state;

    return (
      <Header
        style={{
          backgroundImage: 'linear-gradient(141deg, #bdc3c7 0%, #2c3e50 100%)',
        }}
      >
        <Menu
          className="nav-layout"
          mode="horizontal"
          onClick={this.onMenuClick}
          style={{
            color: 'white',
            backgroundImage: 'linear-gradient(141deg, #bdc3c7 0%, #2c3e50 100%)',
          }}
        >
          <Menu.Item key="home">
            Home
          </Menu.Item>
          {
            isSignedIn &&
            <Menu.Item key="profile">
              My Profile
            </Menu.Item>
          }
          {
            // eslint-disable-next-line no-nested-ternary
            isSignedIn ?
            <Menu.Item
              key="sign-out"
            >
              Sign Out
            </Menu.Item> :
            isSigningIn ?
            <Menu.Item>
              Signing in...
            </Menu.Item> :
            <Menu.Item
              key="sign-in"
            >
              Sign In
            </Menu.Item>
          }
        </Menu>
        <style jsx>{`
          ul {
            display: flex;
            justify-content: space-between;
          }

          nav > ul {
            padding: 4px 16px;
          }

          li {
            display: flex;
            padding: 6px 8px;
          }
        `}</style>

        <style jsx global>{`
          :global(body) {
            margin: 0;
            font-family: Titillium Web, -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
              Helvetica, sans-serif;
          }

          .ant-menu-horizontal > .ant-menu-item:hover, .ant-menu-horizontal > .ant-menu-submenu:hover, .ant-menu-horizontal > .ant-menu-item-active, .ant-menu-horizontal > .ant-menu-submenu-active, .ant-menu-horizontal > .ant-menu-item-open, .ant-menu-horizontal > .ant-menu-submenu-open, .ant-menu-horizontal > .ant-menu-item-selected, .ant-menu-horizontal > .ant-menu-submenu-selected {
            color: white;
          }

          .nav-layout {
            display: flex;
            justify-content: flex-end;
          }

          .white {
            color: white;
          }

          .shadow {
            color: #6E7783;
          }

          .self-centered {
            text-align: center;
          }

          .container {
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
          }

          @media (max-width: 480px) {
            .container {
              max-width: 450px;
              padding-left: 0 !important;
              padding-right: 0 !important;
            }
          }

          @media (min-width: 576px) {
            .container {
              max-width: 540px;
            }
          }

          @media (min-width: 768px) {
            .container {
              max-width: 720px;
            }
          }

          @media (min-width: 992px) {
            .container {
              max-width: 960px;
            }
          }

          @media (min-width: 1200px) {
            .container {
              max-width: 1140px;
            }
          }
          
          nav {
            background: transparent;
            text-align: center;
            position: fixed;
            left: 0;
            right: 0;
          }

          .large {
            font-size: 16px;
          }

          .green {
            color: #5CAB7D;
          }

          .danger {
            color: #D81159;
          }

          .bold {
            font-weight: 800;
          }

          h1 {
            font-size: 36px;
            font-weight: 500;
          }

          h2 {
            font-size: 24px;
          }

          h3 {
            font-size: 18px;
          }

          h4 {
            font-size: 14px;
          }

          p {
            margin-bottom: 0;
          }
         
          a {
            color: #067df7;
            text-decoration: none;
            font-size: 13px;
          }

          .ant-btn-lg {
            font-size: 18px;
          }

          // Top margin
          .mt-none    { margin-top: 0; }
          .mt-quarter { margin-top: .25em; }
          .mt-half    { margin-top: .5em; }
          .mt-one     { margin-top: 1em; }
          .mt-two     { margin-top: 2em; }

          // Bottom margin
          .mb-none    { margin-bottom: 0; }
          .mb-quarter { margin-bottom: .25em; }
          .mb-half    { margin-bottom: .5em; }
          .mb-one     { margin-bottom: 1em; }
          .mb-two     { margin-bottom: 2em; }

          // left margin
          .ml-none    { margin-left: 0; }
          .ml-quarter { margin-left: .25em; }
          .ml-half    { margin-left: .5em; }
          .ml-one     { margin-left: 1em; }
          .ml-two     { margin-left: 2em; }

          // right margin
          .mr-none    { margin-right: 0; }
          .mr-quarter { margin-right: .25em; }
          .mr-half    { margin-right: .5em; }
          .mr-one     { margin-right: 1em; }
          .mr-two     { margin-right: 2em; }

          // Top margin
          .pt-none    { padding-top: 0; }
          .pt-quarter { padding-top: .25em; }
          .pt-half    { padding-top: .5em; }
          .pt-one     { padding-top: 1em; }
          .pt-two     { padding-top: 2em; }

          // Bottom margin
          .pb-none    { padding-bottom: 0; }
          .pb-quarter { padding-bottom: .25em; }
          .pb-half    { padding-bottom: .5em; }
          .pb-one     { padding-bottom: 1em; }
          .pb-two     { padding-bottom: 2em; }

          // left margin
          .pl-none    { padding-left: 0; }
          .pl-quarter { padding-left: .25em; }
          .pl-half    { padding-left: .5em; }
          .pl-one     { padding-left: 1em; }
          .pl-two     { padding-left: 2em; }

          // right margin
          .pr-none    { padding-right: 0; }
          .pr-quarter { padding-right: .25em; }
          .pr-half    { padding-right: .5em; }
          .pr-one     { padding-right: 1em; }
          .pr-two     { padding-right: 2em; }

        `}</style>
      </Header>
    );
  }
}

export default Nav;
