def predict_damage(image_path):
    preprocessed_data = preprocess(image_path)
    
    predictions = model.predict(preprocessed_data)
    return predictions
