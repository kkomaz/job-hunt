import {
  Button,
  Card,
  Icon
} from 'antd';
import Link from 'next/link';
import { convertDate } from '../utils';

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
    _id,
    company,
    creator,
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
    shortened,
    empty,
  } = props;

  const goToDirect = () => {
    if (offer.includes('http')) {
      window.open(offer, '_blank');
    } else {
      window.open(`https://${offer}`, '_blank');
    }
  };

  const filterJobDescription = (desc) => {
    if (empty) {
      return '';
    }

    if (shortened) {
      return (`${desc.substring(0, 250)}...`);
    }

    return desc;
  };


  return (
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
            whiteSpace: 'pre-wrap',
          }}
        >
          {filterJobDescription(description)}
        </p>

        <div className="card-buttons">
          <Link href="jobs/_id" as={`/jobs/${_id}`}>
            <Button className="mr-half" type="primary" disabled={disableButtons}>
              Read More
            </Button>
          </Link>
          <Button type="link" disabled={disableButtons} onClick={goToDirect}>
            Direct Job Link
          </Button>
        </div>
      </div>
      <style jsx>{`
        .basic-details {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .card-buttons {
          display: flex;
        }
      `}</style>
    </Card>
  );
}

JobCard.defaultProps = {
  disableButtons: false,
  shortened: false,
  empty: false,
};
