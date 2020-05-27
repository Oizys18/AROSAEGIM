import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { TextField, InputAdornment } from '@material-ui/core';

class UserInput extends Component {
  render(){
    
    return(
      <StInput
        variant="outlined"
        margin="dense"
        error={this.props.valid === 'invalid'}
        id={this.props.id}
        type={this.props.id.includes('pw') ? 'password' : 'text'}
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
    if(props.valid === 'init'){
      return css`
        .MuiInputBase-root{
          color: gray;
        }
        & .Mui-focused{
          &.MuiFormLabel-root, .MuiSvgIcon-root{
            color: green;
          }
        }
        & .MuiOutlinedInput-root.Mui-focused fieldset{
          border-color: green;  
        }
      `
    }
    else if(props.valid === 'invalid'){
      return css`
        .MuiSvgIcon-root{
          color: red;
        }
      `
    }
    else if(props.valid === 'valid'){
      return css`
        .MuiFormLabel-root,.MuiSvgIcon-root{
          color: green;
        }
        & .MuiOutlinedInput-root fieldset, & .MuiOutlinedInput-root.Mui-focused fieldset{
          border-color: green;
        }
      `
    }
  }}
`;