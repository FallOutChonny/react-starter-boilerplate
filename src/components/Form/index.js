import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col, Card, CardBody } from 'reactstrap';
import FormTitle from './H4';
import FormBody from './Form';

const FormWrapper = styled.div.attrs({
  className: 'container h-100',
})`
  margin-top: 30px;

  div.card {
    border-color: transparent;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.05);
  }

  input.form-control {
    border-width: 2.3px;
  }
`;

export default class Form extends React.PureComponent {
  static propTypes = {
    onSubmitForm: PropTypes.func.isRequired,
    onChangeForm: PropTypes.func.isRequired,
    formName: PropTypes.string.isRequired,
    formState: PropTypes.shape({
      username: PropTypes.string,
      password: PropTypes.string,
    }).isRequired,
  };

  render() {
    const {
      formName,
      formState,
      onSubmitForm,
      onChangeForm,
      ...rest
    } = this.props;
    return (
      <FormWrapper>
        <Row className="justify-content-md-center h-100">
          <Col xs={12} sm={12} md={6} lg={4}>
            <Card>
              <CardBody>
                <FormTitle>{formName}</FormTitle>
                <FormBody
                  onSubmit={onSubmitForm}
                  onChange={onChangeForm}
                  data={formState}
                  name={formName}
                  {...rest}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </FormWrapper>
    );
  }
}
