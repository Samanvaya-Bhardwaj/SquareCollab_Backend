import Scholars from '../models/scholarModel.js';

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
