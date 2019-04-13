<template>
  <div>
    <router-link :to="'/GeoffCategories'" exact>
      <GeoffBackBtn />
    </router-link>
    <GeoffMapCategories
      @$categoryClickHandler="categoryClickHandler"
      @$radiusChanged="radiusChanged"
    />
    <GeoffPlaceInformation
      @$closeInfoPanel="closeInfoPanel"
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
import { mapStyle } from "../constants/mapSettings.js"
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

  props: {

  },

  data: function() {
    return {
      google: null,
      map: null,
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      markers: [],
      currentRadius: "1000",
      currentCategoryId: Number,
      currentCategoryName: "",
      currentSearchData: [],
      placeInfoPanel: false,
      placeData: "",
      gPlaceId: "",
      gplaceData: Object,
      categoryIds: ["5267e4d9e4b0ec79466e48d1", "4bf58dd8d48988d1e5931735", "4bf58dd8d48988d10d951735", "4bf58dd8d48988d1fe941735", "4f04b10d2fb6e1c99f3db0be"],
      featureData: [festivalData.venues, musicVenueData.venues, recordStoresData.venues, musicShopData.venues, musicSchoolData.venues],
      featuredMarkers: []
    };
  },

  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      libraries: ["places"],
      apiKey: this.apiKey
    });
    this.google = googleMapApi;
    this.initializeMap();
    if(this.$route.params.id) {
      this.categoryClickHandler(this.$route.params.id)
    }
  },
  created: function() {
    
  },
  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap;
      this.map = new this.google.maps.Map(mapContainer, {
        zoom: 13,
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
      this.map.getStreetView().setOptions({
        addressControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_LEFT
        },
        panControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_LEFT
        }
      });
    },
    addMarkers(places) {
      let that = this;
      $.each(places, function(i, place) {
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
      });
      this.initMarkerClickListeners(that.markers);
    },
    deleteMarkers(array) {
      let gMarkers = array;
      $.each(gMarkers, function(i, gMarker) {
        gMarker.setMap(null);
      });
      gMarkers = [];
    },
    showFeaturedFestivals(id) {
      let that = this;
      this.deleteMarkers(this.markers);
      this.deleteMarkers(this.featuredMarkers)
      // this.currentSearchData = [];
      let category = this.featureData[id];
      that.map.setZoom(9);
      $.each(category, function(i, marker) {
        let request = {
          placeId: category[i].mapId
        };
        let service = new google.maps.places.PlacesService(that.map);
        service.getDetails(request, callback);
          function callback(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            let newGMarker = new that.google.maps.Marker({
              position: place.geometry.location,
              icon: "https://i.ibb.co/GCw4xmG/geoff-featured-map-marker.png",
              id: place.id,
              map: that.map,
              name: marker.name,
              desc: marker.description,
              address: marker.location,
              addressLoc: place.address_components[3].short_name,
              category: marker.category
            });
            newGMarker.addListener("click", function(evt) {
              that.map.setZoom(15);
              that.map.setCenter(newGMarker.getPosition());
              that.placeInfoPanel = true;
              that.placeData = {name: marker.name, category: marker.category}
              that.gPlaceData = {address: marker.location, website: marker.website, desc: marker.description}
              // that.storePlaceDetails(marker);
              // that.getGooglePlaceId(that.placeData.name);
            });
            that.featuredMarkers.push(newGMarker);
          }
        }
      })
    },
    initMarkerClickListeners(markers) {
      let that = this;
      $.each(markers, function(i, marker) {
        marker.addListener("click", function(evt) {
          that.map.setZoom(15);
          that.map.setCenter(marker.getPosition());
          // that.getPlaceDetails(marker.id);
          that.placeInfoPanel = true;
          that.storePlaceDetails(marker);
          that.getGooglePlaceId(that.placeData.name);
          // that.getGooglePlaceId("michael fowler center")
          // that.getGooglePlaceDetails()
        });
      });
    },
    categoryClickHandler: function(id, value) {
      if (id === "0") {
        this.showFeaturedFestivals(id)
      } else {
      this.getSearchData(this.categoryIds[id], this.currentRadius);
      this.deleteMarkers(this.featuredMarkers)
      this.showFeatureMarkers(id);
      }
    },
    radiusChanged: function(radius) {
      this.currentRadius = radius;
    },
    showFeatureMarkers(id) {
      let that = this;
      let category = this.featureData[id];
      $.each(category, function(i, marker) {
        let request = {
          placeId: category[i].mapId
        };
        let service = new google.maps.places.PlacesService(that.map);
        service.getDetails(request, callback);
        function callback(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            let newGMarker = new that.google.maps.Marker({
              position: place.geometry.location,
              icon: "https://i.ibb.co/GCw4xmG/geoff-featured-map-marker.png",
              id: place.id,
              map: that.map,
              name: marker.name,
              address: marker.location,
              addressLoc: place.address_components[3].short_name,
              category: marker.category
            });
            newGMarker.addListener("click", function(evt) {
              that.map.setZoom(15);
              that.map.setCenter(newGMarker.getPosition());
              that.placeInfoPanel = true;
              that.storePlaceDetails(marker);
              that.getGooglePlaceId(that.placeData.name);
            });
            that.featuredMarkers.push(newGMarker);
          }
        }
      });
    },
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
    getGooglePlaceId(name) {
      let that = this;
      // let formattedAddress = this.placeData.address.split(' ').join('+');
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
          console.log("foursquare is trash and google is garbage");
        }
      });
      // $.get(
      //   "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
      //   formattedAddress +
      //   "&key=" +
      //   this.apiKey
      //   )
      //   .then(function(data) {
      //     console.log(data)
      //   })
    },
    getGooglePlaceDetails(id) {
      let that = this;
      let request = {
        placeId: id
        // fields: ['photo', 'user_ratings_total', 'opening_hours', 'website', 'formatted_phone_number', 'reviews', 'rating']
      };
      // console.log(id);
      let service = new google.maps.places.PlacesService(this.map);
      service.getDetails(request, callback);
      function callback(place, status) {
        // console.log(place);
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
          // that.gPlaceData = {
          //   phoneNumber: place.formatted_phone_number,
          //   openNow: place.opening_hours.open_now,
          //   openTimes: place.opening_hours.weekday_text,
          //   userRatings: place.user_ratings_total,
          //   website: place.website,
          //   photos: place.photos,
          //   rating: place.rating,
          //   reviews: place.reviews
          // }
          // console.log(that.gPlaceData)
        }
      }
    },
    closeInfoPanel() {
      this.placeInfoPanel = false;
    }
    // getPlaceDetails(id) {
    //   this.$http
    //     .get(
    //       "https://api.foursquare.com/v2/venues/" +
    //         id +
    //         "&client_id=" +
    //         this.clientId +
    //         "&client_secret=" +
    //         this.clientSecret +
    //         "&v=20190404"
    //     )
    //     .then(function(data) {
    //       console.log(data);
    //     });
    // }
  }
};
</script>

<style scoped>
.google-map {
  width: 100vw;
  min-height: 100vh;
}
</style>
