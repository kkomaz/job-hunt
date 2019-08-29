import React from 'react'
import Link from 'next/link'
import { AppConfig, UserSession } from 'blockstack'
import { getConfig, User } from 'radiks';
import {
  Button,
} from 'antd'

class Nav extends React.Component {
  constructor(props) {
    super(props)

    const { userSession } = getConfig();

    this.state = {
      isSignedIn: userSession.isUserSignedIn()
    }
  }

  handleSignIn = (e) => {
    const { userSession } = getConfig();
    e.preventDefault()
    userSession.redirectToSignIn()
  }

  handleSignOut = () => {
    const { userSession } = getConfig();

    userSession.signUserOut()
    window.location = '/'
  }

  render() {
    const { isSignedIn } = this.state

    return (
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <ul>
            <li>
              {
                isSignedIn ?
                <Button onClick={this.handleSignOut}>
                  Sign Out
                </Button> :
                <Button onClick={this.handleSignIn}>
                  Sign In
                </Button>
              }
            </li>
          </ul>
        </ul>

        <style jsx global>{`
          :global(body) {
            margin: 0;
            font-family: Titillium Web, -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
              Helvetica, sans-serif;
          }

          .white {
            color: white;
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
          .mt-two     { margin-top: 1em * 2; }

          // Bottom margin
          .mb-none    { margin-bottom: 0; }
          .mb-quarter { margin-bottom: .25em; }
          .mb-half    { margin-bottom: .5em; }
          .mb-one     { margin-bottom: 1em; }
          .mb-two     { margin-bottom: 1em * 2; }

          // left margin
          .ml-none    { margin-left: 0; }
          .ml-quarter { margin-left: .25em; }
          .ml-half    { margin-left: .5em; }
          .ml-one     { margin-left: 1em; }
          .ml-two     { margin-left: 1em * 2; }

          // right margin
          .mr-none    { margin-right: 0; }
          .mr-quarter { margin-right: .25em; }
          .mr-half    { margin-right: .5em; }
          .mr-one     { margin-right: 1em; }
          .mr-two     { margin-right: 1em * 2; }

          // Top margin
          .pt-none    { padding-top: 0; }
          .pt-quarter { padding-top: .25em; }
          .pt-half    { padding-top: .5em; }
          .pt-one     { padding-top: 1em; }
          .pt-two     { padding-top: 1em * 2; }

          // Bottom margin
          .pb-none    { padding-bottom: 0; }
          .pb-quarter { padding-bottom: .25em; }
          .pb-half    { padding-bottom: .5em; }
          .pb-one     { padding-bottom: 1em; }
          .pb-two     { padding-bottom: 1em * 2; }

          // left margin
          .pl-none    { padding-left: 0; }
          .pl-quarter { padding-left: .25em; }
          .pl-half    { padding-left: .5em; }
          .pl-one     { padding-left: 1em; }
          .pl-two     { padding-left: 1em * 2; }

          // right margin
          .pr-none    { padding-right: 0; }
          .pr-quarter { padding-right: .25em; }
          .pr-half    { padding-right: .5em; }
          .pr-one     { padding-right: 1em; }
          .pr-two     { padding-right: 1em * 2; }

        `}</style>
      </nav>
    )
  }
}

export default Nav
