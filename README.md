The Damaged Packages Detector is an AI-powered web application designed to classify and predict whether a package is damaged based on uploaded images. It leverages deep learning models to analyze the visual features of package images and classify them as either damaged or not damaged. The app is built using Flask for the backend, and it employs a ResNet model for image classification.

Features
Upload Images: Users can upload images of packages for damage detection.
Damage Prediction: The system predicts whether a package is damaged or not based on the uploaded image.
AI Model: Uses a pre-trained ResNet model to classify images.
User-Friendly Interface: Simple web interface to easily upload images and get results.
Technologies Used
Frontend: nextjs, CSS, tailwindcss(with Flask template rendering)
Backend: Python, Flask
Machine Learning Model: ResNet-34 (Pre-trained model for damage classification)
Model Storage: tensorflow for loading the machine learning model
API: Flask-based REST API for handling requests and predictions
Deployment: The application is ready to be deployed on a cloud platform such as Heroku, AWS, or DigitalOcean.
