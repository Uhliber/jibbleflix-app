<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import type { Tab } from '@/types/movie'
import NavigationTabs from '@/components/NavigationTabs.vue'
import MovieList from '@/components/MovieList.vue'
import SearchInput from '@/components/SearchInput.vue'

const moviesStore = useMoviesStore()

onMounted(async () => {
  moviesStore.loadFavoritesFromStorage()
  await moviesStore.loadMovies()
})

const tabs = computed<Tab[]>(() => [
  { name: 'Movies' },
  { name: 'Favorites', badge: moviesStore.favorites.length },
])

type TabName = Tab['name']

const activeTab = ref<TabName>('Movies')
</script>

<template>
  <header class="grid justify-center">
    <div class="grid justify-center">
      <img alt="JibbleFlix logo" class="h-auto w-auto" src="./assets/logo/logo.png" />
      <div class="-mt-2 text-center text-xl">
        <h1>Binge the Jibble Way</h1>
      </div>
    </div>
    <SearchInput v-model="moviesStore.searchQuery" class="mt-8" />
  </header>

  <main class="mt-4 w-full">
    <NavigationTabs :tabs="tabs" :initialTab="activeTab" @update:activeTab="activeTab = $event" />

    <Transition name="fade" mode="out-in">
      <div :key="activeTab" class="mt-4">
        <MovieList
          v-if="activeTab === 'Movies'"
          :movies="moviesStore.moviesWithFavorite"
          :is-loading="moviesStore.isLoading"
          :pagination="moviesStore.moviesPagination"
          @toggle-favorite="moviesStore.toggleFavorite"
          @page-change="moviesStore.goToPage"
        />

        <div v-else class="grid gap-4">
          <MovieList
            v-if="moviesStore.highlightedFavorites.length"
            :movies="moviesStore.highlightedFavorites"
            @toggle-favorite="moviesStore.toggleFavorite"
          />
          <MovieList
            :movies="moviesStore.favoritesWithFlag"
            @toggle-favorite="moviesStore.toggleFavorite"
          />
        </div>
      </div>
    </Transition>
  </main>

  <footer>
    <p class="text-primary-900"><span class="text-white/20">by</span> Ollie Cape 2025</p>
  </footer>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
