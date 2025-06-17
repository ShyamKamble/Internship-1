const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const PORT=5000;

const routes=require('./routes');
const app=express();
app.use(cors())
app.use(express.json())
app.use(routes)
mongoose.connect('mongodb+srv://shyam200309:qTiY6m1xcJpwLcIV@cluster1.hmuhbac.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.listen(PORT,()=>{
    console.log("backend is running at port 5000");
})

