Template.board.helpers({
  board: function() {
    return _.first(Boards.getDemo())
  },
  zones: function(){
    var zones = []
    var board = Boards.findOne({title: "Demo"})
    if(board !== undefined){
      _.each(board.zones, function(zoneId){
        var zone = _.first(Zones.find(zoneId).fetch())
        var PostitsForZone = Postits.getByZone(zoneId);
        zonePostits = new Object({zone: zone, postits: PostitsForZone});
        zones.push(zonePostits);

        var boardId = Boards.find().fetch()[0]._id
        var windowWidth = $(window).width()
        var windowHeight = $(window).height()
        Boards.update(boardId,{$set:{windowWidth: windowWidth, windowHeight: windowHeight}})
      })
    }
    return zones
  },
  zoneHeight: function(){
    return $(window).height()-75
  },
  asideHeight:function(){
    return $(window).height()-102
  }
})

Template.pointerElement.helpers({
  pointerRender: function(){
    return Session.get('pointer')
  }
})

Template.board.rendered = function(){

  var element;

  $('nav#pointer').hide()

  pointerStream.on('createPointer', function(pointer){
    $(pointer.element).show()
    Session.set('pointer', pointer)
  })

  pointerStream.on('movePostit', function(pointer){
    if(element === undefined){
      $(pointer.element).hide()
      element = document.elementFromPoint(pointer.x-5,pointer.y-5).id
    }
    $('#'+element).css('background','salmon')
    $('#'+element).css('position','absolute')
    $('#'+element).css('left',pointer.x+'px')
    $('#'+element).css('top',pointer.y+'px')
    Session.set('pointer', pointer)
  });

  pointerStream.on('resetPostit', function(pointer){
    $('#'+element).css('position','static')
    var zoneId = document.elementFromPoint(pointer.x-5,pointer.y-5).id
    Postits.update(element,{$set:{zoneId: new Mongo.ObjectID(zoneId)}})
    element = undefined
  })

}

Template.board.events = {
  "click #clearPostits": function(){
    Meteor.call("removePostits");
  }
}