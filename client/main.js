Router.route('/', function () {
  this.render('home'); // SEMI COLONS! - Don't forget to run through jslint // run through code climate
})

Router.route('/board', function () {
    board = ClientBoard.setup();
    this.render('board', {data: {board: board, zones: board.zones}})
})

Router.route('/phone', function () {
	board = _.first(Boards.getDemo());
  arrZones = Zones.allZonesOfABoard(board._id);
  _.each(arrZones, function(item){
      if(item.order === 0){
        Zones.update(item._id, {$set: {selected: "active"}});
      }
  });
  arrZones = Zones.allZonesOfABoard(board._id);
  sortedZones = _.sortBy(arrZones, 'order');
  this.render('phone', {data: {zones:sortedZones}})
})


