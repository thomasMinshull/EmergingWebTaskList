var express = require('express');
var mongoose =require('mongoose');
var router = express.Router();
var globalId = 5;
mongoose.connect("mongodb://localhost/TaskList");
  var taskSchema = new mongoose.Schema({
    id:Number,
    name:String,
    isDone:Boolean,
    priority:Number
  });

  var Task = mongoose.model('Task',taskSchema);
/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });


/*
  var task1 = new Task({id:2,name:"taks2",priority:90.0,isDone:false});
  task1.save(function(err){
    if(err) throw err;
    console.log("New Task2 is create");
  });
*/
  Task.find({},function(err,blobs){
    if(err){
      return console.error(err);
    }else{
      res.send(blobs);
    }
  });
  
   
});

router.get('/:id', function(req,res){
  Task.find({id:req.param('id')},function(err,blob){
    if(err){
      console.log(' Get error'+err);
    }else{
      res.send(blob);
    }
});
});
router.post('/', function(req,res){
  Task.find({id:req.param('id')},function(err,blob){
    if(err){
      console.log(' Get error'+err);
    }else{
  var task1 = new Task({id:globalId,name:req.body.taskName,priority:100.0,isDone:false});
  task1.save(function(err){
    if(err) throw err;
    console.log("New Task2 is create");
      globalId++;
      res.send(task1);
});
}
});
});
module.exports = router;
