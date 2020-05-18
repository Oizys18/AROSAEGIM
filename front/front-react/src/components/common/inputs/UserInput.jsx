import React, { Component } from 'react';
import styled from 'styled-components';
import { TextField, InputAdornment, Zoom } from '@material-ui/core';

class UserInput extends Component {
  render(){
    return(
      <StInput
        variant="outlined"
        margin="dense"
        error={this.props.valid === 'invalid'}
        id={this.props.id}
        type={this.props.id === 'pw' ? 'password' : 'text'}
        label={this.props.label}
        valid={this.props.valid}
        value={this.props.value}
        onChange={this.props.onChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {this.props.icon}
            </InputAdornment>
          ),
        }}
      />
    )
  }

} export default UserInput;

const StInput = styled(TextField)`
  label {
    color: ${props => {
      if (props.valid === 'valid'){
        return 'blue'
      }
      else if (props.valid === 'invalid') {
        return 'red'
      }
      return 'gray'
    }}
  }
`;