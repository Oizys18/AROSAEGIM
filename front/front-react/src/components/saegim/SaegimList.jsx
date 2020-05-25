import React, { Component } from "react";

class SaegimList extends Component {
  render() {
    const { children } = this.props;
    const childrenWithProps = React.Children.map(children, child => {
      if (!child.props.background) {
        return React.cloneElement(child, { background: this.props.background })
      }
      return child;
    });

    return (
      <div>
        {childrenWithProps}
      </div>
    )
  }
}

export default SaegimList;