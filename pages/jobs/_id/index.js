import JobCardDetail from '../../../components/jobCardDetail'

export default function About(props) {
  const { job } = props

  return (
    <div className="container">
      <JobCardDetail
        params={{...job, date: job.createdAt }}
      />
    </div>
  )
}

About.getInitialProps = async(context) => {
  const id = context.asPath.split('/')[2]
  const result = await fetch(`http://localhost:3000/api/jobs/${id}`)
  const { job } = await result.json()

  console.log(job, 'job')

  return {
    job,
  }
}
