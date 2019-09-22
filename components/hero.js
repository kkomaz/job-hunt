import { Component } from 'react';
import {
  Button,
  Modal
} from 'antd';
import { getConfig } from 'radiks';
import Link from 'next/link';

class Hero extends Component {
  constructor(props) {
    super(props);

    const { userSession } = getConfig();

    this.state = {
      isSignedIn: userSession.isUserSignedIn(),
    };
  }

  componentDidMount = async () => {
    const { userSession } = getConfig();
    
    if (userSession.isUserSignedIn()) {
      const result = userSession.loadUserData();
      return this.setState({ isSignedIn: true });
    }

    if (userSession.isSignInPending()) {
      await userSession.handlePendingSignIn();
      this.setState({ isSignedIn: true });
    }
  }
  
  handleSignIn = (e) => {
    const { userSession } = getConfig();
    userSession.redirectToSignIn();
  }

  info = () => {
    Modal.info({
      title: 'You are not signed in!',
      content: (
        <div className="info-modal">
          <p>
            To create a job post, you must signed up/sign in with a Blockstack ID
          </p>
          <div className="mt-one self-centered">
            <Button
              type="primary"
              onClick={this.handleSignIn}
              style={{
                textAlign: 'center',
              }}
            >
              Sign Up / Sign In
            </Button>
          </div>
        </div>
      ),
    });
  }

  render() {
    return (
      <section className="hero main is-info mb-one">
        <div className="hero-body">
          <h1 className="title white self-centered">
            One Stop Shop for Crypto Jobs
          </h1>
          <div className="post-job-container">
            {
              this.state.isSignedIn ?
              <Link href="/jobs/new" as="/jobs/new">
                <Button
                  className="self-centered"
                  size="large"
                  type="primary"
                >
                  Post a Job
                </Button>
              </Link> :
              <Button
                onClick={this.info}
                className="self-centered"
                size="large"
                type="primary"
              >
                Post a Job
              </Button>
            }
          </div>
        </div>
        <style jsx>{`
          .sign-in-wrapper {
            display: flex;
          }

          .hero {
            display: flex;
            justify-content: space-between;
            background-image: linear-gradient(141deg, #bdc3c7 0%, #2c3e50 100%);
          }

          .hero-body {
            padding-bottom: 4.5rem;
            padding-top: 7rem;
            width: 100%;
          }

          .post-job-container {
            display: flex;
            justify-content: center;
            margin-top: 2em;
          }
        `}</style>
      </section>
    );
  }
}

export default Hero;
