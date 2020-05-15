import React from 'react';
// import { action } from '@storybook/addon-actions';
import HugeButton from './HugeButton';

export default {
  component: HugeButton,
  title: 'Button',
};

export const hugebtn = () => <HugeButton text="default-msg" />
