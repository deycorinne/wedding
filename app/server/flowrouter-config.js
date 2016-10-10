import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
FlowRouter.setDeferScriptLoading( true );

const TEN_MINUTES = 1000 * 60 * 10;
FlowRouter.setPageCacheTimeout( TEN_MINUTES );
