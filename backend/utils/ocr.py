from PIL import Image
import pytesseract

def extract_text_from_image(image_file):
    image = Image.open(image_file.stream)
    return pytesseract.image_to_string(image)