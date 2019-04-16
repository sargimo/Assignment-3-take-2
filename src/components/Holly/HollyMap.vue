<template>
  <div class="map">
    <div class="google-map" ref="googleMap"></div>
  </div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";
import { mapStyles } from "./styles/mapStyles.js";
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
    landingIsActive: Boolean,
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
      markers: [],
      activeMarker: null,
      directionsService: null,
      directionsDisplay: null
    };
  },

  computed: {
    /**
     * Returns string of all FourSquare Places API category IDs formatted for API request.
     * @return {String} categories
     */
    allCategories: function() {
      let categories = "";
      $.each(API_CATEGORIES, function(i, category) {
        categories += category.categories + ",";
      });
      return categories;
    }
  },

  watch: {
    /**
     * Handles map UI when category is changed.
     */
    category: function() {
      if (this.category != null) {
        this.refreshMap();
        this.clearDirections();
        this.getData();
      }
    },

    /**
     * Reinitlializes map when navigating to landing screen.
     */
    landingIsActive: function() {
      this.initialiseMap();
    },

    /**
     * Sets map zoom back to default when marker becomes inactive (reclicked).
     */
    markerIsActive: function() {
      if (!this.markerIsActive) {
        this.map.setZoom(DEFAULT_ZOOM);
      }
    },

    /**
     * Handles user searching for a (null, empty, or string) query.
     */
    searchQuery: function() {
      // If searchQuery is not null or empty string
      if (
        this.searchQuery != null &&
        this.searchQuery.replace(/\s+/g, "") != ""
      ) {
        this.searchForQuery();
      } else {
        this.refreshMap();
      }
    },

    /**
     * Handles user clicking "Feeling Lucky?" button and emits method call to set category state to null.
     */
    isGettingLucky: function() {
      if (this.isGettingLucky) {
        this.getRandomActivity();
        this.$emit("$setCategoryNull");
      }
    },

    /**
     * Handles user clicking "Get Directions" button and clearing directions when state is false.
     */
    isGettingDirections: function() {
      if (this.isGettingDirections) {
        this.findAndDisplayRoute(
          this.directionsService,
          this.directionsDisplay
        );
      } else {
        this.clearDirections();
      }
    }
  },

  methods: {
    /**
     * Handles refreshing the map, resetting UI and states to default values.
     */
    refreshMap: function() {
      this.map.getStreetView().setVisible(false);
      this.deleteMarkers();
      this.clearDirections();
      this.$emit("$setMarkerFalse");
      this.$emit("$setIsGettingDirectionsFalse");
      this.$emit("$setIsGettingLuckyFalse");
      this.map.setZoom(DEFAULT_ZOOM);
      this.map.setCenter({ lat: CENTER_LAT_LONG[0], lng: CENTER_LAT_LONG[1] });
    },

    /**
     * Initialises Google map, setting map/directions styles and control/center positions.
     */
    initialiseMap: function() {
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

    /**
     * Sends request to FourSquare Places API to get data for places in currently selected category.
     * Calls method to add markers to the map.
     */
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

    /**
     * Sends request to FourSquare Places API when user clicks "Feeling Lucky?" button; gets data for random activity of given (random) categoryId.
     * @param {String} categoryId
     */
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
          let data = result.body.response.venues;
          // Set random activity ID from array of IDs returned by API
          let randomActivity = data[Math.floor(Math.random() * data.length)];
          // Catch incorrect/very inconsistent FourSquare/Google Places API data (specific IDs): re-call method until valid ID found
          if (
            randomActivity == "55ab791a498e4ade94d4770c" ||
            randomActivity == "4ecb32e68b813b34fddbcf53" ||
            randomActivity == "569b39c3498e633a3cd9670a" ||
            randomActivity == "563fe2f2cd10e0967a0b8cde" ||
            randomActivity == "52d3883c498e7f75e1cb6fad" ||
            randomActivity == "4dcd1649e4cd130e164447b7" ||
            randomActivity == "5ad7bc18bcbf7a55ca468bf6" ||
            randomActivity == "4dfd9a62d164848a03f9d5c9"
          ) {
            this.getRandomActivityData(categoryId);
          } else {
            this.addMarkers([randomActivity]);
          }
        });
    },

    /**
     * Initialises markers according to whether user selected a category, searched a query, or clicked "Feeling Lucky?" button; sets click listener on each marker.
     * @param {Object} data
     */
    addMarkers: function(data) {
      let that = this;
      let markers = data;
      $.each(markers, function(i, marker) {
        // Catch incorrect/very inconsistent FourSquare/Google Places API data (specific IDs): only adds valid markers
        if (
          marker.id != "55ab791a498e4ade94d4770c" &&
          marker.id != "4ecb32e68b813b34fddbcf53" &&
          marker.id != "569b39c3498e633a3cd9670a" &&
          marker.id != "563fe2f2cd10e0967a0b8cde" &&
          marker.id != "52d3883c498e7f75e1cb6fad" &&
          marker.id != "4dcd1649e4cd130e164447b7" &&
          marker.id != "5ad7bc18bcbf7a55ca468bf6" &&
          marker.id != "4dfd9a62d164848a03f9d5c9"
        ) {
          let newMarker = {};
          if (that.isGettingLucky) {
            // Initialise "lucky" marker
            newMarker = new that.google.maps.Marker({
              position: { lat: marker.location.lat, lng: marker.location.lng },
              animation: that.google.maps.Animation.DROP,
              map: that.map,
              category: marker.categories[0].name,
              name: marker.name,
              icon: LUCKY_MARKER_ICON
            });
          } else {
            // Initialise default marker
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
            that.clearDirections();
            that.$emit("$setIsGettingDirectionsFalse");
            if (newMarker === that.activeMarker) {
              // Marker clicked is already active
              that.map.setZoom(DEFAULT_ZOOM);
              that.$emit("$setMarkerFalse");
              that.activeMarker = null;
            } else {
              // Marker clicked is not yet active
              that.activeMarker = newMarker;
              that.getGooglePlaceId(
                newMarker.name,
                newMarker.category,
                newMarker.position
              );
              if (that.map.getZoom() <= MARKER_ZOOM) {
                that.map.setZoom(MARKER_ZOOM);
              }
            }
            that.map.setCenter(newMarker.getPosition());
          });
          // that.$emit("$setIsGettingLuckyFalse");
          that.markers.push(newMarker);
        }
      });
    },

    /**
     * Resets (clears) map markers.
     */
    deleteMarkers: function() {
      let that = this;
      $.each(that.markers, function(i, marker) {
        marker.setMap(null);
      });
      this.markers = [];
    },

    /**
     * Searches Google Places API for a given place name (from FourSquare Places API) within defined radius from center location to get its Google Places ID and details.
     * Code sourced from:
     * https://developers.google.com/maps/documentation/javascript/places#find_place_from_query
     * @param {String} name
     * @param {String} category
     * @param {Object} position
     */
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
          // Get Google Places API place details
          that.getGooglePlaceDetails(id, category, position);
        } else {
          // Catch Google Places API unable to find FourSquare API place
          that.$emit("$setMarkerFalse");
          that.map.setZoom(DEFAULT_ZOOM);
          setTimeout(function() {
            alert("Destination permanently closed, sorry!");
          }, 700);
        }
      });
    },

    /**
     * Gets place details for place with given Google Places API ID.
     * Code sourced from:
     * https://developers.google.com/maps/documentation/javascript/places#find_place_from_query
     * @param {String} id
     * @param {String} category
     * @param {Object} position
     */
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
          // Set data (properties) of placeData object if they exist in API
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
        // Set category and position properties of placeData object according to FourSquare data passed
        placeData.category = category;
        placeData.position = position;
        that.$emit("$markerClicked", placeData);
      }
    },

    /**
     * Handles map UI and gets data when user searches for a query.
     */
    searchForQuery: function() {
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
          this.addMarkers(result.body.response.venues);
        });
    },

    /**
     * Gets random FourSqaure activity ID to pass to get activity data when user clicks "Feeling Lucky?" button.
     */
    getRandomActivity: function() {
      let activityIds = this.allCategories.split(",");
      activityIds.splice(activityIds.length - 1, 1);
      let randomCategoryId =
        activityIds[Math.floor(Math.random() * activityIds.length)];
      this.getRandomActivityData(randomCategoryId);
    },

    /**
     * Calculates route from origin to active marker position and displays on map.
     * Code sourced from:
     * https://developers.google.com/maps/documentation/javascript/examples/directions-simple
     */
    findAndDisplayRoute: function() {
      let that = this;
      that.directionsService.route(
        {
          origin: { lat: CURRENT_LOCATION[0], lng: CURRENT_LOCATION[1] },
          destination: that.activeMarker.position,
          travelMode: "DRIVING"
        },
        function(response, status) {
          if (status === "OK") {
            that.directionsDisplay.setDirections(response);
          } else {
            setTimeout(function() {
              window.alert("Directions request failed due to " + status);
            }, 700);
            that.refreshMap();
          }
        }
      );
    },

    /**
     * Resets (clears) map directions.
     */
    clearDirections: function() {
      if (this.directionsDisplay != null) {
        this.directionsDisplay.set("directions", null);
      }
    }
  },
  
  /**
   * Loads GoogleMapsApiLoader and initialises map.
   */
  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: API_KEY,
      libraries: ["places"]
    });
    this.google = googleMapApi;
    this.initialiseMap();
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