import DefaultButton from '../../components/common/buttons/DefaultButton'
import { FlexRow, FlexColumn } from '../DispFlex'
import styled from 'styled-components';
// import { IconButton } from '@material-ui/core';

export const StFormCont = styled(FlexColumn)`
  position: relative;
  /* background: linear-gradient(to bottom, #ffffcc 0%, #ff9999 100%); */
  /* height: 100vh; */
  height: ${props => props.height}px;
`;

// export const StBackBtn = styled(IconButton)`
//   position: absolute;
//   z-index: 1;
//   top: 0;
//   left: 0;
// `;

export const StBtnCont = styled(FlexRow)`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 16px;
`;

export const StBtn = styled(DefaultButton)`

`;

export const StLinkCont = styled(FlexColumn)`

`;

export const StMsg = styled.div`

`;