import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { TextField, InputAdornment, } from '@material-ui/core';
import { Email } from '@material-ui/icons';

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
              <div style={{position: 'relative'}}>
                {this.props.icon}
              </div>
            </InputAdornment>
          ),
        }}
      />
    )
  }

} export default UserInput;

const StInput = styled(TextField)`

  ${props => {
    if(props.valid === 'invalid'){
    }
    else{
      return(css`
        label{
          color: gray;
        }
        label.Mui-focused{
          color: skyblue;
        }
        

      `)
    }
  }}
`;