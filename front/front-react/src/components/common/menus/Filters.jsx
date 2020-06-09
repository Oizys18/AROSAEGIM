import React, { Component } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';

import styled from 'styled-components';
import { Collapse, Select, MenuItem } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { setPrimaryColor } from '../../../styles/MuiStyles';
import { FlexRow } from '../../../styles/DispFlex';

class Filters extends Component {
  constructor(props){
    super(props);
    this.state = {
      collapseIn: false,
    }
  }

  handleSimpleTime = (e) => {
    const _handleFilter = this.props.handleFilter
    const _term = e.target.value
    const _eTime = new Date()
    let _sTime = new Date()
    _sTime.setHours(_eTime.getHours() - _term)
    _handleFilter.handleTerm(_term)
    _handleFilter.handleSTime(_sTime)
    _handleFilter.handleETime(_eTime)
  }
  hendleDetailTime = (id, e) => {
    const _handleFilter = this.props.handleFilter
    if(id === 'sTime'){
      _handleFilter.handleSTime(e)
    }
    else if(id === 'eTime'){
      _handleFilter.handleETime(e)
    }
  } 

  render(){
    const filterId = this.props.id
    return(
    <>
      <Collapse in={this.props.on} collapsedHeight={40}>
        <StCont>
        <StTitle id={filterId} onClick={this.props.tgleMenu}>
          <div>{this.props.txt}</div>
          {this.props.icon}
        </StTitle>
        <StSettingCont>
          {filterId === 'simple' &&
            <StSimpleCont>
              <ThemeProvider theme={setPrimaryColor}>
                <Select
                  autoWidth
                  variant='outlined'
                  margin="dense"
                  value={this.props.filterVal.term}
                  onChange={this.handleSimpleTime}
                >
                  <MenuItem value={0}>전체</MenuItem>
                  <MenuItem value={168}>일주일</MenuItem>
                  <MenuItem value={24}>하루</MenuItem>
                  <MenuItem value={12}>12시간</MenuItem>
                  <MenuItem value={6}>6시간</MenuItem>
                  <MenuItem value={3}>3시간</MenuItem>
                </Select>
              </ThemeProvider>
              {
                this.props.filterVal.term === 0 ?
                <>보기</>
                :
                <>전 부터 보기</>
              }
            </StSimpleCont>
          }
          {filterId === 'detail' &&
            <ThemeProvider theme={setPrimaryColor}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  margin="dense"
                  id="sTime"
                  label="시작"
                  format="yyyy/MM/dd  a hh:mm"
                  inputVariant="outlined"
                  disableFuture
                  showTodayButton
                  maxDate={this.props.filterVal.eTime}
                  maxDateMessage="과거가 현재보다 느릴 수는 없습니다..."
                  value={this.props.filterVal.sTime}
                  onChange={(e)=>{this.hendleDetailTime('sTime', e)}}
                />
                <DateTimePicker
                  margin="dense"
                  id="eTime"
                  label="끝"
                  format="yyyy/MM/dd  a hh:mm"
                  inputVariant="outlined"
                  disableFuture
                  showTodayButton
                  value={this.props.filterVal.eTime}
                  onChange={(e)=>{this.hendleDetailTime('eTime', e)}}
                />
              </MuiPickersUtilsProvider>
            </ThemeProvider>
          }
          
        </StSettingCont>
        </StCont>
      </Collapse>
    </>
    )
  }
} export default Filters;

const StCont = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 8px; */

  *{
    color: gray;
  }
`;

const StTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px;

  *{
    color: gray;
  }
`;

const StSettingCont = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
`;

const StSimpleCont = styled(FlexRow)`
  .MuiInputBase-root{
    margin-right: 8px;
  }
`;
