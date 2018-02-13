import React from 'react';
import styled from 'styled-components';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { hot } from 'react-hot-loader';
import Title from './Title';

const LoginWrapper = styled.div.attrs({
  className: 'container h-100',
})`
  margin-top: 30px;
`;

function Login() {
  return (
    <LoginWrapper>
      <Row className="justify-content-md-center h-100">
        <Col xs={12} sm={12} md={6} lg={4}>
          <Card className="fat">
            <CardBody>
              <Title>Login</Title>
              <form method="POST">
                <div className="form-group">
                  <label htmlFor="email" className="w-100">
                    E-Mail Address
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      name="email"
                      value=""
                      required
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    Password
                    <a href="forgot.html" className="float-right">
                      Forgot Password?
                    </a>
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    data-eye
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="remember">
                    <input type="checkbox" name="remember" /> Remember Me
                  </label>
                </div>

                <div className="form-group no-margin">
                  <button type="submit" className="btn btn-primary btn-block">
                    Login
                  </button>
                </div>
                <div className="margin-top20 text-center">
                  Dont have an account? <a href="register.html">Create One</a>
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </LoginWrapper>
  );
}

export default hot(module)(Login);
