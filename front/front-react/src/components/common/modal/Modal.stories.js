import React from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import Modal from './Modal';

export default {
  component: Modal,
  title: 'Modal',
};

export const modal = () => 
  <StylesProvider injectFirst>
    <Modal on={true} confirm msg={'모달 메세지'}/>
  </StylesProvider>
