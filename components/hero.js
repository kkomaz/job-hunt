import { Button } from 'antd'
import Link from 'next/link'

function Hero() {
  return (
    <section className="hero main is-info">
      <div className="hero-body">
        <h1 className="title white self-centered">
          One stop shop for Blockchain Jobs
        </h1>
        <div className="post-job-container">
          <Link href="/jobs/new">
            <Button
              className="self-centered"
              size="large"
              type="primary"
            >
              Post a Job
            </Button>
          </Link>
        </div>
      </div>
      <style jsx>{`
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
  )
}

export default Hero