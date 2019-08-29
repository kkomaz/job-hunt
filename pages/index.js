import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import Hero from '../components/hero'
import {
  Button,
  Card,
  Row,
  Col,
  Icon,
} from 'antd'

const Home = () => (
  <div>
    <Head title="Home" />
    <Nav />
    <Hero />
    <div className="container">
      <Row>
        <Col xs={22}>
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
        <Col xs={2}>
          Hello
        </Col>
      </Row>
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

export default Home
