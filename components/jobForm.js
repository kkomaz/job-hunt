import {
  Input,
  Form,
  Button,
  Row,
  Col,
  Select,
} from 'antd'
import Job from '../model/job'
const { Option } = Select;

const { TextArea } = Input;

function JobForm(props) {
  const {
    form: { getFieldDecorator, validateFields }
  } = props

  const createJob = async (params) => {
    const job = new Job(params)
    console.log(job)
    try {
      await job.save()
    } catch (e) {
      console.log(e)
    }
  }

  const handleSubmit = (e, preview) => {
    console.log(preview, 'preview')
    e.preventDefault()

    validateFields((err, values) => {
      if (!err && preview) {
        props.setJobParams(values)
        props.showPreview()
      }

      if (!err) {
        createJob(values)
      }
    })
  }

  const onPreviewClick = (e) => {
    handleSubmit(e, true)
  }

  return (
    <Row>
      <Col xs={24}>
        <Form onSubmit={handleSubmit}>
          <Form.Item label="Company Name" style={{ marginBottom: '10px' }}>
            {
              getFieldDecorator('company', {
                rules: [
                  { required: true, message: 'Required' }
                ]
              })(
                <Input
                  name="company"
                />
              )
            }
          </Form.Item>
          <Form.Item label="Company location" style={{ marginBottom: '10px' }}>
            {
              getFieldDecorator('location', {
                rules: [
                  { required: true, message: 'Required' }
                ]
              })(
                <Input
                  name="location"
                />
              )
            }
          </Form.Item>
          <Form.Item label="Job Title" style={{ marginBottom: '10px' }}>
            {
              getFieldDecorator('title', {
                rules: [
                  { required: true, message: 'Required' }
                ]
              })(
                <Input
                  name="title"
                />
              )
            }
          </Form.Item>
          <Form.Item label="URL of the offer" style={{ marginBottom: '10px' }}>
            {
              getFieldDecorator('offer', {
                rules: [
                  { required: true, message: 'Required' }
                ]
              })(
                <Input
                  name="offer"
                  placeholder="External URL of the job offer"
                />
              )
            }
          </Form.Item>
          <Form.Item label="Job Type">
            {
              getFieldDecorator('type', {
                rules: [
                  { required: true, message: 'Required' }
                ]
              })(
                <Select style={{ width: '100%' }}>
                  <Option value="full_time">Full Time</Option>
                  <Option value="part_time">Part Time</Option>
                  <Option value="internship">Internship</Option>
                  <Option value="contract">Contract</Option>
                  <Option value="other">Other</Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="Job Place">
            {
              getFieldDecorator('place', {
                rules: [
                  { required: true, message: 'Required' }
                ]
              })(
                <Select style={{ width: '100%' }}>
                  <Option value="onsite">On site</Option>
                  <Option value="remote">Remote</Option>
                  <Option value="onsite_remote">Onsite/Remote</Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="Category">
            {
              getFieldDecorator('category', {
                rules: [
                  { required: true, message: 'Required' }
                ]
              })(
                <Select>
                  <Option value="tech">Tech</Option>
                  <Option value="design">Design</Option>
                  <Option value="business_dev">Business Development</Option>
                  <Option value="sales">Sales</Option>
                  <Option value="marketing">Marketing</Option>
                  <Option value="operations">Operations</Option>
                  <Option value="customer_support">Customer Support</Option>
                  <Option value="analyst">Analyst</Option>
                  <Option value="other">Other</Option>
                </Select>
              )
            }
          </Form.Item>

          <Form.Item label="Description" style={{ marginBottom: '10px' }}>
            {
              getFieldDecorator('description', {
                rules: [
                  { required: true, message: 'Required' }
                ]
              })(
                <TextArea
                  name="description"
                  rows={7}
                />
              )
            }
          </Form.Item>
          <Form.Item
            style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Button
              onClick={onPreviewClick}
              className="mr-one"
            >
              Preview
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              icon="cloud-server"
            >
              Post Job
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <style jsx>{`
        .button-container {
          display: flex;
        }
      `}</style>
    </Row>
  )
}

const wrappedJobForm = Form.create({
  name: 'JobForm'
})(JobForm)

export default wrappedJobForm
