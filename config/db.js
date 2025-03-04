import mongoose from 'mongoose'

const DB = async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MONGODB Connected !!!')
    }
    catch(error){
        console.log(error)
    }
}

export default DB;