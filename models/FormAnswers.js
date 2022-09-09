import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
  },
  values: [],
});

const FormAnswers =
  mongoose.models.FormAnswer || mongoose.model("FormAnswer", FormSchema);

const findOne = async (query) =>
  await FormAnswers.findOne(query).populate("formId");

const find = async (query) => await FormAnswers.find(query).populate("formId");

const insertOne = async (data) => {
  let newFormAnswers = new FormAnswers(data);

  await newFormAnswers.save();
  return newFormAnswers;
};

const deleteOne = async (query) => await FormAnswers.remove(query);

const updateOne = async (query, data) => {
  console.log(data);
  const formAnswers = await FormAnswers.findOneAndUpdate(query, data, {
    returnOriginal: false,
  });
  return formAnswers;
};

const upsertOne = async (query, data) => {
  const form = await FormAnswers.findOneAndUpdate(query, data, {
    upsert: true,
    returnOriginal: false,
  }).lean();
  return form;
};

export {
  FormAnswers,
  findOne,
  find,
  insertOne,
  upsertOne,
  deleteOne,
  updateOne,
};
