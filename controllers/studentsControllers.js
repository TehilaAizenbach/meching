const { StudentsModel } = require("../models/student");
const { param } = require("../routers/studentsRoutes");

exports.StudentsCtrl={
    getStudents:async (req, res) => {
        try {
          const students = await StudentsModel.find({});
          const studentsData = students.map(studentItem => studentItem.toObject());
          res.json(studentsData);
        } catch (error) {
          console.error('Error finding classes:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } 
    },
    addPoints:async(req,res,next)=>{
          const {studentItem,points}=req.body;
          const id=studentItem.code;
          try {
            const student = await StudentsModel.findOne({ id: id });
            if (student) {
              student.points = student.points + points;
              const result = await StudentsModel.updateOne({ id: id }, student);
              if (next) {
                return 'success'
              }else{
                res.json("success").status(200);
              }
            }else{
                res.json("student is not found").status(404);
            }
            
          } catch (error) {
            console.error('Error finding classes:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          } 
    },
    addStudents:async(req,res,next)=>{
      const studentItem=req.body;
      try {
        let student = await StudentsModel.findOne({ id: studentItem.id });
        if (student) {
          res.json("Error The student exists in the system")
        }else{
        student=new StudentsModel(studentItem)
        await student.save();
        return (studentItem,student)
        res.status(200).json();}
        
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
    updateStudent:async(req,res)=>{
      const studentItem=req.body;
      try {
        let student = await StudentsModel.findOne({ id: studentItem.id });
        if (student) {
          student.first_name=studentItem.first_name;
          student.last_name=studentItem.last_name;
          student.points=studentItem.points;
          student.target=studentItem.target;
          student.group=studentItem.group;          
         let result= await StudentsModel.updateOne({ id: student.id }, student);
        }
        else{
          res.json("student is not found").status(404);
        }
         
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
    resetPoints:async(req,res,next)=>{
      try {
            const  students= await StudentsModel.find();
             await  students.forEach(async (studentItem) => {
              studentItem.points=0;
              await StudentsModel.findOneAndUpdate({id:studentItem.id},studentItem);
            });
            studentsList = await StudentsModel.find().lean();
            if (next) {
              return 'success'
            }
              res.json("sucsess");            
          } catch (error) {
            console.error('Error finding students:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          } 
         
    },
    findByClass:async(req,res)=>{
        try {
        const{group}=req.query;
        console.log(group);
        const students=await  StudentsModel.find({ group: group }).lean();
      
        if (!students || students.length === 0) {
            console.error('No students found for this class:', group);
            res.status(404).json({ error: 'No students found for this class' });
            return;
          }
        res.json(students);
        } catch (error) {
        console.error('Error finding students by this class:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
       
    },
    deleteStudent:async(req,res)=>{
      const id=req.body.student_id;
      try {
        let student = await StudentsModel.findOne({ id:id });
        if (!student) {
          console.error('Error finding students by this class:', error);
          res.json({error:"the student is not exisist"}).status(404)
        }
        res.json("succes").status(200);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

    }
}