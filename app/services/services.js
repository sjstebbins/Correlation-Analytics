angular.module('services', [])

.factory('Stocks', function ($http) {

   //FIREBASE HOOKUP
        // var ref = new Firebase("https://hackathon-app.firebaseio.com/data");
        // var sync = $firebase(ref);
        // // create a synchronized array for use in our HTML code
        // scope.messages = sync.$asArray();

  var get = function(query) {
    return $http({
      method: 'GET',
      url: 'https://www.quandl.com/api/v1/datasets/WIKI/' + query.toUpperCase() + '.csv?auth_token=Lmzt-LAWzHDzykUrZYU8&column=4&collapse=weekly&trim_start=2000-01-01&trim_end=2014-01-01&sort_order=asc&transformation=rdiff'
    })
    .then(function(resp){
      // console.log(resp.data);
      return resp.data;
    });
  };

  var addStock = function (query) {
    return $http({
      method: 'POST',
      url: '/api/stocks',
      data: stocks
    });
  };


  return {
    get: get,
    addStock: addStock
  };


})

.factory('Twitter', function ($http) {

  var get = function(query) {
    return $http({
      method: 'GET',
      url: 'https://api.twitter.com/1.1/search/tweets.json?q=' + query.toUpperCase()
    })
    // 'http://search.twitter.com/search.json?q=blue%20angels&rpp=5&include_entities=true&with_twitter_user_id=true&result_type=mixed'
    .then(function(error, resp){
      return resp.data;
    });
  };

  var addTwitter = function (twitter) {
    return $http({
      method: 'POST',
      url: '/api/twitters',
      data: twitter
    });
  };


  return {
    get: get,
    addTwitter: addTwitter
  };

})

// .factory('News', function ($http) {

//   var get = function(query) {
//     return $http({
//       method: 'GET',
//       url: 'https://www.googleapis.com/customsearch/v1?key=_______&cx=015698937417642655162:qhgwot3phos{YOUR_API_KEY}&q='+query
//     })
//     .then(function(resp){
//       return resp.data;
//     });
//   };

//   var addNews = function (news) {
//     return $http({
//       method: 'POST',
//       url: '/api/newss',
//       data: news
//     });
//   };


//   return {
//     get: get,
//     addNews: addNews
//   };

// })

// .factory('Alchemy', function ($http) {

//   // var api = 9ddce0957447a5027cf1a73b860383823614057f;
//   var get = function() {
//     return $http({
//       method: 'GET',
//       url: 'http://access.alchemyapi.com/calls/text/TextGetTargetedSentiment?'
//     })
//     .then(function(resp){
//       return resp.data;
//     });
//   };

//   var addData = function (data) {
//     return $http({
//       method: 'POST',
//       url: '/api/datas',
//       data: data
//     });
//   };


//   return {
//     get: get,
//     addData: addData
//   };

// .factory('Data', function ($http) {

//   var get = function() {
//     return $http({
//       method: 'GET',
//       url: '/api/links'
//     })
//     .then(function(resp){
//       return resp.data;
//     });
//   };

//   var addData = function (data) {
//     return $http({
//       method: 'POST',
//       url: '/api/datas',
//       data: data
//     });
//   };


//   return {
//     get: get,
//     addData: addData
//   };

// })
