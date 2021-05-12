const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');

mongoose.connect("mongodb://127.0.0.1:27017/globiliti", {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
}).then(res => {
    console.log("Database Connected");
});
app.use(express.static(__dirname + '/views/build'));

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/",userRouter);
app.use(globalErrorHandler);
app.get("*",(req,res) => {
    res.sendFile(__dirname + '/views/build/' + "index.html");
})
app.listen(process.env.PORT || 5000,() => {
    console.log("Server is Listening on Port 5000");
})