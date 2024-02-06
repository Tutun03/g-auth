const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/peopledb")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})

const peopledbSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

const peopleSchema=new mongoose.model('peopleSchema',peopledbSchema)
module.exports=peopleSchema