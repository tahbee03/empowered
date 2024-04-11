import mongoose, { Schema, models } from "mongoose";

const resumeSchema = new Schema(
  {
    owner: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: ""
    },
    phone: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      default: ""
    },
    education: {
      school: {
        type: String,
        default: ""
      },
      gpa: {
        type: String,
        default: ""
      },
      degree: {
        type: String,
        default: ""
      },
      start_date: {
        type: String,
        default: ""
      },
      end_date: {
        type: String,
        default: ""
      }
    },
    work_experience: [
      {
        job_title: {
          type: String
        },
        company: {
          type: String
        },
        responsibilities: {
          type: [String]
        },
        start_date: {
          type: String
        },
        end_date: {
          type: String
        }
      }
    ],
    skills: {
      type: [String]
    }
  },
  { timestamps: true }
);

const Resume = models.Resume || mongoose.model("Resume", resumeSchema);
export default Resume;