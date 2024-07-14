const mongoose = require("mongoose");


const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  tast:{
    type: String,
    enum:['spicy', 'sweet', 'hot'],
    required:true
  },
  is_drink:{
    type:Boolean,
    default:false,
  },
  ingredients:{
    type:[String],
    default:[]
  },
  num_sale:{
    type:Number,
    default:0
}
});

const Menuitem = mongoose.model('Menuitem', menuSchema);
module.exports = Menuitem;