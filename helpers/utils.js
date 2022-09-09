import * as FormAnswers from "../models/FormAnswers";

const ObjectsToCsv = require("objects-to-csv");

export const saveCSV = async (answersId) => {
  const formAnswers = await FormAnswers.findOne({ _id: answersId });

  console.log(formAnswers);

  const form = formAnswers.formId;

  let csvRow = {
    name: "Ritik",
    college: "RVCE",
  };

  let questionFilteredData = [];

  form.formData.forEach(
    (questionData) =>
      questionData.label &&
      questionFilteredData.push({
        question: questionData.label,
        options: questionData.options || [],
        field_name: questionData.field_name,
      })
  );

  console.log(questionFilteredData);

  questionFilteredData.forEach((questionData, i) => {
    let answer = formAnswers.values.find(
      (valueData) => valueData.name === questionData.field_name
    );

    let answerText = answer.value;

    // check if answer text is array or string
    if (Array.isArray(answerText)) {
      answerText = form.formData
        .find((data) => data.field_name === questionData.field_name)
        .options.find(
          (option) => option.key === formAnswers.values[i].value[0]
        ).value;
    }

    csvRow[questionData.question] = answerText;
  });

  console.log(csvRow);

  const csv = new ObjectsToCsv([csvRow]);
  await csv.toDisk("./list.csv", { append: true });
};
