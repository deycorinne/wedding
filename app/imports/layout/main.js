import React, { Component, PropTypes } from 'react';

export default class MainLayout extends Component {

  render() {
    return (
      <div>
        {this.props.content}
      </div>
    );
  }

}

MainLayout.propTypes = {
  content     : React.PropTypes.node,
};
