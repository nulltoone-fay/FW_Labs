import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    buildId: { type: String, required: true, default: "01" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tech: { type: [String], required: true },
    status: {
      type: String,
      required: true,
      enum: ["ACTIVE", "DEPLOYED", "ARCHIVED", "MAINTENANCE"],
      default: "ACTIVE",
    },
    coordinates: { type: String, required: true, default: "SYS // PRJ.000" },
    link: { type: String, required: true },
    image: { type: String, default: "" }, // <-- NEW FIELD ADDED
  },
  {
    timestamps: true,
  },
);

const Project = models.Project || model("Project", ProjectSchema);
export default Project;
