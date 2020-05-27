import React from 'react';
import MapItem from './MapItem';

export default {
  component: MapItem,
  title: 'Map Components',
};

export const mapItem = () => <div><MapItem text="10k" /><MapItem /></div>