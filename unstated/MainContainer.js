import React from 'react'
import PropTypes from 'prop-types'
import JobContainer from './JobContainer'

function MainContainer(props) {
  const { children } = props

  return (
    <div>
      <JobContainer.Provider>
        {children}
      </JobContainer.Provider>
    </div>
  )
}

MainContainer.propTypes = {
  children: PropTypes.any.isRequired
}

export default MainContainer
