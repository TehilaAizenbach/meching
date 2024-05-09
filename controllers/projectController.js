const {ProjectModel}=require('../models/project');

exports.ProjectCtrl={
getProject:async(req,res)=>{
    try {
        // Use await to wait for the query to complete
        const projacts = await ProjectModel.find({});
    
        // Convert MongoDB documents to plain JavaScript objects
        const  projactData =  projacts.map( projactItem =>  projactItem.toObject());
    
        // Send the response with the plain JavaScript objects
        res.json(projactData);
      } catch (error) {
        console.error('Error finding classes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } 
},
addPoints:async(req,res,next)=>{
 const {code,points}=req.body;
  try {
    const project = await ProjectModel.findOne({ code: code });
    if (project) {
      project.points = project.points + points;
      const result = await ProjectModel.updateOne({ code: code }, project);
      if (next) {
        return 'success'
      }else{
        res.json("studentsData").status(200);
      }
    }
  } catch (error) {
    console.error('Error finding classes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } 
},
resetPoints:async(req,res,next)=>{
    try{
    const {code}=req.body;
    const project=await ProjectModel.findOne({code:code});
    if(project){
      project.points=0;
      const result = await ProjectModel.updateOne({ code: code }, project)
      // const resultSturesetStudentPoints
      const projects = await ProjectModel.find();
      const  projactData =  await projects.map( projactItem =>  projactItem.toObject());
      if (next) {
        return projactData;
      }else{
        res.json(projactData);
      }
      
    }else{
      return res.status(404).json({ error: 'Project not found' });
    }
    try {
    } catch (error) {
    }

  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
},
update:async(req,res)=>{
    try {
      const {project}=req.body;
      projetcFind=await ProjectModel.findOne({ code: project.code });
      if (projetcFind) {
        projetcFind.start_Date=project.startDate;
        console.log(projetcFind.start_Date );
        projetcFind.finish_Date=project.finish_Date;
        projetcFind.target=project.target;
        projetcFind.points=project.points;
        const result = await ProjectModel.updateOne({ code: project.code },projetcFind)
        const projects = await ProjectModel.find();
        const  projactData =  await projects.map( projactItem =>  projactItem.toObject());
        res.json(projactData);
      }else{
        res.json("project isnt found");
      }
     
    } catch (error) {
      console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
}