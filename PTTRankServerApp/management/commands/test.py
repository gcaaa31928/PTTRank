# -*- coding: utf-8 -*-
import datetime
import json
import operator

from django.core import serializers
from django.core.management import BaseCommand
from keras.engine import Input
from keras.layers import Conv1D, MaxPooling1D, Flatten, Dense, Embedding
from keras.preprocessing.sequence import pad_sequences
from keras.utils.np_utils import to_categorical

from PTTRankServerApp.models import *
from PTTRankServerApp.ptt_helper import PTTHelper
from PTTRankServerApp.serializers import PTTSerializer
import jieba
import keras
import numpy as np
from keras.preprocessing.text import Tokenizer
from keras.models import Model


class Command(BaseCommand):
    help_text = 'my test command'
    jieba.set_dictionary('dict.txt.big')
    MAX_SEQUENCE_LENGTH = 1000
    VALIDATION_SPLIT = 0.1

    def handle(self, *args, **options):
        ptt = PTT.objects.all()
        ptt_json = PTTSerializer(ptt, many=True).data
        user_comments_times = dict()
        labels_index = 2
        labels = []
        texts = []
        for article in ptt_json:
            pointer = 1 if article['score'] > 0 else 0
            words = jieba.cut(article['contents'])
            for word in words:
                labels.append(pointer)
                texts.append(word)
        tokenizer = Tokenizer()
        tokenizer.fit_on_texts(texts)
        sequences = tokenizer.texts_to_sequences(texts)
        data = pad_sequences(sequences, maxlen=self.MAX_SEQUENCE_LENGTH)
        labels = to_categorical(np.asarray(labels))
        print('Shape of data tensor:', data.shape)
        print('Shape of label tensor:', labels.shape)
        print('Token word index:', tokenizer.word_index)
        indices = np.arange(data.shape[0])
        np.random.shuffle(indices)
        data = data[indices]
        labels = labels[indices]
        nb_validation_samples = int(self.VALIDATION_SPLIT * data.shape[0])

        x_train = data[:-nb_validation_samples]
        y_train = labels[:-nb_validation_samples]
        x_val = data[-nb_validation_samples:]
        y_val = labels[-nb_validation_samples:]


        print('Training model.')

        # train a 1D convnet with global maxpooling
        sequence_input = Input(shape=(self.MAX_SEQUENCE_LENGTH,), dtype='int32')
        x = Embedding(output_dim=100, input_dim=len(tokenizer.word_index), input_length=self.MAX_SEQUENCE_LENGTH)(sequence_input)
        x = Conv1D(128, 5, activation='relu')(x)
        x = MaxPooling1D(5)(x)
        x = Conv1D(128, 5, activation='relu')(x)
        x = MaxPooling1D(5)(x)
        x = Conv1D(128, 5, activation='relu')(x)
        x = MaxPooling1D(35)(x)
        x = Flatten()(x)
        x = Dense(128, activation='relu')(x)
        preds = Dense(labels_index, activation='softmax')(x)
        model = Model(sequence_input, preds)
        model.compile(loss='categorical_crossentropy',
                      optimizer='rmsprop',
                      metrics=['acc'])

        # happy learning!
        model.fit(x_train, y_train, validation_data=(x_val, y_val),
                  nb_epoch=2, batch_size=64)
        score = model.evaluate(x_val, y_val, verbose=0)
        print('Test score:', score[0])
        print('Test accuracy:', score[1])