import nltk
from nltk.chat.util import Chat, reflections

pairs = [
    [
        "quem foi leonardo da vinci?",
        ["Leonardo da Vinci foi um artista, cientista e inventor italiano...",]
    ],
]

chat = Chat(pairs, reflections)
chat.converse()