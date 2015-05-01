

(function() {
  $.getJSON( '/igMediaCounts')
    .done(function( data ) {
      var followers = data.users.map(function(item){
        return item.counts.followed_by;
      });
       var following = data.users.map(function(item){
        return item.counts.follows;
      });

followers.unshift('followers');
following.unshift('following');

      var chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            followers,
            following 
          ]
        }
      });
    });
})();

/*(function() {
  $.getJSON( '/igMediaCounts')
    .done(function( data ) {
      
var data = data.sort(function(item){
        return ((b.followed_by/b.follows) - (a.followed_by/a.follows));
      });

      var rank = data.users.map(function(item){
        return (item.followed_by/item.follows);
      });

      rank.unshift('Rank');

      var chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            rank 
          ]
        }
      });
    });
})();
*/