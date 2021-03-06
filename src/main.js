import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import './sass/styles.scss';
import { apiCall } from "./../src/business-logic.js";

$(document).ready(function() {
  $(".callApi").click(function() {
    let freshApi = new apiCall();
    let promise = freshApi.runGithub();

    promise.then(function(response) {
      let body = JSON.parse(response);
      const myObj = body.data;
      console.log(body);
      let input = $("#oral").val();
      body.data.forEach(function(index){
        for (let i = 0; i < index.specialties.length; i++) {
          if (index.specialties[i].description.match(input)) {
            let bio = index.profile.bio;
            $(".output").append("<p>" + bio + "</p>");
            let pic = index.profile.image_url;
            $(".output").append("<img src='" + pic + "'>");
            break;
          }
        }
      });
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    })

  });
});
