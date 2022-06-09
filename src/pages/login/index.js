import React from 'react';
import { Row, Col, Form, Input, Button , message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

import { useGetCaptchaQuery , useFetchLoginMutation} from '../../store/loginApi'
import logoImg from '../../assets/-s-image.png'
import styles from './index.module.css'
import './square.css'

function LoginPage() {


  const navigate = useNavigate()
  const { data: captchaData, refetch: refetchCaptcha } = useGetCaptchaQuery();
  const [fetchLogin, loginResult] = useFetchLoginMutation();

  const { isLoading } = loginResult;


  // 验证码验证规则
  const handleVerfiCaptcha = (rule, value, callback) => {
    if (
      value &&
      value.toLocaleUpperCase() !== captchaData?.text.toLocaleUpperCase()
    ) {
      callback(new Error('Verification code error'));
    } else {
      callback();
    }
  };
  

  const onFinish = (values) => {
    fetchLogin(values).then(res => {
        if (res?.data?.code === 200) {
          message.success(res?.data?.message);
          navigate('/home')
        } else {
          message.error(res?.data?.message);
        }
    })
  };
  
  const onRefreshCatch = () => {
    refetchCaptcha()
  }


  return (
    <Row className={styles.container} align="middle">
    <Col span={5} />
    <Col span={14}>
      <div className={styles.loginContent}>
        <div className={styles.imgContent}>
          <img src={logoImg} alt="" />
        </div>
        <div className={styles.loginRight}>
          <div className={styles.loginForm}>
            <div className={styles.logTit}>login</div>
            <Row>
              <Col span={4} />
              <Col
                span={16}
                className={styles.title}
                style={{ textAlign: 'center' }}
              >
                Chenxing wallpaper
              </Col>
              <Col span={4} />
            </Row>
            <Row>
              <Col span={2} />
              <Col span={20} className={styles.title}>
                <div>
                  <Form
                    name="normal_login"
                    className="login-form"
                    size="large"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                  >
                    <Form.Item
                      name="userName"
                      initialValue={'lance'}
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Username!',
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="userCount:lance"
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      initialValue={'123456'}
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Password!',
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="passWord:123456"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Row>
                        <Col span={12}>
                          <Form.Item
                            name="captcha"
                            rules={[
                              {
                                required: true,
                                message: 'Please input your captcha!',
                              },
                              { validator: handleVerfiCaptcha },
                            ]}
                          >
                            <Input placeholder="captcha" />
                          </Form.Item>
                        </Col>
                        <Col span={12} style={{ textAlign: 'right' }}>
                          <Form.Item>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: captchaData?.data,
                              }}
                              onClick={onRefreshCatch}
                            ></div>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                        style={{ width: '100%' }}
                      >
                        Login
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
              <Col span={2} />
            </Row>
          </div>
        </div>
      </div>
      <div className="square">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="circle">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </Col>
    <Col span={5} />
  </Row>
  );
}

export default LoginPage;
