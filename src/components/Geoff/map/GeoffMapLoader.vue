<template>
  <div>
    <router-link :to="'/GeoffCategories'" exact>
      <GeoffBackBtn/>
    </router-link>
    <GeoffMapCategories
      @$categoryClickHandler="categoryClickHandler"
      @$radiusChanged="radiusChanged"
    />
    <GeoffPlaceInformation
      @$closeInfoPanel="closeInfoPanel"
      @$getDirections="getDirections"
      :placeData="placeData"
      :gPlaceData="gPlaceData"
      v-if="placeInfoPanel"
    />
    <div class="google-map" ref="googleMap"></div>
  </div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";
import { API_KEY } from "../constants/config.js";
import { CLIENT_ID } from "../constants/config.js";
import { CLIENT_SECRET } from "../constants/config.js";
import { regularMarker } from "../constants/mapSettings.js";
import { mapStyle } from "../constants/mapSettings.js";
import GeoffBackBtn from "../GeoffBackBtn.vue";
import festivalData from "../constants/festivalData.json";
import musicVenueData from "../constants/musicVenueData.json";
import recordStoresData from "../constants/recordStoreData.json";
import musicShopData from "../constants/musicShopData.json";
import musicSchoolData from "../constants/musicSchoolData.json";
import GeoffMapCategories from "./GeoffMapCategories.vue";
import GeoffPlaceInformation from "./GeoffPlaceInformation.vue";

