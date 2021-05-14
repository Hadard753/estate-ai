
import GoogleMapReact from 'google-map-react';
import React from 'react';

interface GoogleMapProps {
  children?: any,
  defaultZoom?: any,
  defaultCenter?: any,
  heatmap?: any,
  bootstrapURLKeys?: any
}

const GoogleMap = ({ children, ...props }: GoogleMapProps) => (
  <div style={{width: '500px', height: '500px'}}>
    <GoogleMapReact
      bootstrapURLKeys={{
        key: 'AIzaSyAwNtnyyfWcM_TyD7m6WImqsL2Uae-x_5M',
      }}
      {...props}
    >
      {children}
    </GoogleMapReact>
  </div>
);

GoogleMap.defaultProps = {
  children: null,
};

export default GoogleMap;
