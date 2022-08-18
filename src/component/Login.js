import { Input, Button, Form, Alert, message } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.min.css';

export default function Login() {

  const navigate = useNavigate();
  const onFinish = (values) => {
    const userid = values.userid
    const userpwd = values.userpwd
    fetch("/api/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: userid,
        password: userpwd
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.code === 405) {
          navigate(`/main/${userid}`)
        } else {
          alert(data.message)
        }
      })
  };

  return (
    <div>
      <div className='login-container' style={{ width: 400, height: 300, textAlign: 'center' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 32, fontSize: 30 }} className='centerName'>더큰내일 회의실 예약 시스템</h1>
        <Form
          onFinish={onFinish}
        >
          <Form.Item
            name="userid"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              }
            ]}>
            <Input autoComplete='off' size='large' placeholder='Account ID' prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="userpwd"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}>
            <Input autoComplete='off' type="password" size='large' placeholder='Password' prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button size='large' style={{ width: '100%' }} type="primary" htmlType="submit" >
              Login
            </Button>
          </Form.Item>
        </Form>
      
      </div>
    </div>
  )
}
