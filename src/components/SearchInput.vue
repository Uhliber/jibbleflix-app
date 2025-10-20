<script setup lang="ts">
import IconCross from '@/components/icons/IconCross.vue'

const model = defineModel<string>({ required: true })

function clearSearch() {
  model.value = ''
}
</script>

<template>
  <div class="grid w-full grid-cols-1 md:w-3xl">
    <input
      v-model="model"
      type="text"
      name="search"
      class="focus:outline-primary-500 col-start-1 row-start-1 block w-full rounded-full bg-white/5 py-3 pr-10 pl-6 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 sm:pr-9"
      placeholder="Search Movie by Title"
    />
    <a
      v-if="model"
      href="#"
      role="button"
      class="col-start-1 row-start-1 mr-6 self-center justify-self-end text-neutral-500 hover:text-white/60"
      title="Clear search"
      @click.prevent="clearSearch"
    >
      <IconCross class="size-5" aria-hidden="true" />
    </a>
  </div>
</template>
