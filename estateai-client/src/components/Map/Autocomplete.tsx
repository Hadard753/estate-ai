import React from 'react';

import { TextField } from '@material-ui/core';

declare var google;
class AutoComplete extends React.Component<any,any> {
  autocomplete;

  constructor(props) {
    super(props)
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
    this.autocomplete = null;
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})

    this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
  }

  handlePlaceSelect() {
    const addressObject = this.autocomplete.getPlace()
    const lat = addressObject.geometry.location.lat();
    const lng = addressObject.geometry.location.lng();
    this.props.handleCoordinates({ lat, lng });
  }

  render() {
    return(
        <TextField
          id="autocomplete"
          label="Address"
          className="input-field"
          variant="outlined" />
    )
  }

}

export default AutoComplete