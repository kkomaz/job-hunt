import { useEffect, useState } from 'react'
import JobCardDetail from '../../../components/jobCardDetail'
import { getConfig } from 'radiks';

export default function About(props) {
  const [userData, setUserData] = useState({})
  const [isSignedIn, setIsSignedIn] = useState(false)
  
  const {
    job,
  } = props

  useEffect(() => {
    const { userSession } = getConfig();

    if (userSession) {
      try {
        setUserData(userSession.loadUserData())
        setIsSignedIn(userSession.isUserSignedIn())
      } catch {
        console.log('not logged in.')
      }
    }

  }, [])

  return (
    <div className="container">
      <JobCardDetail
        params={{...job, date: job.createdAt }}
        userData={userData}
        isSignedIn={isSignedIn}
      />
    </div>
  )
}

About.getInitialProps = async(context) => {
  const id = context.asPath.split('/')[2]
  const result = await fetch(`${process.env.RADIKS_API_SERVER}/api/jobs/${id}`)
  const { job } = await result.json()

  return {
    job,
  }
}
