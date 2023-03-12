const mongoose =require('mongoose');
const mongoURI='mongodb://GoFood:Tusar2003@ac-v8zkurl-shard-00-00.dy5ivg5.mongodb.net:27017,ac-v8zkurl-shard-00-01.dy5ivg5.mongodb.net:27017,ac-v8zkurl-shard-00-02.dy5ivg5.mongodb.net:27017/GoFood?ssl=true&replicaSet=atlas-itttf5-shard-0&authSource=admin&retryWrites=true&w=majority'
// const mongoURI='mongodb+srv://GoFood:Tusar2003@cluster0.dy5ivg5.mongodb.net/GoFood?retryWrites=true&w=majority'
const mongoDB=async()=>{
   await mongoose.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
        if (err)
            console.log("------", err);

        else {
            console.log("Connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function(err,catData){
                    if (err)
                    console.log(err);

                else{
                    global.food_items=data;
                    global.foodCategory=catData;
                    
                }  
                })
                
              
            });
        }

    });
}

module.exports=mongoDB;





// const mongoDB=()=>{
//     mongoose.connect(mongoURI).then(()=>{
//         console.log('connection successful');
//         const fetched_data = mongoose.connection.db.collection("food_items");
//             fetched_data.find({}).toArray(function (err, data) {
//                 if (err)
//                     console.log(err);

//                 else
//                     console.log(data);
//             });
//     }).catch((err)=>console.log('No connection'));
// }

// module.exports=mongoDB;