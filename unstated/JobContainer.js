import { useState } from 'react'
import { createContainer } from 'unstated-next'

/**
 * {
 *  0: [],
 *  1: [],
 *  2: [],
 * } 
*/

function UseJobContainer() {
  const [jobs, setJobs] = useState({})

  return {
    jobs,
    setJobs,
  }
}

const JobContainer = createContainer(UseJobContainer)

export default JobContainer
