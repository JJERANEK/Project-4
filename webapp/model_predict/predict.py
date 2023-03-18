import tensorflow as tf
import os


HOUSE_PATH = 'house_model.h5'
SENATE_PATH = 'senate_model.h5'


os.chdir(os.path.dirname(os.path.realpath(__file__)))
house_nn = tf.keras.models.load_model(HOUSE_PATH, compile=False)
# senate_nn = tf.keras.models.load_model(SENATE_PATH, compile=False)

house_nn.compile(loss="binary_crossentropy", optimizer="adam", metrics=["accuracy"])