const app=require('./app.js')


const port = 9090;
app.listen(port,()=>{
    console.log(`Server is listening to port ${port}` )
})