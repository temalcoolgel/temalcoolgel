// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import Footer from "components/Footer/Footer.js";
import MapContainer from "components/GoogleMaps/Map.js";
import React from "react";
export default function MapPage() {
  // const useStyles = makeStyles(styles);
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <MapContainer></MapContainer>
        </Grid>
        <Grid item xs={12}>
          <Footer fixed />
        </Grid>
      </Grid>
    </div>
  );
}