export default {
  name: "GeoffMapLoader",
  components: {
    GeoffBackBtn,
    GeoffMapCategories,
    GeoffPlaceInformation
  },

  props: {},

  data: function() {
    return {
      //Could be refactored to reduce redundancy of data. CurrentSearchData, 
      //placeData and gPlaceData do not all need to exist. A product of the giant
      //restructure needed when it was discovered foursquare wasn't usable for details
      google: null,
      map: null,
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      //all active non-featured markers
      markers: [],
      currentRadius: "1000",
      currentCategoryId: Number,
      currentSearchData: [],
      placeInfoPanel: false,
      placeData: "",
      gPlaceId: "",
      gPlaceData: Object,
      //foursquare IDs
      categoryIds: [
        "5267e4d9e4b0ec79466e48d1",
        "4bf58dd8d48988d1e5931735",
        "4bf58dd8d48988d10d951735",
        "4bf58dd8d48988d1fe941735",
        "4f04b10d2fb6e1c99f3db0be"
      ],
      //JSON files
      featureData: [
        festivalData.venues,
        musicVenueData.venues,
        recordStoresData.venues,
        musicShopData.venues,
        musicSchoolData.venues
      ],
      featuredMarkers: [],
      directionsService: null,
      directionsDisplay: null,
      activeMarker: null
    };
  },

  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      libraries: ["places"],
      apiKey: this.apiKey
    });
    this.google = googleMapApi;
    this.initializeMap();
    if (this.$route.params.id) {
      this.categoryClickHandler(this.$route.params.id);
    }
  },
  created: function() {},
  methods: {
    initializeMap() {
      //Loads directionService for use
      this.directionsService = new this.google.maps.DirectionsService();
      //Loads directionDisplay for custom polylines
      this.directionsDisplay = new this.google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: "#3fcbca",
          strokeWeight: 5,
          geodesic: true
        }
      });
      const mapContainer = this.$refs.googleMap;
      //sets map settings and control layout
      this.map = new this.google.maps.Map(mapContainer, {
        zoom: 15,
        center: { lat: -41.2865, lng: 174.7762 },
        styles: mapStyle,
        mapTypeControl: false,
        fullscreenControl: true,
        fullscreenControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_LEFT
        },
        streetViewControl: true,
        streetViewControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER
        },
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_BOTTOM
        }
      });
      //customise streetview options so the controls are not hidden behind other elements
      this.map.getStreetView().setOptions({
        addressControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_LEFT
        },
        panControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_LEFT
        }
      });
      this.directionsDisplay.setMap(this.map);
    },
    /** 
      * takes array of objects containing map data and place info data 
      * @param {Array} places
    */
    addMarkers(places) {
      let that = this;
      $.each(places, function(i, place) {
        console.log(place)
        //catches currently known bad markers from incorrect foursquare data and does not render them. Hardcoded IDs. Would not be needed if there was time to refactor to only use google places.
        if ( 
          place.id != "51282985e4b016a0d5c349bb" &&
          place.id != "4f18fe7ee4b0808f61c5fe7d" &&
          place.id != "4c93d727f244b1f7f7751c1d" &&
          place.id != "51f19f81498e4abbea0feca4" &&
          place.id != "5166230ee4b0dc749a1f949d" &&
          place.id != "4de584ed814db55dc23649e4" &&
          place.id != "4dfd5508b61c84188ef03f40" && 
          place.id != "4b15d5eaf964a520deb423e3" &&
          place.id != "4b2d7154f964a520c3d624e3" &&
          place.id != "4bb94fb698c7ef3bd9053202" &&
          place.id != "4f94b335e4b04c3ffac0885e" &&
          place.id != "4fb32341e4b0d1c733ebe6ce"
          ) {
        let newGMarker = new that.google.maps.Marker({
          position: place.position,
          icon: "https://i.ibb.co/MGR4s7m/geoff-map-marker.png",
          id: place.id,
          map: that.map,
          name: place.name,
          address: place.address,
          addressLoc: place.addressLoc,
          distance: place.distance,
          category: place.category
        });
        that.markers.push(newGMarker);
          }
      });
      this.initMarkerClickListeners(that.markers);
    },
    /** 
      * takes array of objects containing map data and sets their map to null, 
      * removing them from the map
      * @param {Array} array
    */
    deleteMarkers(array) {
      let gMarkers = array;
      $.each(gMarkers, function(i, gMarker) {
        gMarker.setMap(null);
      })
      //empties storage data of previous markers that have been removed from map
      gMarkers = [];
    },
    /** 
      * Takes an id representing the category. Written to handle showing of 
      * featured festivals which has no data from the API and is hard coded in 
      * JSON. If time allowed, could use major refactor along with the the other
      * data request and storage methods.
      * @param {Number} id
    */
    showFeaturedFestivals(id) {
      let that = this;
      this.deleteMarkers(this.markers);
      this.deleteMarkers(this.featuredMarkers);
      let category = this.featureData[id];
      //zooms map out due to one of the festivals being very far north
      that.map.setZoom(9);
      $.each(category, function(i, marker) {
        //required syntax for requests with built in getDetails method
        let request = {
          placeId: category[i].mapId
        };
        let service = new google.maps.places.PlacesService(that.map);
        service.getDetails(request, callback);
        function callback(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            //renders marker with data
            let newGMarker = new that.google.maps.Marker({
              position: place.geometry.location,
              icon: "https://i.ibb.co/GCw4xmG/geoff-featured-map-marker.png",
              zIndex: 999,
              id: place.id,
              map: that.map,
              name: marker.name,
              desc: marker.description,
              address: marker.location,
              addressLoc: place.address_components[3].short_name,
              category: marker.category
            });
            //inits click listeners for marker
            newGMarker.addListener("click", function(evt) {
              this.clearDirections();
              that.map.setZoom(15);
              that.activeMarker = newGMarker;
              that.map.setCenter(newGMarker.getPosition());
              that.placeInfoPanel = true;
              that.placeData = { name: marker.name, category: marker.category };
              that.gPlaceData = {
                address: marker.location,
                website: marker.website,
                desc: marker.description
              };
            });
            //stores markers in seperate array from normal markers to be able 
            //to handle them independantly if required
            that.featuredMarkers.push(newGMarker);
          }
        }
      });
    },
    /** 
      * Takes array of markers and initialises the click listeners on them
      * @param {Array} array
    */
    initMarkerClickListeners(markers) {
      let that = this;
      $.each(markers, function(i, marker) {
        marker.addListener("click", function(evt) {
          that.clearDirections();
          that.map.setZoom(15);
          that.map.setCenter(marker.getPosition());
          // that.getPlaceDetails(marker.id);
          that.placeInfoPanel = true;
          that.storePlaceDetails(marker);
          that.getGooglePlaceId(that.placeData.name);
          that.activeMarker = marker;
        });
      });
    },
    /** 
      * Takes an id. Id represents the category chosen. 
      * Called once when page initialises, and then each time a new category 
      * is clicked. 
      * @param {Number} id
    */
    categoryClickHandler: function(id) {
      this.clearDirections();
      if (id === "0") {
        this.showFeaturedFestivals(id);
      } else {
        this.changeZoom(this.currentRadius);
        this.getSearchData(this.categoryIds[id], this.currentRadius);
        this.deleteMarkers(this.featuredMarkers);
        this.showFeatureMarkers(id);
      }
    },
    /** 
      * Called on watching for when the radius has been changed from dropdown. 
      * Stores the number in data inside MapLoader for use in other methods.
      * @param {Number} radius
    */
    radiusChanged: function(radius) {
      this.currentRadius = radius;
      this.changeZoom(radius);
    },
    /** 
      * switch case to convert radius numbers into appropriate zoom levels on the map
      * @param {Number} radius
    */
    changeZoom(radius) {
      switch (radius) {
        case "1000":
          this.map.setZoom(15);
          break;
        case "5000":
          this.map.setZoom(14);
          break;
        case "10000":
          this.map.setZoom(13);
          break;
        case "20000":
          this.map.setZoom(12);
          break;
      }
    },
    /** 
      * Handles showing featured markers. Takes the google places ID from JSON 
      * and returns google data for markers.
      * @param {Number} id
    */
    showFeatureMarkers(id) {
      let that = this;
      let category = this.featureData[id];
      this.clearDirections();
      $.each(category, function(i, marker) {
        //required syntax for built in getDetails request
        let request = {
          placeId: category[i].mapId
        };
        let service = new google.maps.places.PlacesService(that.map);
        service.getDetails(request, callback);
        function callback(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            //renders new markers
            let newGMarker = new that.google.maps.Marker({
              position: place.geometry.location,
              zIndex: 999,
              icon: "https://i.ibb.co/GCw4xmG/geoff-featured-map-marker.png",
              id: place.id,
              map: that.map,
              name: marker.name,
              address: marker.location,
              addressLoc: place.address_components[3].short_name,
              category: marker.category
            });
            //inits click listeners on new markers
            newGMarker.addListener("click", function(evt) {
              that.clearDirections();
              that.map.setZoom(15);
              that.map.setCenter(newGMarker.getPosition());
              that.placeInfoPanel = true;
              that.storePlaceDetails(marker);
              that.getGooglePlaceId(that.placeData.name);
            });
            //stores markers in featured markers data
            that.featuredMarkers.push(newGMarker);
          }
        }
      });
    },
    /** 
      * Takes a categoryId and a radius number. categoryId is a foursquare ID. 
      * Returns all foursquare data from chosen category within selected radius.
      * With more time, needs to be refactored to be more reusable by other methods.
      * @param {Number} categoryId
      * @param {Number} radius
    */
    getSearchData(categoryId, radius) {
      this.$http
        .get(
          "https://api.foursquare.com/v2/venues/search?ll=-41.2855,174.7772&categoryId=" +
            categoryId +
            "&radius=" +
            radius +
            "&client_id=" +
            this.clientId +
            "&client_secret=" +
            this.clientSecret +
            "&v=20190404"
        )
        .then(function(data) {
          this.deleteMarkers(this.markers);
          this.currentSearchData = [];
          let addMarkers = this.addMarkers;
          let searchData = this.currentSearchData;
          $.each(data.body.response.venues, function(i, place) {
            let gMapMarkerInfo = {
              position: { lat: place.location.lat, lng: place.location.lng },
              id: place.id,
              address: place.location.formattedAddress[0],
              addressLoc: place.location.formattedAddress[1],
              name: place.name,
              distance: place.location.distance,
              category: place.categories[0].name
            };
            searchData.push(gMapMarkerInfo);
          });
          this.addMarkers(this.currentSearchData);
        });
    },
    /** 
      * Stores the data from clicked marker to put placed in the place details screen
      * @param {Object} marker
    */
    storePlaceDetails(marker) {
      this.placeData = {
        position: marker.position,
        id: marker.id,
        address: marker.address,
        name: marker.name,
        distance: marker.distance,
        category: marker.category
      };
    },
    /** 
      * Takes name of venue from foursquare, and searches it against google 
      * places data. If there is no match, alerts the user the venue is permanently 
      * closed. Not an ideal solution but with a major breaking issue with foursquare
      * it was required to finish in time and meet use cases.
      * @param {String} name
    */    getGooglePlaceId(name) {
      let that = this;
      let query = {
        query: name,
        locationBias: {
          radius: 50000,
          center: { lat: -41.2865, lng: 174.7762 }
        },
        fields: ["place_id"]
      };
      let service = new google.maps.places.PlacesService(this.map);
      service.findPlaceFromQuery(query, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // console.log(results);
          let id = results[0].place_id;
          that.getGooglePlaceDetails(id);
        } else {
          alert("Venue Permanently Closed");
        }
      });
    },
    /** 
      * Takes google place id for details request. Still uses some information 
      * from foursquare and some from google. Needs to be refactored to use one 
      * or the other eventually.
      * @param {Number} id
    */
    getGooglePlaceDetails(id) {
      let that = this;
      let request = {
        placeId: id
      };
      let service = new google.maps.places.PlacesService(this.map);
      service.getDetails(request, callback);
      function callback(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          that.gPlaceData = {};
          if (place.formatted_phone_number) {
            that.gPlaceData.phoneNumber = place.formatted_phone_number;
          }
          if (place.opening_hours) {
            that.gPlaceData.openNow = place.opening_hours.open_now;
          }
          if (place.opening_hours) {
            that.gPlaceData.openTimes = place.opening_hours.weekday_text;
          }
          if (place.formatted_address) {
            that.gPlaceData.address = place.formatted_address;
          }
          if (place.user_ratings_total) {
            that.gPlaceData.userRatings = place.user_ratings_total;
          }
          if (place.distance) {
            that.gPlaceData.distance = place.distance;
          }
          if (place.website) {
            that.gPlaceData.website = place.website;
          }
          if (place.photos) {
            that.gPlaceData.photos = place.photos;
          }
          if (place.rating) {
            that.gPlaceData.rating = place.rating;
          }
          if (place.reviews) {
            that.gPlaceData.reviews = place.reviews;
          }
        }
      }
    },
    //handles the closing of more details panel on map
    closeInfoPanel() {
      this.placeInfoPanel = false;
    },
    //gets directions from hardcoded position to chosen venue. If going to 
    //production, hard coded location would need to become a get location of 
    //user request
    getDirections() {
      let that = this;
      that.directionsService.route(
        {
          origin: { lat: -41.2268, lng: 174.807 },
          destination: that.activeMarker.position,
          travelMode: "DRIVING"
        },
        function(response, status) {
          if (status === "OK") {
            that.directionsDisplay.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    },
    //removes polyline of directions
    clearDirections: function() {
      if (this.directionsDisplay != null) {
        this.directionsDisplay.set("directions", null);
      }
    }
  }
};
</script>

<style scoped>
.google-map {
  width: 100vw;
  min-height: 100vh;
}
</style>
