import { Upload, Button, Icon } from 'antd';
import _ from 'lodash'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { getConfig } from 'radiks'
import { saveAs } from 'file-saver';
import { generateUUID, openNotification } from '../utils'

export default function Resume(props) {
  const { user, userGaia } = props
  const [currentUser, setCurrentUser] = useState({})
  const [currentResume, setCurrentResume] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const { userSession } = getConfig();

  useEffect(() => {
    const fetchResume = async () => {
      const response = await fetch(`${userGaia}resume/${user.username}.json`)
      const result = await response.json();
      setCurrentResume(result)
    }

    fetchResume()
  }, [])

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const result = userSession.loadUserData()
      setCurrentUser(result)
    }
  }, []);

  const replaceFile = (file) => {
    setSubmitting(true)
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = async () => {
      const pdfFile = `data:application;base64,${Buffer(reader.result).toString("base64")}`
      const options = { encrypt: false }
      const blobId = generateUUID()
      const params = {
        _id: blobId,
        name: file.name,
        blob: pdfFile,
      }
      const stringifiedJSON = JSON.stringify(params)
      
      try {
        await userSession.putFile(`resume/${user.username}.json`, stringifiedJSON, options)
        setCurrentResume(params)
        setSubmitting(false)
        openNotification('success', 'Resume successfully updated!')
      } catch (e) {
        console.log(e);
      }
    }
  }

  const onViewClick = () => {
    saveAs(currentResume.blob, currentResume.name)
  }

  return (
    <div className="resume">
      {
        !_.isEmpty(currentResume) &&
        <Button
          onClick={onViewClick}
          disabled={submitting}
        >
          {submitting ? 'Updating...' : 'View my Resume'}
        </Button>
      }
      {
        currentUser.username === user.username &&
        <Upload
          name="file"
          className="mt-one"
          customRequest={data => (
            setTimeout(() => {
              data.onSuccess('ok')
            }, 0)
          )}
          multiple={false}
          beforeUpload={replaceFile}
          accept={[".pdf", ".txt", ".doc", ".docx"]}
          showUploadList={false}
        >
          <Button
            type="primary"
            disabled={submitting}
          >
            <Icon type="upload" /> Click to Upload Resume
          </Button>
        </Upload>
      }
      <style jsx>{`
        .resume {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
      `}</style>
    </div>
  )
};

Resume.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  userGaia: PropTypes.string.isRequired,
}
