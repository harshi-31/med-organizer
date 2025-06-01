'''from transformers import PegasusForConditionalGeneration, PegasusTokenizer
import torch

# Load the model and tokenizer
model_name = "google/pegasus-xsum"  # or consider "google/pegasus-large" for more power
tokenizer = PegasusTokenizer.from_pretrained(model_name)
model = PegasusForConditionalGeneration.from_pretrained(model_name)

def summarize_text(text):
    tokens = tokenizer(text, truncation=True, padding="longest", return_tensors="pt")
    summary_ids = model.generate(**tokens)
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary'''
