<script setup lang="ts">
import type { Movie, Pagination } from '@/types/movie'
import IconArrowUpRight from '@/components/icons/IconArrowUpRight.vue'
import IconStarSolid from '@/components/icons/IconStarSolid.vue'
import IconChevronLeft from '@/components/icons/IconChevronLeft.vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
import TheSpinner from '@/components/TheSpinner.vue'
import { computed } from 'vue'

const props = defineProps<{
  movies: Movie[]
  pagination?: Pagination
  isLoading?: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleFavorite', movie: Movie): void
  (e: 'pageChange', page: number): void
}>()

const resultsStart = computed<number>(() => {
  if (!props.pagination) return 0

  const start: number = (props.pagination.page - 1) * props.pagination.per_page + 1

  return start
})

const resultsEnd = computed<number>(() => {
  if (!props.pagination) return 0

  let end: number = props.pagination.page * props.pagination.per_page
  if (end > props.pagination.total) end = props.pagination.total

  return end
})

function goNext() {
  if (!props.pagination) return

  if (props.pagination?.page < props.pagination?.total_pages) {
    emit('pageChange', props.pagination?.page + 1)
  }
}

function goPrev() {
  if (!props.pagination) return

  if (props.pagination?.page > 1) {
    emit('pageChange', props.pagination?.page - 1)
  }
}
</script>

<template>
  <div>
    <!-- START: Movies List -->
    <div
      v-if="!movies.length || isLoading"
      :class="[
        'mt-4 flex items-center justify-center rounded-t-lg bg-neutral-800/50 outline-1 outline-white/10 sm:rounded-t-xl sm:-outline-offset-1',
        { 'rounded-b-lg sm:rounded-b-xl': !pagination },
      ]"
    >
      <TheSpinner v-if="isLoading" />
      <p v-else class="px-4 py-8 text-center text-white/20">No movies available.</p>
    </div>
    <ul
      v-else-if="movies.length"
      role="list"
      :class="[
        'mt-4 divide-y divide-white/5 overflow-hidden rounded-t-lg bg-neutral-800/50 outline-1 outline-white/10 last:outline-0 sm:rounded-t-xl sm:-outline-offset-1',
        { 'rounded-b-lg last:outline-1 sm:rounded-b-xl': !pagination },
      ]"
    >
      <li
        v-for="movie in movies"
        :key="movie.imdbID"
        class="group relative flex cursor-pointer justify-between gap-x-6 px-4 py-5 hover:bg-white/2.5 sm:px-6"
        @click="emit('toggleFavorite', movie)"
      >
        <div class="flex min-w-0 gap-x-4">
          <div class="min-w-0 flex-auto">
            <p class="font-semibold text-white">
              <span class="absolute inset-x-0 -top-px bottom-0" />
              {{ movie.Title }}
            </p>
            <p class="mt-1 flex text-sm/6 text-neutral-400">
              {{ movie.Year }}
            </p>
          </div>
        </div>
        <div class="z-0 flex shrink-0 items-center gap-x-4">
          <a
            :href="`https://www.imdb.com/title/${movie.imdbID}/`"
            class="flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-2 text-xs font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20"
            title="View on IMDb"
            @click.stop
          >
            IMDb
            <IconArrowUpRight class="w-4 flex-none text-neutral-500" aria-hidden="true" />
          </a>
          <button
            type="button"
            :class="[
              movie.isFavorite
                ? 'bg-primary-600 group-hover:bg-primary-700 focus-visible:outline-primary-70000 text-white'
                : 'bg-neutral-800 text-white/20 inset-ring inset-ring-white/5 group-hover:bg-neutral-600 focus-visible:outline-neutral-600',
              'cursor-pointer rounded-full p-2 shadow-none focus-visible:outline-2 focus-visible:outline-offset-2',
            ]"
            @click.stop="emit('toggleFavorite', movie)"
            aria-label="Toggle favorite"
            title="Add to Favorites"
          >
            <IconStarSolid class="size-4" aria-hidden="true" />
          </button>
        </div>
      </li>
    </ul>
    <!-- END: Movies List -->

    <!-- START: Pagination -->
    <div
      v-if="pagination"
      class="flex items-center justify-between overflow-hidden rounded-b-lg bg-neutral-800/50 px-4 py-3 shadow-none outline-1 outline-white/10 sm:rounded-b-xl sm:-outline-offset-1"
    >
      <div class="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          class="relative inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-neutral-200 hover:bg-white/10"
          >Previous</a
        >
        <a
          href="#"
          class="relative ml-3 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-neutral-200 hover:bg-white/10"
          >Next</a
        >
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="items-center text-sm text-neutral-300">
            {{ 'Showing ' }}
            <span class="font-bold">{{ resultsStart }}</span>
            {{ ' to ' }}
            <span class="font-bold">{{ resultsEnd }}</span>
            {{ ' of ' }}
            <span class="font-bold">{{ pagination.total }}</span>
          </p>
        </div>
        <div>
          <nav class="isolate inline-flex -space-x-px rounded-md" aria-label="Pagination">
            <a
              href="#"
              :class="[
                { 'pointer-events-none bg-neutral-800 text-neutral-600': pagination.page <= 1 },
                'relative inline-flex items-center rounded-l-md px-2 py-2 text-neutral-400 inset-ring inset-ring-neutral-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0',
              ]"
              @click="goPrev"
            >
              <span class="sr-only">Previous</span>
              <IconChevronLeft class="size-5" aria-hidden="true" />
            </a>
            <!-- Current: "z-10 text-white focus-visible:outline-2 focus-visible:outline-offset-2 bg-primary-500 focus-visible:outline-primary-500", Default: "inset-ring focus:outline-offset-0 text-neutral-200 inset-ring-neutral-700 hover:bg-white/5" -->
            <a
              v-for="(page, index) in pagination.pages"
              :key="`${page}-${index}`"
              href="#"
              aria-current="page"
              :class="[
                { 'pointer-events-none bg-neutral-800 text-neutral-600': page < 1 },
                pagination.page === page
                  ? 'bg-primary-500/20 text-primary-300 focus-visible:outline-primary-500 font-semibold'
                  : 'text-neutral-200 inset-ring inset-ring-neutral-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0',
                'relative z-10 inline-flex items-center px-4 py-2 text-sm inset-ring inset-ring-neutral-700 focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2',
              ]"
              @click="emit('pageChange', page)"
            >
              {{ page > 0 ? page : '...' }}
            </a>

            <a
              href="#"
              :class="[
                {
                  'pointer-events-none bg-neutral-800 text-neutral-600':
                    pagination.page >= pagination.total_pages,
                },
                'relative inline-flex items-center rounded-r-md px-2 py-2 text-neutral-400 inset-ring inset-ring-neutral-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0',
              ]"
              @click="goNext"
            >
              <span class="sr-only">Next</span>
              <IconChevronRight class="size-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
    <!-- END: Pagination -->
  </div>
</template>

<style scoped></style>
