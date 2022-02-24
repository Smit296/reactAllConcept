const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/Donga's",{ useNewUrlParser: true , useUnifiedTopology: true })
.then(() => console.log("connection Successfull"))
.catch((err)=>console.log(err));

const studSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            lowercase : true,
            unique : true,
            trim : true,
            minlength : [2 , "minimum 2 letters"]
        },
        profession :String,
        collage : String,
        city : String,
        active : Boolean,
        date:{
            type : Date,
            default : Date.now 
        }
    }
)
const StudData = new mongoose.model("StudData",studSchema)
const createDocument=async()=>
{
try{

    /*const stud=new StudData(
    
    {
        name : "Harshal",
        profession :"It",
        collage : "Utu",
        city : "surat",
        active : true
    }
    )   
    const stud2=new StudData(
    {
        name : "jeet",
        profession :"It",
        collage : "Rai University",
        city : "Amdavad",
        active : true
    }
    )

    const stud3=new StudData(
    {
        name : "chintan",
        profession :"It",
        collage : "Utu",
        city : "surat",
        active : true
    }
    
    )*/
    
    const stud1=({name : "        ChinTan boghani       ",
        profession :"It",
        collage : "Utu",
        city : "surat",
        active : true});


//const result=await StudData.insertMany([stud2,stud3]);
const result=await StudData.insertMany([stud1]);
console.log(result);
}catch(err)
{
    console.log(err);
}
}

createDocument();

const getDocument=async ()=>
{
    //comparision operators
    //const result1=await StudData.find({collage:{$in:["Utu","Charusat"]}}).select({name : 1})//.limit(1);
     //console.log(result1);

    //logical Operator in Query
   // const result2=await StudData.find({$and:[{collage:"Utu"},{profession:"It"}]}).select({name : 1}).sort("name:1");//countDocuments();//.limit(1);
    //console.log(result2);

    const result3=await StudData.find({profession:"It"}).select({name : 1}).sort("name : 1");//countDocuments();//.limit(1);
    console.log(result3);
}

//getDocument();

//key value are same that time write _ e.g id=id write _id
const updateDocument=async (_id)=>
{
    try{

        const result = await StudData.findOneAndUpdate({_id},{

            $set : {
                collage : "sassit"
            }
         },{
            new : true, 
            useFindAndModify : false
         } );
        console.log(result);   
    }
    catch(err)
    {
        console.log(err);
    }
   
}
//updateDocument("6123ede1debf3a0288fc5d79");

const deleteDocument = async (_id) =>
{
    try{
        const result = await StudData.findByIdAndDelete({_id});
        console.log(result);
    }
    catch(err)
    {
        console.log(err);
    }
}

//deleteDocument("6123ede1debf3a0288fc5d78");