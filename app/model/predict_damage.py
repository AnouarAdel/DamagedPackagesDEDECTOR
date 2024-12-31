import tensorflow as tf
from PIL import Image
import numpy as np

MODEL_PATH = 'model/resnet34_model.h5'  # Replace with the actual path to your model
IMAGE_SIZE = (256, 256)  
# Load the model

model = tf.keras.models.load_model(MODEL_PATH)

def preprocess_image(image_path):
    """
    Preprocess the image to match the model's expected input.
    """
    image = Image.open(image_path).convert('RGB')
    image = image.resize(IMAGE_SIZE)  # Resize image to 256x256
    image_array = np.array(image) / 255.0  # Normalize to [0, 1]
    image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension
    return image_array


def predict_damage(image_path):
    try:
        preprocessed_image = preprocess_image(image_path)
        prediction = model.predict(preprocessed_image)[0]  # Assuming binary classification
        classes = {0: 'not damaged', 1: 'damaged'}
        result = {
            "not damaged": float(prediction[0]),
            "damaged": float(prediction[1]),
        }
        return result
    except Exception as e:
        print(f"Error in prediction: {e}")  # Debugging line
        raise

