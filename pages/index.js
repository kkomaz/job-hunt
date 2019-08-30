import Link from 'next/link'
import Head from '../components/head'
import {
  Button,
  Card,
  Row,
  Col,
  Icon,
} from 'antd'
import { UserSession, AppConfig } from 'blockstack'
import { User, getConfig } from 'radiks'

class Home extends React.Component {
  render() {
    return (
      <div>
        <Head title="Home" />
        <div className="container">
          <Row>
            <Col xs={18}>
              <Card bordered className="mt-one">
                <div>
                  <h2>Senior Solidity Engineer</h2>
                  <h3>The Arcadia Group</h3>
                  <div className="basic-details">
                    <div>
                      <Icon
                        className="mr-quarter"
                        type="calendar"
                      />
                      <span className="mr-one">August 25th 2019</span>
                    </div>
                    <div>
                      <Icon
                        className="mr-quarter"
                        type="clock-circle"
                      />
                      <span className="mr-one">Full Time</span>
                    </div>
                    <div>
                      <Icon
                        className="mr-quarter"
                        type="global"
                      />
                      <span>Remote</span>
                    </div>
                  </div>
                  <p className="mt-one mb-one">
                    Lorem ipsum dolor amet tattooed try-hard bespoke, keytar la croix keffiyeh craft beer live-edge humblebrag pitchfork four loko vaporware hella retro direct trade. Shabby chic echo park gochujang cardigan palo santo vaporware. Hoodie crucifix heirloom meggings poutine kogi. Palo santo jean shorts banjo tilde, subway tile cold-pressed messenger bag blog authentic irony direct trade. Readymade knausgaard microdosing lo-fi PBR&B, small batch sriracha truffaut hoodie umami af. Austin chartreuse artisan cold-pressed, post-ironic viral meditation live-edge selfies actually. Farm-to-table photo booth skateboard, hoodie humblebrag mumblecore shaman venmo palo santo.
                  </p>

                  <div className="card-buttons">
                    <Button className="mr-half" type="primary">
                      Read More
                    </Button>
                    <Button type="link">
                      Direct Job Link
                    </Button>
                  </div>
                </div>
              </Card>
              <Card bordered className="mt-one">
                <div>
                  <h2>Senior Solidity Engineer</h2>
                  <h3>The Arcadia Group</h3>
                  <div className="basic-details">
                    <div>
                      <Icon
                        className="mr-quarter"
                        type="calendar"
                      />
                      <span className="mr-one">August 25th 2019</span>
                    </div>
                    <div>
                      <Icon
                        className="mr-quarter"
                        type="clock-circle"
                      />
                      <span className="mr-one">Full Time</span>
                    </div>
                    <div>
                      <Icon
                        className="mr-quarter"
                        type="global"
                      />
                      <span>Remote</span>
                    </div>
                  </div>
                  <p className="mt-one mb-one">
                    Lorem ipsum dolor amet tattooed try-hard bespoke, keytar la croix keffiyeh craft beer live-edge humblebrag pitchfork four loko vaporware hella retro direct trade. Shabby chic echo park gochujang cardigan palo santo vaporware. Hoodie crucifix heirloom meggings poutine kogi. Palo santo jean shorts banjo tilde, subway tile cold-pressed messenger bag blog authentic irony direct trade. Readymade knausgaard microdosing lo-fi PBR&B, small batch sriracha truffaut hoodie umami af. Austin chartreuse artisan cold-pressed, post-ironic viral meditation live-edge selfies actually. Farm-to-table photo booth skateboard, hoodie humblebrag mumblecore shaman venmo palo santo.
                  </p>

                  <div className="card-buttons">
                    <Button className="mr-half" type="primary">
                      Read More
                    </Button>
                    <Button type="link">
                      Direct Job Link
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={6}>
              <div className="mt-one" style={{ padding: '0 20px' }}>
                <h3>Who are we?</h3>
                <p className="mb-one large">
                  JobStack is a open source platform to help developers find job in the crypto & blockchain space.
                </p>
                <p className="mb-one large">
                  Posting a job is completely <span className="green bold">FREE</span>.  All it requires is for you to sign up and create a Blockstack ID
                </p>
                <p className="mb-one large">
                  With the emergence of blockchain technology and decentralized applications, finding talented individuals to solve these problems will play a vital role to mass adoption.
                </p>

                <h3>Sponsors</h3>
                <p className="mb-one large">
                  Currently accepting sponsors to help promote blockchain jobs
                </p>
              </div>
            </Col>
          </Row>
        </div>

        <style jsx>{`
          .basic-details {
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }

          p {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }

          .card-buttons {
            display: flex;
          }

          .title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            line-height: 1.15;
          }
          .title,
          .description {
            text-align: center;
          }
          .row {
            max-width: 880px;
            margin: 80px auto 40px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
          .card {
            padding: 18px 18px 24px;
            width: 220px;
            text-align: left;
            text-decoration: none;
            color: #434343;
            border: 1px solid #9b9b9b;
          }
          .card:hover {
            border-color: #067df7;
          }
          .card h3 {
            margin: 0;
            color: #067df7;
            font-size: 18px;
          }
          .card p {
            margin: 0;
            padding: 12px 0 0;
            font-size: 13px;
            color: #333;
          }
        `}</style>
      </div>
    )
  }
}

export default Home
