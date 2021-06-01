
import GoogleMapReact from 'google-map-react';
import React, { useEffect, useState } from 'react';

import { urlConstants } from '../../api_urls';
import { Neighborhood } from '../../models/neighborhood';
import SearchBtn from '../Searc/SearchBtn';
import SearchModal from '../Searc/SearchModal';
import MapSpot from './MapSpot';

interface SimpleMapProps {
    defaultCenter?: any,
    defaultZoom?: number,
    bedrooms?: string,
    year?: number,
    scoreType?:string
}

const SimpleMap = (props: SimpleMapProps) => {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    fetch(urlConstants.heatmapcordURL+"?year="+props.year)
      .then((response) => response.json())
      .then((data) => {
        setNeighborhoods(data.data)
      });
  }, [props.year])

  const getScore = (n: Neighborhood) => {
      if(props.scoreType == "By overall") {
        switch(props.bedrooms) {
          case "All": return n.GENERAL_SCORE;
          case "One": return n.ONEBR_GENERAL_SCORE;
          case "Two": return n.TWOBR_GENERAL_SCORE;
          case "Three": return n.THREEBR_GENERAL_SCORE;
          case "Four": return n.FOURBR_GENERAL_SCORE;
          case "Five": return n.FIVEBR_GENERAL_SCORE;
        }
      }
      else if(props.scoreType ==  "By percentage increase")
        switch(props.bedrooms) {
          case "All": return n.PRECENTAGE_SCORE;
          case "One": return n.ONEBR_PRECENTAGE_SCORE;
          case "Two": return n.TWOBR_PRECENTAGE_SCORE;
          case "Three": return n.THREEBR_PRECENTAGE_SCORE;
          case "Four": return n.FOURBR_PRECENTAGE_SCORE;
          case "Five": return n.FIVEBR_PRECENTAGE_SCORE;
        }
      else if(props.scoreType == "By precision") 
        switch(props.bedrooms) {
          case "All": return n.PERCISION_SCORE;
          case "One": return n.ONEBR_PERCISION_SCORE;
          case "Two": return n.TWOBR_PERCISION_SCORE;
          case "Three": return n.THREEBR_PERCISION_SCORE;
          case "Four": return n.FOURBR_PERCISION_SCORE;
          case "Five": return n.FIVEBR_PERCISION_SCORE;
        }
      else if(props.scoreType == "By sales") 
        switch(props.bedrooms) {
          case "All": return n.TREND_SCORE;
          case "One": return n.ONEBR_TREND_SCORE;
          case "Two": return n.TWOBR_TREND_SCORE;
          case "Three": return n.THREEBR_TREND_SCORE;
          case "Four": return n.FOURBR_TREND_SCORE;
          case "Five": return n.FIVEBR_TREND_SCORE;
        }
        else return "0";
    }
  return (
    <div style={{ height: '88vh', width: '100vw' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCULl-nlhWneAnyEm5MJ3SrxaYkp535r7Q' }}
        defaultCenter={props.defaultCenter}
        defaultZoom={props.defaultZoom}
      >
        {neighborhoods.map((n: any) =>{
          const score = getScore(n);
          return (<MapSpot
          lat={n.LAT}
          key={n.NEIGHBORHOOD_ID}
          lng={n.LONG}
          onClick={() => console.log('navigate to: ',n)}
          text={n.NEIGHBORHOOD}
          group={score}
          radius={100}
          neighborhood={n}
          bedrooms={props.bedrooms}
          scoreType={props.scoreType}
        />)})}
      </GoogleMapReact>
      <SearchBtn onClick={() => setOpen(true)} />
      <SearchModal open={open} setOpen={setOpen} />
    </div>
  );
}


SimpleMap.defaultProps = {
  defaultCenter: {
    lat: 32.0879267,
    lng: 34.8322654
  },
  defaultZoom: 14
};

export default SimpleMap;