import React from "react";
import CountUp from "react-countup";
import VisibilitySensor from 'react-visibility-sensor';

class Counter extends React.Component {

  state = {
    didViewCountUp: false
  };


  onVisibilityChange = isVisible => {
    if (isVisible) {
      this.setState({ didViewCountUp: true });
    }
    return 'start'
  }

  render() {
    const { end = 20 } = this.props
    return (<>
      <div className='text-center'>
        <CountUp end={this.state.didViewCountUp ? parseInt(end) : 0} redraw={true} duration={6} onEnd={() => false} suffix=" K">
          {({ countUpRef, start }) => (
            <VisibilitySensor onChange={this.onVisibilityChange} offset={{
              top:
                10
            }} delayedCall>
              <span ref={countUpRef} />
            </VisibilitySensor>
          )}
        </CountUp>
      </div>
    </>
    );
  }
}
export default Counter;