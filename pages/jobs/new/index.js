import { useState } from 'react'
import Head from '../../../components/head'
import JobForm from '../../../components/jobForm'
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

  const showPreview = () => {
    setPreview(true)
  }

  return (
    <div className="container mt-one">
      <Head title="Home" />
      <Row>
        <Col xs={12} offset={preview ? 0 : 7}>
          <Card>
            <JobForm
              showPreview={showPreview}
            />
          </Card>
        </Col>
        {
          preview &&
          <Col xs={12}>
            Showing Preview
          </Col>
        }
      </Row>
    </div>
  )
}