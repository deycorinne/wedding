import React from 'react';
import Router from '../router';
import App from '../ui/landing';

Router.route( {
  path: '/',
  name: 'home',
  component: App
});
