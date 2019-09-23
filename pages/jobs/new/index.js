import { useState } from 'react';
import {
  Card,
  Button,
  Row,
  Col
} from 'antd';
import JobForm from '../../../components/jobForm';
import JobCard from '../../../components/jobCard';

export default function JobsNew() {
  const [preview, setPreview] = useState(false);
  const [jobParams, setJobParams] = useState({});

  const showPreview = () => {
    setPreview(true);
  };

  return (
    <div className="container mt-one">
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
              <JobCard
                params={jobParams}
              />
            </Col>
          }
        </div>
      </Row>
      <style jsx>{`
        .job-container {
          display: flex;
          justify-content: center;
        }
      `}
      </style>
    </div>
  );
}
