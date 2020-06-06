import DefaultButton from '../../components/common/buttons/DefaultButton'
import { FlexRow, FlexColumn } from '../DispFlex'
import styled from 'styled-components';
// import { IconButton } from '@material-ui/core';

export const StWraper = styled(FlexRow)`
  position: relative;
  overflow: hidden;
  /* height: ${props => props.height}px; */
  height: 100vh;
`;

export const StFormCont = styled(FlexColumn)`
  /* position: relative; */
  /* height: 100vh; */
  height: ${props => props.height}px;
  background: rgba(255, 255, 255, 0.9);
  /* background: linear-gradient(to bottom right, #ffcc66 0%, #ff9999 100%); */
  
  /* background: rgba(0, 0, 0, 0.7); */
  padding: 16px;
  border-radius: 10px;
`;

export const StBtnCont = styled(FlexRow)`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 16px;
`;

export const StBtn = styled(DefaultButton)`
`;

export const StLinkCont = styled(FlexColumn)`
  align-self: flex-end;

  a{
    font-weight: bold;
    text-decoration: none;
    &:visited, &:link{
      color: #0066cc;
    }
  }
`;

export const StMsg = styled.div`

`;