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
  background: rgba(251, 242, 238, 1);
  
  /* background: rgba(0, 0, 0, 0.7); */
  padding: 16px;
  border-radius: 10px;
`;

export const StBtnCont = styled(FlexRow)`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 16px;

  .MuiButtonBase-root{
    background: linear-gradient(to top right,#F8DCD4 0%,#FAE7E1 100%);
    color: #404040;
  }
`;

export const StBtn = styled(DefaultButton)`
  
`;

export const StLinkCont = styled(FlexColumn)`
  align-self: flex-end;

  a{
    font-weight: bold;
    font-size: 110%;
    text-decoration: none;
    &:visited, &:link{
      color: #B98B82;
    }
  }
`;

export const StMsg = styled.div`

`;