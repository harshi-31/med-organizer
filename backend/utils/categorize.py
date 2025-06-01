def categorize_text(text):
    text = text.lower()
    if any(keyword in text for keyword in ['bill', 'invoice', 'amount', 'total', 'payment']):
        return 'Bill'
    elif any(keyword in text for keyword in ['prescription', 'tablet', 'mg', 'take', 'dosage', 'doctor']):
        return 'Prescription'
    elif any(keyword in text for keyword in ['test', 'report', 'lab', 'result','wbc','hemoglobin']):
        return 'Test Report'
    else:
        return 'Unknown'

