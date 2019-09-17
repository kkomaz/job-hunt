import { useEffect } from 'react'
import {
  Row,
  Col,
} from 'antd'
import fetch from 'isomorphic-unfetch';
import JobContainer from '../unstated/JobContainer'
import JobCard from '../components/jobCard'

function Home(props) {
  const jobContainer = JobContainer.useContainer()
  const { query, jobs } = props

  const setJobContainer = async (page = 0) => {
    jobContainer.setJobs({ ...jobContainer.jobs, [page]: jobs })
  }

  useEffect(() => {
    if (!query.page || parseInt(query.page) === 1) {
      setJobContainer()
    }

    if (parseInt(query.page) > 1) {
      setJobContainer(query.page - 1)
    }
  }, [])

  if (!jobContainer.jobs[query.page || 0]) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="container">
        <Row>
          <Col md={18} sm={24}>
            {
              jobContainer.jobs[query.page || 0].map((job) => {
                const params = job
                return (
                  <JobCard
                    className="mb-one"
                    params={{...params, date: job.createdAt}}
                    shortened
                  />
                )
              })
            }
          </Col>
          <Col md={6} sm={24}>
            <div className="mt-one" style={{ padding: '0 20px' }}>
              <h3>Who are we?</h3>
              <p className="mb-one large">
                JobStack is a open source platform to help developers find job in the crypto & blockchain space.
              </p>
              <p className="mb-one large">
                Posting a job is completely <span className="green bold">FREE</span>.  All it requires is for you to sign up and create a Blockstack ID
              </p>
              <p className="mb-one large">
                With the emergence of blockchain technology and decentralized applications, finding talented individuals to solve these problems will play a vital role to mass adoption.
              </p>

              <h3>Sponsors</h3>
              <p className="mb-one large">
                Currently accepting sponsors to help promote blockchain jobs
              </p>
            </div>
          </Col>
        </Row>
      </div>

      <style jsx>{`
        .basic-details {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        p {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }

        .card-buttons {
          display: flex;
        }

        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
        }
        .title,
        .description {
          text-align: center;
        }
        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9b9b9b;
        }
        .card:hover {
          border-color: #067df7;
        }
        .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }
        .card p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #333;
        }
      `}</style>
    </div>
  )
}

Home.getInitialProps = async ({ query }) => {
  const result = await fetch(`${process.env.RADIKS_API_SERVER}/api/jobs`)
  const { jobs } = await result.json()

  return {
    query,
    jobs,
  }
}

export default Home
