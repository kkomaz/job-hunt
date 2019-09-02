import {
  Button,
  Card,
  Icon,
} from 'antd'
import Link from 'next/link'

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

  const goToDirect = () => {
     window.open(offer);
  }

  console.log(_id)

  return (
    <Card bordered>
      <div>
        <h2>{title}</h2>
        <h3>{company}</h3>
        <div className="basic-details">
          <div>
            <Icon
              className="mr-quarter"
              type="calendar"
            />
            <span className="mr-one">{date || Date.now()}</span>
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
  )
}

JobCard.defaultProps = {
  disableButtons: false,
}