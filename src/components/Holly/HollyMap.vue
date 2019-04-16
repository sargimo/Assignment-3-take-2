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
import { CURRENT_LOCATION } from "./constants/data.js";
import { DEFAULT_MARKER_ICON } from "./constants/data.js";
import { LUCKY_MARKER_ICON } from "./constants/data.js";
import { setTimeout } from "timers";

export default {
  name: "HollyMap",
  props: {
    landing: Boolean,
    category: null,
    markerIsActive: Boolean,
    searchQuery: null,
    isGettingLucky: Boolean,
    isGettingDirections: Boolean
  },
  data: function() {
    return {
      google: null,
      map: null,
      apiKey: API_KEY,
      markers: [],
      activeMarker: null,
      directionsService: null,
      directionsDisplay: null
    };
  },
  computed: {
    allCategories: function() {
      let categories = "";
      $.each(API_CATEGORIES, function(i, category) {
        categories += category.categories + ",";
      });
      return categories;
    }
  },
  watch: {
    category: function() {
      if (this.category != null) {
        this.refreshMap();
        this.clearDirections();
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
      if (
        this.searchQuery != null &&
        this.searchQuery.replace(/\s+/g, "") != ""
      ) {
        this.searchForQuery();
      } else {
        this.refreshMap();
      }
    },
    isGettingLucky: function() {
      if(this.isGettingLucky) {
        this.$emit("$setCategoryNull");
        this.getRandomActivity();
      }
    },
    isGettingDirections: function() {
      if(this.isGettingDirections) {
        this.findAndDisplayRoute(this.directionsService, this.directionsDisplay);
      }else {
        this.clearDirections();
      }
    }
  },
  methods: {
    refreshMap: function() {
      this.map.getStreetView().setVisible(false);
      this.deleteMarkers();
      this.$emit("$setMarkerFalse");
      this.$emit("$setIsGettingDirectionsFalse");
      this.map.setZoom(DEFAULT_ZOOM);
      this.map.setCenter({ lat: CENTER_LAT_LONG[0], lng: CENTER_LAT_LONG[1] });
    },
    initializeMap: function() {
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
      this.directionsService = new this.google.maps.DirectionsService();
      this.directionsDisplay = new this.google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: "#c7800e",
          strokeWeight: 5,
          geodesic: false
        }
      });
      this.directionsDisplay.setMap(this.map);
    },
    getData: function() {
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
            CLIENT_ID +
            "&client_secret=" +
            CLIENT_SECRET +
            "&v=20190404"
        )
        .then(function(result) {
          let data = result.body.response.venues;
          this.addMarkers(data);
        });
    },
    getRandomActivityData: function(categoryId) {
      this.$http
        .get(
          "https://api.foursquare.com/v2/venues/search?" +
            "ll=" +
            CENTER_POSITION +
            "&categoryId=" +
            categoryId +
            "&radius=" +
            SEARCH_RADIUS +
            "&client_id=" +
            CLIENT_ID +
            "&client_secret=" +
            CLIENT_SECRET +
            "&v=20190404"
        )
        .then(function(result) {
          // Select random activity and send it to addMarkers in an array.
          // Catch incorrect/very inconsistent FourSquare/Google Places API data (specific IDs)
          let data = result.body.response.venues;
          let randomActivity = data[Math.floor(Math.random()*data.length)];
          if (
            randomActivity == "55ab791a498e4ade94d4770c" ||
            randomActivity == "4ecb32e68b813b34fddbcf53" ||
            randomActivity == "569b39c3498e633a3cd9670a" ||
            randomActivity == "563fe2f2cd10e0967a0b8cde"
          ) {
            this.getRandomActivityData(categoryId);
          }else {
            this.addMarkers([randomActivity]);
          }
        });
    },
    addMarkers: function(data) {
      let that = this;
      let markers = data;
      $.each(markers, function(i, marker) {
        // Catch incorrect/very inconsistent FourSquare/Google Places API data (specific IDs)
        if (
          marker.id != "55ab791a498e4ade94d4770c" &&
          marker.id != "4ecb32e68b813b34fddbcf53" &&
          marker.id != "569b39c3498e633a3cd9670a" &&
          marker.id != "563fe2f2cd10e0967a0b8cde"
        ) {
          let newMarker = {};
          if(that.isGettingLucky) {
            newMarker = new that.google.maps.Marker({
              position: { lat: marker.location.lat, lng: marker.location.lng },
              animation: that.google.maps.Animation.DROP,
              map: that.map,
              category: marker.categories[0].name,
              name: marker.name,
              icon: LUCKY_MARKER_ICON
            });
          }else {
            newMarker = new that.google.maps.Marker({
              position: { lat: marker.location.lat, lng: marker.location.lng },
              map: that.map,
              category: marker.categories[0].name,
              name: marker.name,
              icon: DEFAULT_MARKER_ICON
            });
          }
          // Handle marker click events
          newMarker.addListener("click", function() {
            // Smooth transition here somehow
            that.clearDirections();
            that.$emit("$setIsGettingDirectionsFalse");
            if (newMarker === that.activeMarker) {
              that.map.setZoom(DEFAULT_ZOOM);
              that.$emit("$setMarkerFalse");
              that.activeMarker = null;
            } else {
              that.activeMarker = newMarker;
              that.getGooglePlaceId(newMarker.name, newMarker.category, newMarker.position);
              if(that.map.getZoom() <= MARKER_ZOOM){
                that.map.setZoom(MARKER_ZOOM);
              }
            }
            that.map.setCenter(newMarker.getPosition());
          });
          // Handle maker hover events: show info popup
          newMarker.addListener("mouseover", function() {
            // Show info window
          });
          that.$emit("$setIsGettingLuckyFalse");
          that.markers.push(newMarker);
        }
      });
    },
    deleteMarkers: function() {
      let that = this;
      $.each(that.markers, function(i, marker) {
        marker.setMap(null);
      });
      this.markers = [];
    },
    getGooglePlaceId: function(name, category, position) {
      let that = this;
      let query = {
        query: name,
        locationBias: {
          radius: SEARCH_RADIUS,
          center: { lat: CENTER_LAT_LONG[0], lng: CENTER_LAT_LONG[1] }
        },
        fields: ["place_id"]
      };
      let service = new that.google.maps.places.PlacesService(this.map);
      service.findPlaceFromQuery(query, function(results, status) {
        if (status === that.google.maps.places.PlacesServiceStatus.OK) {
          let id = results[0].place_id;
          that.getGooglePlaceDetails(id, category, position);
        } else {
          that.$emit("$setMarkerFalse");
          that.map.setZoom(DEFAULT_ZOOM);
          setTimeout(function() {
            alert("Destination permanently closed, sorry!");
          }, 700);
        }
      });
    },
    getGooglePlaceDetails: function(id, category, position) {
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
          if (place.website) {
            placeData.website = place.website;
          }
          if (place.photos) {
            placeData.photos = place.photos;
          }
          if (place.rating) {
            placeData.rating = place.rating;
          }
          if (place.user_ratings_total) {
            placeData.userRatings = place.user_ratings_total;
          }
        }
        placeData.category = category;
        placeData.position = position;
        that.$emit("$markerClicked", placeData);
      }
    },
    searchForQuery: function() {
      this.clearDirections();
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
            this.allCategories +
            "&client_id=" +
            CLIENT_ID +
            "&client_secret=" +
            CLIENT_SECRET +
            "&v=20190404"
        )
        .then(function(result) {
          this.deleteMarkers();
          this.addMarkers(result.body.response.venues);
        });
    },
    getRandomActivity: function() {
      let activityIds = this.allCategories.split(",");
      activityIds.splice(activityIds.length-1, 1);
      let randomCategoryId = activityIds[Math.floor(Math.random()*activityIds.length)];
      this.getRandomActivityData(randomCategoryId);
    },
    // https://developers.google.com/maps/documentation/javascript/examples/directions-simple
    findAndDisplayRoute: function() {
      let that = this;
      // Check if marker is active!!!
      that.directionsService.route({
        origin: {lat: CURRENT_LOCATION[0], lng: CURRENT_LOCATION[1]},
        destination: that.activeMarker.position,
        travelMode: "DRIVING"
      }, function(response, status) {
        if (status === "OK") {
          that.directionsDisplay.setDirections(response);
        } else {
          setTimeout(function(){
            window.alert("Directions request failed due to " + status);
          }, 700);
          that.refreshMap();
        }
      });
    },
    clearDirections: function() {
      if(this.directionsDisplay != null) {
        this.directionsDisplay.set("directions", null);
      }
    }
  },
  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey,
      libraries: ["places"]
    });
    this.google = googleMapApi;
    this.initializeMap();
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