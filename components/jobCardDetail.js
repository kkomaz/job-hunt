import { useState } from 'react';
import {
  Button,
  Card,
  Icon,
  Modal
} from 'antd';
import Router from 'next/router';
import Link from 'next/link';
import Job from '../model/job';
import { convertDate } from '../utils';
import JobForm from './jobForm';

const key = {
  full_time: 'Full Time',
  part_time: 'Part Time',
  internship: 'Internship',
  contract: 'Contract',
  other: 'Other',
  onsite: 'On Site',
  remote: 'Remote',
  onsite_remote: 'Onsite/Remote',
  tech: 'Tech',
  design: 'Design',
  business_dev: 'Business Development',
  sales: 'Sales',
  marketing: 'Marketing',
  operation: 'Operations',
  customer_support: 'Customer Support',
  analyst: 'Analyst',
  other: 'Other',
};

export default function JobCard(props) {
  const {
    creator,
    _id,
    company,
    location,
    title,
    offer,
    type,
    place,
    category,
    description,
    date,
    disableButtons,
  } = props.params;

  const {
    className,
    isSignedIn,
    userData,
  } = props;

  const [visible, setVisible] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const goToDirect = () => {
    if (offer.includes('http')) {
      window.open(offer, '_blank');
    } else {
      window.open(`https://${offer}`, '_blank');
    }
  };

  const handleCancel = e => {
    setVisible(false);
  };

  const deleteJobPost = async () => {
    const searchedJob = await Job.findById(_id);
    await searchedJob.destroy();
    Router.push('/');
  };

  return (
    <>
      <Card
        className={className}
        bordered
      >
        <div>
          <h2>{title}</h2>
          <h3>{company}</h3>
          <h4>
            Found by &nbsp;
            <Link href="users/_id" as={`/users/${creator}`}>
              <a style={{ fontSize: '14px' }}>{creator}</a>
            </Link>
          </h4>
          <div className="basic-details">
            <div>
              <Icon
                className="mr-quarter"
                type="calendar"
              />
              <span className="mr-one">
                {convertDate(date) || Date.now()}
              </span>
            </div>
            <div>
              <Icon
                className="mr-quarter"
                type="clock-circle"
              />
              <span className="mr-one">{key[type]}</span>
            </div>
            <div>
              <Icon
                className="mr-quarter"
                type="global"
              />
              <span className="mr-one">{key[place]}</span>
            </div>
            <div>
              <Icon
                className="mr-quarter"
                type="global"
              />
              <span>{location}</span>
            </div>
          </div>
          <p
            className="mt-one mb-one"
            style={{
              whiteSpace: 'pre-line',
            }}
          >
            {description}
          </p>

          <div className="card-buttons">
            <Button
              type="primary"
              disabled={disableButtons || submitting}
              onClick={goToDirect}
              size="large"
            >
              Go to the offer!
            </Button>
            {
              isSignedIn && creator === userData.username &&
              <Button
                className="ml-one"
                type="link"
                disabled={disableButtons || submitting}
                onClick={() => setVisible(true)}
                size="large"
              >
                Edit
              </Button>
            }
            {
              isSignedIn && creator === userData.username &&
              <Button
                type="danger"
                onClick={() => setShowDeleteConfirm(true)}
                size="large"
                disabled={submitting}
              >
                Delete
              </Button>
            }
          </div>
          {
            showDeleteConfirm && <div className="self-centered mt-two">
              <p>
                Are you sure you want to delete this job post?
              </p>
              <Button
                disabled={submitting}
                type="link"
                onClick={deleteJobPost}
              >
                Yes
              </Button>
              <Button
                disabled={submitting}
                onClick={() => setShowDeleteConfirm(false)}
                type="link"
              >
                No
              </Button>
            </div>
          }
        </div>
        <style jsx>{`
          .basic-details {
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }

          .card-buttons {
            display: flex;
            justify-content: center;
          }
        `}</style>
      </Card>
      <Modal
        title="Basic Modal"
        visible={visible}
        footer={null}
        onCancel={handleCancel}
        centered
      >
        <JobForm
          currentJob={props.params}
          onCancel={handleCancel}
          editMode
        />
      </Modal>
    </>
  );
}

JobCard.defaultProps = {
  disableButtons: false,
};
