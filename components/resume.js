import { Upload, message, Button, Icon } from 'antd';
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { getConfig } from 'radiks'
import { generateUUID, getBlobUrl } from '../utils'

export default function Resume(props) {
  const { user } = props
  const [currentResume, setCurrentResume] = useState({})
  const { userSession } = getConfig();

  useEffect(() => {
    const fetchResume = async () => {
      const options = { decrypt: false }
      const result = await userSession.getFile('resume/kkomaz.id.json', options)
      setCurrentResume(JSON.parse(result))
    }

    fetchResume()
  }, [])

  const replaceFile = (file) => {
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = async () => {
      const pdfFile = `data:application/pdf;base64,${Buffer(reader.result).toString("base64")}`
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
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div className="resume">
      <Button>
        View my Resume
      </Button>
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
        accept=".pdf"
        showUploadList={false}
      >
        <Button>
          <Icon type="upload" /> Click to Upload
        </Button>
      </Upload>
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
}
