import express from "express";
import { register , login ,test, forgotPassword,updateEmployee,getEmployeeById} from "../controller/authController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/register',register)
router.get('/edit/:id', getEmployeeById);
router.put('/employees/:id', updateEmployee);
router.post('/login',login)
router.get('/test',requireSignIn,test)
router.post('/forgot-password',forgotPassword)
router.get('/user-auth',requireSignIn, (req,res)=>{
    res.status(200).send({ok:true})
}
)

export default router;