<script setup lang="ts">
const input = ref('mie')

interface Animal {
  sound: string
  name: string
  emoji: string
}

const animals: Array<Animal> = [
  {
    sound: 'mie',
    name: 'sheep',
    emoji: '🐑',
  },
  {
    sound: 'miao',
    name: 'cat',
    emoji: '🐈',
  },
  {
    sound: 'gaga',
    name: 'duck',
    emoji: '🦆',
  },
  {
    sound: 'woff',
    name: 'fox',
    emoji: '🦊',
  },
]

const animal = computed(() => {
  return animals.find(animal => animal.sound === input.value)
})

const shouldUpdate = ref<string | null>()
const ANIMAL_CNT = 1_000
const randNum = ref(0)

watch(animal, (val) => {
  if (val) {
    shouldUpdate.value = val?.name
    randNum.value = ~~(Math.random() * ANIMAL_CNT)
  }
})
</script>

<template>
  <div h-90vh w-full overflow-y-scroll overflow-x-hidden flex="~ col">
    <div flex="c" gap-10px py-2>
      <span>Please input a animal sound(e.g. woff): </span>
      <input v-model="input" border="dashed #1890ff 1px" type="text" py-2 px-4>
    </div>
    <div v-memo="[shouldUpdate]" flex="~ wrap" gap-10px w-full p-2 select-none>
      <div v-for="i in ANIMAL_CNT" :key="i" class="animal-warpper" :class="{ scale: Math.abs(i - randNum) % 8 === 0 }" :data-index="i">
        <div class="animal">
          {{ animal?.emoji }}
        </div>
      </div>
    </div>
  </div>
  <div text-center mt-4 flex="c" gap-2>
    <div i-ph:warning-duotone text="yellow-600" />
    Not update with you input? Please provide animal sounds and emoji in <a color="#9333ea" alink href="https://github.com/JiatLn/vue-memo/issues" target="_blank">issue</a>!!!
  </div>
</template>

<style lang="scss" scoped>
input {
  &:focus,
  &:active {
    border: transparent;
  }
}

.animal-warpper {
  font-size: 20px;
  cursor: pointer;

  .animal {
    animation: animal-rotate linear 1s infinite;
  }

  &:hover,
  &.scale {
    transform: scale(300%) !important;
    transition: all 1000ms;
  }
}

@keyframes animal-rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(1turn);
  }
}
</style>
