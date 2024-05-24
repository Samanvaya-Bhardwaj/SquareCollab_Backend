import Scholar from '../models/scholarModel.js';


//get all scholars
export const getAllData = async (req, res) => {
  try {
    const data = await Scholar.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//Create a new data 
export const createData = async (req, res) => {
  try {
    const createData = await Scholar.create(req.body);
    res.status(201).send(createData);
    console.log("Body", createData);

  } catch (err) {
    res.status(500).send({ message: "Error in creating the data ", error: err.message });
  }
}


//get all Scholars by id
export const getDataById = async (req, res) => {
  try {
    const data = await Scholar.findById(req.params.id);
    if (data == null) {
      return res.status(404).json({ message: "Cannot find data" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update Scholar detail by using id
export const updateData = async (req, res) => {
  try {
    const data = await Scholar.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) {
      return res.status(404).send({ message: 'researcher not found with this id ' + req.params.id });
    }
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//delete Scholar using id
export const deleteData = async (req, res) => {
  try {
    const data = await Scholar.findByIdAndDelete(req.params.id);
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

//search Scholar controller
export const searchScholarController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await researchers
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { affiliation: { $regex: keyword, $options: "i" } },
          { title: { $regex: keyword, $options: "i" } },
          { researchInterests: { $regex: keyword, $options: "i" } },
          { "publications.title": { $regex: keyword, $options: "i" } },
          { "publications.type": { $regex: keyword, $options: "i" } },
        ],
      })
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

export const updateScholarProfileController = async (req, res) => {
  try {
    const {
      name,
      affiliation,
      title,
      contact,
      researchInterests,
      education,
      publications,
      professionalExperience,
      honorsAndAwards,
      professionalMemberships,
      skills,
      socialMediaProfiles,
      photo,
    } = req.body;

    // Find the scholar by their user ID
    const scholar = await Scholars.findById(req.user._id);

    // Update the scholar's profile fields based on the provided data
    const updatedScholar = await Scholars.findByIdAndUpdate(
      req.user._id,
      {
        name: name || scholar.name,
        affiliation: affiliation || scholar.affiliation,
        title: title || scholar.title,
        contact: contact || scholar.contact,
        researchInterests: researchInterests || scholar.researchInterests,
        education: education || scholar.education,
        publications: publications || scholar.publications,
        professionalExperience:
          professionalExperience || scholar.professionalExperience,
        honorsAndAwards: honorsAndAwards || scholar.honorsAndAwards,
        professionalMemberships:
          professionalMemberships || scholar.professionalMemberships,
        skills: skills || scholar.skills,
        socialMediaProfiles: socialMediaProfiles || scholar.socialMediaProfiles,
        photo: photo || scholar.photo,
      },
      { new: true } // Return the updated document
    );

    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedScholar,
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
