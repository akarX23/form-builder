// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import mongoose from "mongoose";
import dbConnect from "../../helpers/dbConnect";

import * as Form from "../../models/Form";

dbConnect();

export default async function handler(req, res) {
  let form;
  switch (req.method) {
    case "POST":
      let data = req.body;
      if (req.body.task_data) {
        data.formData = req.body.task_data;
      }
      form = await Form.upsertOne(
        { _id: req.query._id || new mongoose.Types.ObjectId().toString() },
        data
      );
      res.status(200).json(form);
      break;

    case "GET":
      form = await Form.findOne({ _id: req.query._id });
      res.status(200).json(form);
      break;

    default:
      res.status(400).json({ success: false });
  }
}
