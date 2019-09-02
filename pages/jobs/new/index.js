import { useState } from 'react'
import Head from '../../../components/head'
import JobForm from '../../../components/jobForm'
import JobCard from '../../../components/jobCard'
import {
  Card,
  Checkbox,
  Icon,
  Input,
  Form,
  Button,
  Row,
  Col,
} from 'antd'

export default function JobsNew() {
  const [preview, setPreview] = useState(false)
  const [jobParams, setJobParams] = useState({})

  const showPreview = () => {
    setPreview(true)
  }

  console.log(jobParams)

  return (
    <div className="container mt-one">
      <Head title="Home" />
      <Row gutter={16}>
        <div className="job-container">
          <Col xs={24} md={12}>
            <Card>
              <JobForm
                setJobParams={setJobParams}
                showPreview={showPreview}
              />
            </Card>
          </Col>
          {
            preview &&
            <Col xs={24} md={12}>
              <div className="confirm-container mb-one">
                <Button type="primary">
                  Confirm & Submit Job Post
                </Button>
              </div>
              <JobCard
                params={jobParams}
              />
            </Col>
          }
        </div>
      </Row>
      <style jsx>{`
        .confirm-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .job-container {
          display: flex;
          justify-content: center;
        }
      `}
      </style>
    </div>
  )
}