// Delete don't comment out
// Git can handle retrieving this if you need it later

// Meteor.publish('postits', function() {
//   return Postits.find({});
// });

// Meteor.publish('zones', function() {
//   return Zone.find({});
// });

// Meteor.publish('boards', function() {
//   return Boards.find({});
// });



Meteor.startup(function () {
  //Meteor.call('resetDemoBoard')
  Meteor.call('constructDemoBoard')
});

Meteor.methods({
  clearAll: function(){
     Boards.remove({});
      Zones.remove({});
    Postits.remove({});
    
    // I tend to remove debug statements too to keep the code as clean as possible
    console.log("All collections have been set to zero")
  },

  removePostits: function(){
    Postits.remove({});
  },

  constructDemoBoard: function(){
    
    // Logic in your controller
    // Put in two places: 1) Put in Board
    // 2) BoardConstructor object
    // I would start by putting in the Board, but if it was too complex I would abstract it to its own Factory object
    if(Boards.getDemo().length === 0){

      var id = new Mongo.ObjectID()
      var defaultZones = ["Todo","Doing","Done"]

      Boards.insert({_id: id ,title: "Demo",zones: [],zoneWidth: 0})

      _.each(defaultZones, function(newZone){
        Boards.addZone(id, newZone)
      })
    }
  },
  resetDemoBoard: function(){
    Board.resetDemoBoard({title: "Demo"})
  }

})
