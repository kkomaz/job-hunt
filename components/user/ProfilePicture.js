import _ from 'lodash'

export default function ProfilePicture({ user }) {
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

      <style jsx>
        {`
          .image-container {
            display: flex;
            justify-content: center;
          }
        `}
      </style>
    </div>
  )
}
