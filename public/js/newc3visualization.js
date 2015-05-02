(function() {
  $.getJSON( '/igMediaCounts')
    .done(function( data ) {
      var followers = data.users.map(function(item){
        return item.counts.followed_by;
      });
       var following = data.users.map(function(item){
        return item.counts.follows;
      });
       var rank = data.users.map(function(item){
        return item.counts.followed_by / item.counts.follows;
      });
      var username = data.users.map(function(item){
        return item.username;
      });


followers.unshift('Followers');
following.unshift('Following');
rank.unshift('Followers:Following Ratio');

      var chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            rank
          ],
          type: 'bar',
        },
        zoom: {
           enabled: true
              },
    axis: {
        y: {
            label: 'Followers:Following Ratio',
            max: 3
        }
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