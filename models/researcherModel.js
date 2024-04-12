import mongoose, { trusted } from "mongoose";

const ResearcherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  affiliation: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  contact: {
    email: {
      type: String, 
      require: true, 
      unique:true,
    },
    phone: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
  },
  researchInterests: {
    type: [String],
    required: true,
  },
  education: [
    {
      degree: {
        type: String,
        required: true,
      },
      institution: {
        type: String,
        required: true,
      },
      graduationYear: {
        type: Number,
        required: true,
      },
    },
  ],
  publications: [
    {
      title: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
    },
  ],
  researchProjects: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
      },
    },
  ],
  professionalExperience: [
    {
      position: {
        type: String,
        required: true,
      },
      organization: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
      },
    },
  ],
  honorsAndAwards: [
    {
      title: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
    },
  ],
  professionalMemberships: {
    type: [String],
  },
  skills: {
    type: [String],
    required: true,
  },
  socialMediaProfiles: {
    linkedIn: {
      type: String,
    },
    researchGate: {
      type: String,
    },
  },
  photo: {
    type: String,
  },
},
{
  timestamps: true,
}
);

export default mongoose.model("Researcher", ResearcherSchema);