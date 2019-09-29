import { notification } from 'antd';

const keys = {
  success: 'Success!',
  warning: 'Warning!',
  error: 'Error!',
}

const openNotificationWithIcon = (type, description) => {
  notification[type]({
    message: keys[type],
    description,
  });
};

export default openNotificationWithIcon
