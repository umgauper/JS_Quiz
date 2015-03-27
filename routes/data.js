/**
 * Created by una on 3/26/15.
 */
var express = require('express');
var router = express.Router();

/* GET data */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('questionSets');
    collection.find({}, {}, function(e, docs) {
        res.send({questionSets: docs});
    });
});

module.exports = router;
