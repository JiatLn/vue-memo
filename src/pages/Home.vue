<script setup lang="ts">
import { animals } from '@/data/animals'
import { loadMedia } from '@/utils'

const input = ref('mie')

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
    if (val.media) {
      loadMedia(val.media)
    }
  }
}, {
  immediate: true,
})
</script>

<template>
  <div h-90vh w-full overflow-hidden flex="~ col">
    <div flex="c" gap-10px py-2>
      <div flex="c" gap-10px>
        <span>Please input a animal sound(e.g. moo 🐄): </span>
        <input v-model="input" placeholder="type animal sound" border="dashed #1890ff 1px" type="text" py-2 px-4>
      </div>
      <div v-if="animal?.media" title="play" cp @click="loadMedia(animal?.media)">
        🔊
      </div>
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
