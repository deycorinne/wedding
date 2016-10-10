import React, { Component, PropTypes } from 'react';

export default class MainLayout extends Component {

  render() {
    return (
      <div>
        <head>
          <title>Corinne & Devon</title>
        </head>

        <body>
          {this.props.content}
        </body>
      </div>
    );
  }

}

MainLayout.propTypes = {
  content     : React.PropTypes.node,
};
