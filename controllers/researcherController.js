import researchers from '../models/researcherModel.js';

//get all researchers
export const getAllData = async (req, res) => {
  try {
    const data = await researchers.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//Create a new data 
export const createData = async (req,res) => {
  try{
      const createData = await researchers.create(req.body);
      res.status(201).send(createData);
      console.log("Body",createData);

  }catch(err){
      res.status(500).send({message : "Error in creating the data " , error: err.message});
  }
}


//get all researchers by id
export const getDataById = async (req, res) => {
  try {
    const data = await researchers.findById(req.params.id);
    if (data == null) {
      return res.status(404).json({ message: "Cannot find data" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update researcher detail by using id
export const updateData = async (req, res) => {
  try {
    const data = await researchers.findByIdAndUpdate(req.params.id ,req.body , {new : true});
    if(!data){
      return res.status(404).send({message :'researcher not found with this id ' + req.params.id});
    }
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//delete researcher using id
export const deleteData = async (req, res) => {
  try {
    const data = await researchers.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Cannot find data" });
    }
    res.json({ message: "Deleted data" });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).send({ message: 'Researcher not found with this id ' + req.params.id });
    }
    res.status(500).json({ message: error.message });
  }
};



export const updateResearcherProfileController = async (req, res) => {
  try {
    const {
      name,
      affiliation,
      title,
      contact,  
      researchInterests,
      education,
      publications,
      researchProjects,
      professionalExperience,
      honorsAndAwards,
      professionalMemberships,
      skills,
      socialMediaProfiles,
      photo,
    } = req.body;

    // Find the researcher by their user ID
    const researcher = await Researcher.findById(req.user._id);

    // Update the researcher's profile fields based on the provided data
    const updatedResearcher = await Researcher.findByIdAndUpdate(
      req.user._id,
      {
        name: name || researcher.name,
        affiliation: affiliation || researcher.affiliation,
        title: title || researcher.title,
        contact: contact || researcher.contact,
        researchInterests: researchInterests || researcher.researchInterests,
        education: education || researcher.education,
        publications: publications || researcher.publications,
        researchProjects: researchProjects || researcher.researchProjects,
        professionalExperience:
          professionalExperience || researcher.professionalExperience,
        honorsAndAwards: honorsAndAwards || researcher.honorsAndAwards,
        professionalMemberships:
          professionalMemberships || researcher.professionalMemberships,
        skills: skills || researcher.skills,
        socialMediaProfiles:
          socialMediaProfiles || researcher.socialMediaProfiles,
        photo: photo || researcher.photo,
      },
      { new: true } // Return the updated document
    );

    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedResearcher,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Updating Profile",
      error,
    });
  }
};
