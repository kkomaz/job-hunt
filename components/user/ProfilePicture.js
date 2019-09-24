import { useEffect, useState } from 'react' 
import {
  Button,
} from 'antd'
import _ from 'lodash'
import { getConfig } from 'radiks'

export default function ProfilePicture({ user }) {
  const { userSession } = getConfig();
  const [userData, setUserData] = useState({})
  
  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData())
    }
  }, [])

  const changeProfilePicture = () => {
    window.open('https://browser.blockstack.org/profiles', '_blank');
  }

  return (
    <div className="image-container">
      <img
        src={_.get(user, 'profile.image[0].contentUrl', 'https://i.imgur.com/w1ur3Lq.jpg')}
        alt="profile"
        style={{
          width: '200px',
          height: '250px',
        }}
      />

      {
        userData.username === user.username &&
        <Button
          type="primary"
          className="mt-one"
          onClick={changeProfilePicture}
        >
          Edit Profile Picture
        </Button>
      }
      <style jsx>
        {`
          .image-container {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
          }
        `}
      </style>
    </div>
  )
}
