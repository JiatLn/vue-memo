import sheep from '@/data/sounds/sheep.mp3'
import cat from '@/data/sounds/cat.wav'
import fox from '@/data/sounds/fox.mp3'
import cow from '@/data/sounds/cow.mp3'
import duck from '@/data/sounds/duck.mp3'
import dog from '@/data/sounds/dog.wav'

export interface Animal {
  sound: string
  name: string
  emoji: string
  media?: string
}

export const animals: Array<Animal> = [
  {
    sound: 'mie',
    name: 'sheep',
    emoji: '🐑',
    media: sheep,
  },
  {
    sound: 'miao',
    name: 'cat',
    emoji: '🐈',
    media: cat,
  },
  {
    sound: 'gaga',
    name: 'duck',
    emoji: '🦆',
    media: duck,
  },
  {
    sound: 'woff',
    name: 'fox',
    emoji: '🦊',
    media: fox,
  },
  {
    sound: 'moo',
    name: 'cow',
    emoji: '🐄',
    media: cow,
  },
  {
    sound: 'woof',
    name: 'dog',
    emoji: '🐕',
    media: dog,
  },
]
