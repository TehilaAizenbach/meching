const {ClassModel}=require("../models/classes")

exports.ClassCtrl={
    getClasses:async(req,res)=>{
        try {
            const classes = await ClassModel.find({});
            const classesData = classes.map(classItem => classItem.toObject());
            res.json(classesData);
          } catch (error) {
            console.error('Error finding classes:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          } 
    },
    addClass:async(req,res)=>{
      const classItem=req.body;
      try {
        let findClass=await ClassModel.findOne({class_name:classItem.class_name})
        if (findClass) {
          res.json({error:"Error The class exists in the system"})
        }else{
          newClass=new ClassModel(classItem);
          await newClass.save();
          res.status(200).json("success")
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
    updateClass:async(req,res)=>{
      const classItem=req.body;
      try {
        let findClass=await ClassModel.findOne({class_name:classItem.old_name})
        if(findClass){
        if (classItem.old_name !=classItem.class_name ) {
          if (await ClassModel.findOne({class_name:classItem.class_name})) {
            res.json({error:"this name of the class exists in te system"})
            return
          }
        }
        findClass.class_name=classItem.class_name;
        findClass.points=classItem.points;
        findClass.target=classItem.target;
        let result=await ClassModel.updateOne({class_name:classItem.old_name},findClass);
        res.status(200).json("success");
        }else{
          res.status(404).json("class is not found");
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });

      }
    },
    addPoints:async(req,res,next)=>{
    const {studentItem,points}=req.body;
    const class_name=studentItem.group;
    try {
    const classItem = await ClassModel.findOne({ class_name: class_name });

    if (classItem) {
      classItem.points = classItem.points + points;
      const result = await ClassModel.updateOne({ class_name: class_name }, classItem);
    }
    if (next) {
      return 'success'
    }else{
      res.json("succes").status(200);
    }

  } catch (error) {
    console.error('Error finding classes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } 
    },
    resetPoints:async(req,res,next)=>{
      try {
      let classes= await ClassModel.find({});
      await classes.forEach(async (classItem) => {
        classItem.points=0;
        let result = await ClassModel.updateOne({ class_name: classItem.class_name }, classItem);
      });
      classes= await ClassModel.find({});
      const  classesData = await classes.map( classItem =>  classItem.toObject());
      if (next) {
        return classesData;
      }else{
        res.json(classesData).status(200);   
      }
    } catch (error) {
      console.error('Error finding classes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }

    },
    resetPointsOfClass:async(req,res)=>{
      const {name}=req.body;
      console.log(name);
      try {
        const classItem = await ClassModel.findOne({ class_name: name })
        if (classItem) {
          classItem.points = 0;
          const result = await ClassModel.updateOne({ class_name: name }, classItem);
          res.json("success").status(200);
        }else{
          res.json({error:"the class is not exisist"}).status(404)
        }
        
      } catch (error) {
        console.error('Error finding classes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } 
    },
    deleteCalss:async(req,res)=>{
      const {class_name}=req.body;
      try {
        const classItem = await ClassModel.findOne({ class_name: class_name })
        if (!classItem) {
          res.json({error:"the class is not exisist"}).status(404)
        }else{
          classItem.deleteOne({ class_name: class_name })
          res.json("success").status(200);
        }
      } catch (error) {
        console.error('Error finding classes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

    }
}