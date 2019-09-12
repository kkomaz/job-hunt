import {
  Button,
  Card,
  Icon,
} from 'antd'
import Link from 'next/link'
import { convertDate } from '../utils'

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
  other: 'Other'
}

export default function JobCard(props) {
  const {
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
  } = props.params

  const { className } = props

  const goToDirect = () => {
    if (offer.includes('http')) {
      window.open(offer, '_blank')
    } else {
      window.open(`https://${offer}`, '_blank')
    }
  }

  return (
    <Card
      className={className}
      bordered
    >
      <div>
        <h2>{title}</h2>
        <h3>{company}</h3>
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
        <p className="mt-one mb-one">
          {description}
        </p>

        <div className="card-buttons">
          <Button
            type="primary"
            disabled={disableButtons}
            onClick={goToDirect}
            size="large"
          >
            Go to the offer!
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
          justify-content: center;
        }
      `}</style>
    </Card>
  )
}

JobCard.defaultProps = {
  disableButtons: false,
}