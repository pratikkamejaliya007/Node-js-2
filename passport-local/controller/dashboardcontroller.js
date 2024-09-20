import Admin from '../model/adminmodel.js'
import User from '../model/register.model.js'
import jwt from 'jsonwebtoken'

export const login= (req,res)=>{
    res.render('login')
}

export const postlogin= async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})
        if(user.password !== req.body.password){
         return  res.status(501).redirect('/login')
        }
        
        res.status(201).redirect("/")

    }catch(err){
        res.status(400).send(err)
    }
}

export const dashboard= (req,res)=>{
    res.render("dashboard")
}

export const from_basic=(req,res)=>{    
    res.render("form-basic")
}

export const from_wizerd=(req,res)=>{
    res.render("form_wizerd")
}

export const user=async(req,res)=>{
    try{
        let data=await Admin.find({})
        res.render("table",{data})
    }catch(err){
        res.status(400).send(err)
    }
}

export const adddata=async(req,res)=>{
    try{
        if(req.file){
            req.body.profile=req.file.path
        }
        req.body.userid=req.user.id;
        await Admin.create(req.body)
        res.status(201).redirect("/users")
    }catch(err){
        res.status(401).send("Data Not Add")
    }
}

export const deleteAdmin = async (req, res) => {
    try {

      const adminData = await Admin.findById(req.params.id);
      

      if (adminData.profile && adminData.profile !== 'uploads/default.png') {
  
        const oldImagePath = path.join(__dirname, '../', adminData.profile);
  
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
  
      
      await Admin.findByIdAndDelete(req.params.id);
  
      
      res.status(200).redirect('/users');
    } catch (err) {
      console.error("Error deleting admin or image:", err); // Log the error for debugging
      res.status(401).send("Data Not Deleted");
    }
  };

export const edit=async(req,res)=>{
    try{
        let Data= await Admin.findById(req.params.id)
        console.log(Data)
        res.render("edit",{Data})
    }catch(err){
        res.status(400).send(err)
    }
}

export const postedit = async (req, res) => {
    try {
      const adminData = await Admin.findById(req.params.id);
        
      if (req.file) {
        if (adminData.profile && adminData.profile !== 'uploads/default.png') {
          const oldImagePath = path.join(__dirname, '../', adminData.profile); 

          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
  
        req.body.profile = req.file.path;
      } else {
        req.body.profile = adminData.profile;
      }

      await Admin.findByIdAndUpdate(req.params.id, req.body);
  
      res.status(201).redirect('/users');
    } catch (err) {
      res.status(400).send(err);
    }
  };