import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017/data',{useNewUrlParser:true});
const mySchema= new mongoose.Schema({
    name:String,
   id:Number

});

const data=mongoose.model("box1",mySchema);

const bat= new data({
    name:"cricket bat",
    id:1
    
   
});
const football= new data({
    name:"Football",
    id:2
    
   
});const Racket= new data({
    name:"Racket",
    id:3
    
   
});const chess= new data({
    name:"chess",
    id:4
    
   
});const ludo= new data({
    name:"ludo",
    id:5
    
   
});



//  bat.save();
// data.find()
// .then(function (box1) {
//   console.log(box1);
// })
// .catch(function (err) {
//   console.log(err);
// });
