<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import IconFilm from '@/components/icons/IconFilm.vue'
import IconStar from '@/components/icons/IconStar.vue'

import { useMoviesStore } from '@/stores/movies'
import NavigationTabs from '@/components/NavigationTabs.vue'
import MovieList from '@/components/MovieList.vue'

const moviesStore = useMoviesStore()

onMounted(async () => {
  moviesStore.loadFavoritesFromStorage()
  await moviesStore.loadMovies()
})

const tabs = [
  { name: 'Movies', icon: IconFilm },
  { name: 'Favorites', icon: IconStar },
]

type TabName = (typeof tabs)[number]['name']

const activeTab = ref<TabName>('Movies')
</script>

<template>
  <header class="flex justify-center">
    <div>
      <img alt="JibbleFlix logo" class="h-auto w-auto" src="./assets/logo/logo.png" />
      <div class="-mt-2">
        <HelloWorld msg="Binge the Jibble Way" />
      </div>
    </div>
  </header>

  <main class="mt-4 w-full">
    <NavigationTabs :tabs="tabs" :initialTab="activeTab" @update:activeTab="activeTab = $event" />

    <div class="mt-4">
      <MovieList
        v-if="activeTab === 'Movies'"
        :movies="moviesStore.moviesWithFavorite"
        :is-loading="moviesStore.isLoading"
        :pagination="moviesStore.moviesPagination"
        @toggle-favorite="moviesStore.toggleFavorite"
        @page-change="moviesStore.goToPage"
      />
      <MovieList
        v-else
        :movies="moviesStore.favoritesWithFlag"
        :is-loading="moviesStore.isLoading"
        @toggle-favorite="moviesStore.toggleFavorite"
      />
    </div>
  </main>

  <footer>
    <p class="text-primary-900"><span class="text-white/20">by</span> Ollie Cape 2025</p>
  </footer>
</template>

<style scoped></style>
