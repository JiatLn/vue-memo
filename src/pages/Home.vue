<script setup lang="ts">
import { animals } from '@/data/animals'
import { loadMedia } from '@/utils'

const input = ref('mie')

const animal = computed(() => {
  return animals.find(animal => animal.sound === input.value.trim().toLowerCase())
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
  <div h-90vh w-full overflow-hidden flex="~ col" font-mono>
    <div flex="c lt-sm:col" gap-10px py-2 border-b>
      <div flex="c lt-sm:col" gap-10px>
        <span>Please input a animal sound(e.g. moo 🐄).</span>
        <div flex="c" gap-2 w-full px-2>
          <input v-model="input" flex-1 placeholder="type animal sound" rounded-full border="~ #1890ff 2px" type="text" py-2 px-4>
          <div v-if="animal?.media" title="play" cp @click="loadMedia(animal?.media)">
            🔊
          </div>
        </div>
      </div>
    </div>
    <div v-memo="[shouldUpdate]" flex="~ wrap" gap-10px w-full p-2 select-none overflow-hidden bg-yellow-300>
      <div v-for="i in ANIMAL_CNT" :key="i" class="animal-warpper" :class="{ scale: Math.abs(i - randNum) % 8 === 0 }" :data-index="i">
        <div class="animal">
          {{ animal?.emoji }}
        </div>
      </div>
    </div>
  </div>
  <div text-center mt-4 px-2 flex="c wrap" gap-2 font-mono>
    <div i-ph:warning-duotone text="yellow-600" />
    <div>Not update with you input?</div>
    <div>Please provide animal sounds and emoji in <a inline="block!" color="#9333ea" alink href="https://github.com/JiatLn/vue-memo/issues" target="_blank">issue</a> :)</div>
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
  flex: 1;
  font-size: 20px;
  cursor: pointer;

  .animal {
    animation: animal-rotate linear 2s infinite;
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
