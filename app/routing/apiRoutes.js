var friends = require("../data/friends");

module.exports = function (app) {
  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function (req, res) {
    var bestMatch = {
    name: "",
    friendDifference: Infinity
    };

    var friendData = req.body;
    var friendScore = friendData['scoreTotal[]'];
    var scoreDiff;

    for (var i = 0; i < friends.length; i++) 
    {
      var currentFriend = friends[i];
      scoreDiff = 0;

      for (var j = 0; j < currentFriend.scores.length; j++) 
      {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = friendScore[j];    
        scoreDiff += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }
      if (scoreDiff <= bestMatch.friendDifference) 
      {
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = scoreDiff;
      }

    }
  friends.push(friendData);
  res.json(bestMatch);
  });

};
