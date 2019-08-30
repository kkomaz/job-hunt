import {
  Card,
  Checkbox,
  Icon,
  Input,
  Form,
  Button,
  Row,
  Col,
  Select,
} from 'antd'

const { Option } = Select;

const { TextArea } = Input;


function JobForm(props) {
  const {
    form: { getFieldDecorator, validateFields }
  } = props

  const handleSubmit = (e, preview) => {
    console.log(preview, 'preview')
    e.preventDefault()

    validateFields((err, values) => {
      if (!err && preview) {
        props.showPreview()
      }

      if (!err) {
        console.log(values);
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
              getFieldDecorator('company_name', {
                rules: [
                  { required: true, message: 'Required' }
                ]
              })(
                <Input
                  name="company_name"
                />
              )
            }
          </Form.Item>
          <Form.Item label="Company location" style={{ marginBottom: '10px' }}>
            {
              getFieldDecorator('company_location', {
                rules: [
                  { required: true, message: 'Required' }
                ]
              })(
                <Input
                  name="company_location"
                />
              )
            }
          </Form.Item>
          <Form.Item label="URL of the offer" style={{ marginBottom: '10px' }}>
            {
              getFieldDecorator('company_offer', {
                rules: [
                  { required: true, message: 'Required' }
                ]
              })(
                <Input
                  name="company_offer"
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
                  <Option value="1">Full Time</Option>
                  <Option value="2">Part Time</Option>
                  <Option value="3">Internship</Option>
                  <Option value="4">Contract</Option>
                  <Option value="5">Other</Option>
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
                  <Option value="1">On site</Option>
                  <Option value="2">Remote</Option>
                  <Option value="3">Onsite/Remote</Option>
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
                  <Option value="1">Tech</Option>
                  <Option value="2">Design</Option>
                  <Option value="3">Business Development</Option>
                  <Option value="4">Sales</Option>
                  <Option value="5">Marketing</Option>
                  <Option value="6">Operations</Option>
                  <Option value="7">Customer Support</Option>
                  <Option value="8">Analyst</Option>
                  <Option value="9">Other</Option>
                </Select>
              )
            }
          </Form.Item>

          <Form.Item label="Description" style={{ marginBottom: '10px' }}>
            {
              getFieldDecorator('company_description', {
                rules: [
                  { required: true, message: 'Required' }
                ]
              })(
                <TextArea
                  name="company_description"
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
