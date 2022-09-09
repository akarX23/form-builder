import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
  formData: [],
  formName: String,
});

const Form = mongoose.models.Form || mongoose.model("Form", FormSchema);

const findOne = async (query) => await Form.findOne(query);

const find = async (query) => await Form.find(query);

const insertOne = async (data) => {
  let newForm = new Form(data);

  await newForm.save();
  return newForm;
};

const deleteOne = async (query) => await Form.remove(query);

const updateOne = async (query, data) => {
  console.log(data);
  const form = await Form.findOneAndUpdate(query, data, {
    returnOriginal: false,
  });
  return form;
};

const upsertOne = async (query, data) => {
  const form = await Form.findOneAndUpdate(query, data, {
    upsert: true,
    returnOriginal: false,
  }).lean();
  return form;
};

export { Form, findOne, find, insertOne, upsertOne, deleteOne, updateOne };
