import mongoose from "mongoose";
const sliderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Slider title is required"],
      trim: true,
    },
    image: {
      desktop: {
        type: String,
        required: [true, "Desktop image is required"],
      },
      mobile: {
        type: String,
        required: [true, "Mobile image is required"],
      },
    },
      href: {
      type: String,
      required: [true, "Slider href is required"],
    },
      path: {
      type: String,
      required: [true, "Slider path is required"],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Slider = mongoose.model("Slider", sliderSchema);
export default Slider;
