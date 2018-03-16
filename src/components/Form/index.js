import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FormTitle from './H4';
import FormBody from './Form';

const FormWrapper = styled.div`
  width: 400px;
  flex: 1 1 auto;
  padding: 3rem;
  margin: 0 auto;
  margin-top: 30px;
  border-color: transparent;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.05);

  div.form-group {
    margin-bottom: 1rem;
  }

  div.alert {
    position: relative;
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    transition: opacity 0.15s linear;
  }

  div.alert.alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }

  label {
    display: inline-block;
    width: 100%;
    margin-bottom: 0.5rem;
  }

  input {
    display: block;
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    line-height: 1.25;
    color: #495057;
    background-color: #fff;
    background-image: none;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    margin-top: 0.5rem;

    &:focus {
      color: #495057;
      background-color: #fff;
      border-color: #80bdff;
      outline: 0;
    }

    border-width: 2.3px;
  }

  .text-center {
    text-align: center;
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
        <FormTitle>{formName}</FormTitle>
        <FormBody
          onSubmit={onSubmitForm}
          onChange={onChangeForm}
          data={formState}
          name={formName}
          {...rest}
        />
      </FormWrapper>
    );
  }
}
