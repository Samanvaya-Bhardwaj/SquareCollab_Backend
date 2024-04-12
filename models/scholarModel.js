import mongoose from "mongoose";

const ScholarSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    affiliation: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    contact: {
      email: {
        type: String,
        required: true,
        unique: true,
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
        },
        institution: {
          type: String,
        },
        graduationYear: {
          type: Number,
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
    professionalExperience: [
      {
        position: {
          type: String,
        },
        organization: {
          type: String,
        },
        startDate: {
          type: Date,
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
        },
        year: {
          type: Number,
        },
      },
    ],
    professionalMemberships: {
      type: [String],
    },
    skills: {
      type: [String],
    },
    socialMediaProfiles: {
      linkedIn: {
        type: String,
      },
      researchGate: {
        type: String,
      },
      // Add more social media profiles as needed
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Scholars", ScholarSchema);
  