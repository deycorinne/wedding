import React from 'react';
import MainLayout from './layout/main.js';
import { _ } from 'lodash';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';

class RouterClass {
  constructor() {
    this.routes = {};
  }

  route ( config ) {
    const layout = config.layout || MainLayout;
    const name = config.name;
    if ( !name ) throw new Error('Route cannot be created without a name.');
    if( this.routes[name] ) throw new Error(`Route with name ${name} already exists.`);

    if ( !config.component ) throw new Error('Route cannot be created without a component.');
    const Component = config.component;
    const action = ( params, query ) => {
      const props = {};
      if ( config.props ) _.assign( props, config.props );
      _.assign( props, params );
      if ( config.query ) props.query = query;
      mount( layout, { content : <Component {...props} /> } );
   };

   let path = config.path;
   if ( ! path ) path = `/${name}`;

   FlowRouter.route( path, { name, action } );
   config.name = name;
   config.path = path;

   this.routes[ name ] = config;
 }

 path( name ) {
   return FlowRouter.path( name );
 }

 go( path ){
   return FlowRouter.go( path );
 }
}

const Router = new RouterClass();
export default Router;
