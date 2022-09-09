// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import mongoose from "mongoose";
import dbConnect from "../../helpers/dbConnect";
import { saveCSV } from "../../helpers/utils";

import * as FormAnswers from "../../models/FormAnswers";

dbConnect();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      let formAnswer = await FormAnswers.upsertOne(
        { _id: req.query._id || new mongoose.Types.ObjectId().toString() },
        req.body
      );
      saveCSV(formAnswer._id);
      res.status(200).json({});
      break;

    default:
      res.status(400).json({ success: false });
  }
}
