const { AutoModelForSequenceClassification } = require('transformers');
const { SequenceClassifier } = require('transformers');

const model = new AutoModelForSequenceClassification({
  task: 'sequence_classification',
  model_name: 'bert-base-uncased',
  num_labels: 8,
});

const sequenceClassifier = new SequenceClassifier({
  model: model,
  tokenizer: 'bert-base-uncased',
});

async function classifyText(text) {
  const inputs = {
    input_ids: [text],
    attention_mask: [1],
  };
  const outputs = await model.predict(inputs);
  const predictions = outputs.predictions;
  return predictions;
}

export { classifyText };
