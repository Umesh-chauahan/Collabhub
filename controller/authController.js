import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Register
export const register = async (req, res) => {
  try {
    const { name, email, password,Role} = req.body
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
      Role
    }).save();
    res.status(201).json({message:'user register successfully !!!'});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' });
  }
};


//Login
export const login = async (req, res) => {
  const { email, password, Role} = req.body;

  try {
    const user = await User.findOne({ email,Role });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'InCorrect Password !!!' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ token,user:user });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

//forgot-password
export const forgotPassword = async(req,res)=>{
  const {email,name, newPassword} = req.body
  try{
      if(!email){
        res.status(400).send({message: 'Email is required'})
      }
      if(!name){
        res.status(400).send({message: 'answer is required'})
      }
      if(!newPassword){
        res.status(400).send({message: 'New Password is required'})
      }

      const user = await User.findOne({email,name})
      if(!user){
        return res.status(400).send({message:'wrong email or answer'})
      }
      const hashed = await bcrypt.hash(newPassword,12)
      await User.findByIdAndUpdate(user._id,{password:hashed})
      res.status(200).send({messege:'password reset sucessfully !!!'})
    }
    catch(error){
      console.log(error)
      res.status(500).send({
        message: 'something went wrong',error
      })
    }

}

//Test
export const test = (req,res)=>{
   res.send('protected routes')
}

export const updateEmployee = async (req, res) => {
    const {name,email,password,Role,}=req.body
    const updatedUser={}
    if(name) updatedUser.name=name
    if(email) updatedUser.email=email
    if(Role) updatedUser.Role=Role
    if(password){
      const hashed = await bcrypt.hash(password,12)
      updatedUser.password=hashed
    }

  const updatedEmployee = await User.findByIdAndUpdate(req.params.id, updatedUser, { new: true });
res.json(updatedEmployee);
};
export const getEmployeeById = async (req, res) => {
  try {
   
    const employee = await User.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};