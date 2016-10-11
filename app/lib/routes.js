import React from 'react';
import Router from './router';
import App from '../imports/ui/landing';

Router.route( {
  path: '/',
  name: 'home',
  component: App
});
