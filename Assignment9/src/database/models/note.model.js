import mongoose from "mongoose";

let noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return value !== value.toUpperCase();
        },
        message: "invalid title, title can't be fully uppercase",
      },
    },
    content: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const noteModel = mongoose.model("notes", noteSchema);
