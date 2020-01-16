import React from 'react';
import ReactDOM from 'react-dom';
import { provided } from '../../testUtils';
import NavBar from './NavBar';

test('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(provided(<NavBar />), div);
});
