import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  Row,
  Col,
  Divider
} from 'antd'
import { lookupProfile } from 'blockstack'
import ProfilePicture from '../../../components/user/ProfilePicture'
import Icon from '../../../components/Icon'
import JobCard from '../../../components/jobCard'
import Resume from '../../../components/resume'

const keys = {
  twitter: {
    icon: 'IconTwitter',
    url: 'https://twitter.com'
  },
  facebook: {
    icon: 'IconFacebook',
    url: 'https://facebook.com'
  },
  github: {
    icon: 'IconGithub',
    url: 'https://github.com'
  },
  linkedIn: {
    icon: 'IconLinkedIn',
    url: 'https://www.linkedin.com/in'
  }
}

export default function UserIdPage(props) {
  const { user, jobs, host } = props
  const [userGaia, setUserGaia] = useState('')

  useEffect(() => {
    const fetchProfileInfo = async () => {
      let adjustedHost = host;
      const result  = await lookupProfile(user.username)

      console.log(host);

      if (host === null) {
        adjustedHost = window.location.origin;
      }

      const gaiaHubUrl = _.find(result.apps, (k, v) => {
        const value = v.replace(/(^\w+:|^)\/\//, '');
        return value === adjustedHost
      })
      setUserGaia(gaiaHubUrl)
    }

    fetchProfileInfo();
  });

  const userProofs = _.get(user, 'profile.account', [])

  return (
    <div className="container">
      <Row gutter={16}>
        <Col xs={10}>
          <ProfilePicture
            user={user}
            userGaia={userGaia}
          />

          <Divider /  >

          <div className="social-proofs">
            {
              _.map(userProofs, (proof) => {
                if (keys[`${proof.service}`]) {
                  return (
                    <div className="social-proof mb-one">
                      <Icon
                        key={proof.service}
                        className="mr-half"
                        icon={keys[`${proof.service}`].icon}
                        onClick={() => window.open(`${keys[`${proof.service}`].url}/${proof.identifier}`)}
                        size={32}
                        color="#6E7783"
                      />
                      <h4>{proof.identifier}</h4>
                    </div>
                  )
                }
                return null
              })
            }
          </div>

          <Divider />

          {
            userGaia &&
            <Resume
              user={user}
              userGaia={userGaia}
            />
          }
        </Col>
        <Col xs={14}>
          <h2>{_.get(user, 'profile.name', '')}</h2>
          <h3 className="shadow">{_.get(user, 'username', '')}</h3>

          <Divider />

          <h2>My Job Posts</h2>

          {
            jobs.map((job) => {
              const params = job;
              return (
                <JobCard
                  className="mb-one"
                  params={{...params, date: job.createdAt}}
                  shortened
                />
              );
            })
          }
        </Col>
      </Row>
      <style jsx>{`
        .social-proof {
          display: flex;
          align-items: center;
        }
        .social-proofs {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-direction: column;
        }
      `}</style>
    </div>
  )
}

UserIdPage.propTypes = {
  user: PropTypes.object.isRequired,
  jobs: PropTypes.array.isRequired,
  host: PropTypes.string.isRequired,
}

UserIdPage.getInitialProps = async(context) => {
  const splitPath = context.asPath.split('/')
  const id = splitPath[2];
  const result = await fetch(`${process.env.RADIKS_API_SERVER}/api/users/${id}`);  
  const { user } = await result.json();
  const jobsResult = await fetch(`${process.env.RADIKS_API_SERVER}/api/jobs?creator=${id}&limit=0`);
  const { jobs } = await jobsResult.json();

  return {
    user,
    jobs: jobs.data,
    host: _.get(context, 'req.headers.host', null),
  }
}
