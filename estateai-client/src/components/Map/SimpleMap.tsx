
import GoogleMapReact from 'google-map-react';
import React, { Component } from 'react';

const AnyReactComponent = (details: { text: string, lat: number, lng: number}) => <div>{details.text}</div>;

// interface SimpleMapProps {
//     defaultCenter?: any,
//     defaultZoom?: any,
// }

class SimpleMap extends Component<any> {
  static defaultProps = {
    defaultCenter: {
      lat: 32.0879267,
      lng: 34.8322654
    },
    defaultZoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '500px', width: '500px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAwNtnyyfWcM_TyD7m6WImqsL2Uae-x_5M' }}
          defaultCenter={this.props.defaultCenter}
          defaultZoom={this.props.defaultZoom}
          {...this.props}
      >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;