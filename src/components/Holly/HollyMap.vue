<template>
  <div class="map">
    <div class="google-map" ref="googleMap"></div>
  </div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";
import { mapStyles } from "./constants/mapSettings.js";
import { API_KEY } from "./constants/config.js";
import { CLIENT_ID } from "./constants/config.js";
import { CLIENT_SECRET } from "./constants/config.js";
import { API_CATEGORIES } from "./constants/data.js";
import { CENTER_POSITION } from "./constants/data.js";
import { CENTER_LAT_LONG } from "./constants/data.js";
import { SEARCH_RADIUS } from "./constants/data.js";
import { DEFAULT_ZOOM } from "./constants/data.js";
import { MARKER_ZOOM } from "./constants/data.js";
import { setTimeout } from "timers";

export default {
  name: "HollyMap",
  props: {
    landing: Boolean,
    category: "",
    markerIsActive: Boolean,
    searchQuery: ""
  },
  data() {
    return {
      google: null,
      map: null,
      apiKey: API_KEY,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      markers: []
    };
  },
  computed: {
    ALL_CATEGORIES: function() {
      let that = this;
      let categories = "";
      $.each(API_CATEGORIES, function(i, category) {
        categories += category.categories + ",";
      });
      return categories;
    }
  },
  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey,
      libraries: ["places"]
    });
    this.google = googleMapApi;
    this.initializeMap();
  },
  watch: {
    category: function() {
      if (this.category != null) {
        this.refreshMap();
        this.getData();
      }
    },
    landing: function() {
      this.initializeMap();
    },
    markerIsActive: function() {
      if (!this.markerIsActive) {
        this.map.setZoom(DEFAULT_ZOOM);
      }
    },
    searchQuery: function() {
      if (this.searchQuery.replace(/\s+/g, "") != "") {
        this.searchForQuery();
      } else {
        this.refreshMap();
      }
    }
  },
  methods: {
    refreshMap() {
      this.map.getStreetView().setVisible(false);
      this.deleteMarkers();
      this.$emit("$setMarkerFalse");
      this.map.setZoom(DEFAULT_ZOOM);
      this.map.setCenter({ lat: CENTER_LAT_LONG[0], lng: CENTER_LAT_LONG[1] });
    },
    initializeMap() {
      const mapContainer = this.$refs.googleMap;
      this.map = new this.google.maps.Map(mapContainer, {
        zoom: DEFAULT_ZOOM,
        mapTypeControl: true,
        mapTypeControlOptions: {
          position: this.google.maps.ControlPosition.TOP_RIGHT
        },
        fullscreenControl: true,
        fullscreenControlOptions: {
          position: this.google.maps.ControlPosition.TOP_RIGHT
        },
        streetViewControl: true,
        streetViewControlOptions: {
          position: this.google.maps.ControlPosition.RIGHT_TOP
        },
        zoomControl: true,
        zoomControlOptions: {
          position: this.google.maps.ControlPosition.RIGHT_BOTTOM
        },
        center: { lat: CENTER_LAT_LONG[0], lng: CENTER_LAT_LONG[1] },
        styles: mapStyles
      });
      this.map.getStreetView().setOptions({
        addressControlOptions: {
          position: this.google.maps.ControlPosition.TOP_CENTER
        },
        panControlOptions: {
          position: this.google.maps.ControlPosition.RIGHT_TOP
        }
      });
    },
    getData() {
      this.$http
        .get(
          "https://api.foursquare.com/v2/venues/search?" +
            "ll=" +
            CENTER_POSITION +
            "&categoryId=" +
            API_CATEGORIES[this.category].categories +
            "&radius=" +
            SEARCH_RADIUS +
            "&client_id=" +
            this.clientID +
            "&client_secret=" +
            this.clientSecret +
            "&v=20190404"
        )
        .then(function(result) {
          this.addMarkers(result);
        });
    },
    addMarkers(data) {
      let that = this;
      let markers = data.body.response.venues;
      $.each(markers, function(i, marker) {
        let newMarker = new that.google.maps.Marker({
          position: { lat: marker.location.lat, lng: marker.location.lng },
          map: that.map,
          id: marker.id,
          // category: marker.categories[0].name,
          name: marker.name,
          icon: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
        });
        newMarker.addListener("click", function(evt) {
          // Smooth transition here somehow
          if (that.map.getZoom() == MARKER_ZOOM && that.map.getCenter() == newMarker.getPosition()) {
            that.map.setZoom(DEFAULT_ZOOM);
            that.$emit("$setMarkerFalse");
          }else {
            that.map.setZoom(MARKER_ZOOM);
            that.getGooglePlaceId(newMarker.name);
            that.map.setCenter(newMarker.getPosition());
          }
        });
        that.markers.push(newMarker);
      });
    },
    deleteMarkers() {
      let that = this;
      $.each(that.markers, function(i, marker) {
        marker.setMap(null);
      });
      this.markers = [];
    },
    getGooglePlaceId(name) {
      let that = this;
      let query = {
        query: name,
        locationBias: {
          radius: 50000,
          center: { lat: CENTER_LAT_LONG[0], lng: CENTER_LAT_LONG[1] }
        },
        fields: ["place_id"]
      };
      let service = new google.maps.places.PlacesService(this.map);
      service.findPlaceFromQuery(query, function(results, status) {
        if (status === that.google.maps.places.PlacesServiceStatus.OK) {
          let id = results[0].place_id;
          that.getGooglePlaceDetails(id);
        } else {
          console.log("Not found!");
        }
      });
    },
    getGooglePlaceDetails(id) {
      let that = this;
      let request = {
        placeId: id
      };
      let service = new that.google.maps.places.PlacesService(this.map);
      service.getDetails(request, callback);
      function callback(place, status) {
        let placeData = {};
        if (status === that.google.maps.places.PlacesServiceStatus.OK) {
          if (place.name) {
            placeData.name = place.name;
          }
          if (place.formatted_phone_number) {
            placeData.phoneNumber = place.formatted_phone_number;
          }
          if (place.opening_hours) {
            placeData.openNow = place.opening_hours.open_now;
          }
          if (place.opening_hours) {
            placeData.openTimes = place.opening_hours.weekday_text;
          }
          if (place.formatted_address) {
            placeData.address = place.formatted_address;
          }
          if (place.user_ratings_total) {
            placeData.userRatings = place.user_ratings_total;
          }
          if (place.distance) {
            placeData.distance = place.distance;
          }
          if (place.website) {
            placeData.website = place.website;
          }
          if (place.photos) {
            placeData.photos = place.photos;
          }
          if (place.rating) {
            placeData.rating = place.rating;
          }
          if (place.reviews) {
            placeData.reviews = place.reviews;
          }
        }
        that.$emit("$markerClicked", placeData);
      }
    },
    searchForQuery: function() {
      this.$emit("$setLandingFalse");
      this.refreshMap();
      this.$http
        .get(
          "https://api.foursquare.com/v2/venues/search?" +
            "ll=" +
            CENTER_POSITION +
            "&radius=" +
            SEARCH_RADIUS +
            "&query=" +
            this.searchQuery +
            "&categoryId=" +
            this.ALL_CATEGORIES +
            "&client_id=" +
            this.clientID +
            "&client_secret=" +
            this.clientSecret +
            "&v=20190404"
        )
        .then(function(result) {
          console.log(result);
          this.deleteMarkers();
          this.addMarkers(result);
        });
    }
  }
};
</script>

<style scoped>
.google-map {
  width: 100vw;
  min-height: 100vh;
  position: relative;
  z-index: 1;
  top: 0;
  left: 0;
}
</style>