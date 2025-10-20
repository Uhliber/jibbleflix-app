<script setup lang="ts">
import type { Tab } from '@/types/movie'
import { ref } from 'vue'

const props = defineProps<{
  tabs: Tab[]
  initialTab?: string
}>()

const emit = defineEmits<{
  (e: 'update:activeTab', tabName: string): void
}>()

const activeTab = ref<string>(props.initialTab || props.tabs[0]?.name || '')

function selectTab(tabName: string) {
  activeTab.value = tabName
  emit('update:activeTab', tabName)
}

const isActive = (tabName: string) => activeTab.value === tabName
</script>

<template>
  <div>
    <!-- Mobile Tabs -->
    <div class="block sm:hidden">
      <nav
        class="isolate flex divide-x divide-white/10 rounded-lg bg-neutral-800/50 shadow-none outline -outline-offset-1 outline-white/10"
        aria-label="Tabs"
      >
        <a
          v-for="(tab, idx) in tabs"
          :key="tab.name"
          href="#"
          @click.prevent="selectTab(tab.name)"
          :class="[
            isActive(tab.name) ? 'text-white' : 'text-neutral-400 hover:text-white',
            idx === 0 ? 'rounded-l-lg' : '',
            idx === tabs.length - 1 ? 'rounded-r-lg' : '',
            'group relative min-w-0 flex-1 overflow-hidden px-4 py-4 text-center text-sm font-medium hover:bg-white/5 focus:z-10',
          ]"
          :aria-current="isActive(tab.name) ? 'page' : undefined"
        >
          <span>
            {{ tab.name }}
          </span>
          <span
            v-if="tab.badge"
            :class="[
              isActive(tab.name)
                ? 'bg-primary-500/20 text-primary-400'
                : 'bg-white/10 text-neutral-300',
              'ml-2 rounded-full px-2.5 py-0.5 text-xs font-medium',
            ]"
          >
            {{ tab.badge }}
          </span>
          <span
            aria-hidden="true"
            :class="[
              isActive(tab.name) ? 'bg-primary-400' : 'bg-transparent',
              'absolute inset-x-0 bottom-0 h-0.5',
            ]"
          />
        </a>
      </nav>
    </div>

    <!-- Desktop Tabs -->
    <div class="hidden sm:block">
      <nav class="flex space-x-4" aria-label="Tabs">
        <a
          v-for="tab in tabs"
          :key="tab.name"
          href="#"
          @click.prevent="selectTab(tab.name)"
          :class="[
            isActive(tab.name)
              ? 'bg-primary-500/20 text-primary-300'
              : 'text-neutral-400 hover:text-neutral-200',
            'rounded-md px-3 py-2 text-sm font-medium',
          ]"
          :aria-current="isActive(tab.name) ? 'page' : undefined"
        >
          {{ tab.name }}
          <span
            v-if="tab.badge"
            :class="[
              isActive(tab.name)
                ? 'bg-primary-500/20 text-primary-400'
                : 'bg-white/10 text-neutral-300',
              'ml-2 rounded-full px-2.5 py-0.5 text-xs font-medium',
            ]"
          >
            {{ tab.badge }}
          </span>
        </a>
      </nav>
    </div>
  </div>
</template>

<style scoped></style>
