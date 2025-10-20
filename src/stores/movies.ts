import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Movie, MovieResponse, Pagination } from '@/types/movie'
import { fetchMovies } from '@/services/movies'

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref<Movie[]>([])
  const favorites = ref<Movie[]>([])
  const searchQuery = ref<string>('')
  const currentPage = ref<number>(1)
  const totalPages = ref<number>(1)
  const perPage = ref<number>(10)
  const moviesTotal = ref<number>(0)
  const isLoading = ref<boolean>(false)

  const starredIds = computed<string[]>(() => favorites.value.map((m) => m.imdbID))

  const isFavorite = (id: string): boolean => starredIds.value.includes(id)

  const loadMovies = async (page: number = 1): Promise<void> => {
    isLoading.value = true
    try {
      const data: MovieResponse = await fetchMovies(searchQuery.value, page)
      movies.value = data.data
      currentPage.value = data.page
      totalPages.value = data.total_pages
      perPage.value = data.per_page
      moviesTotal.value = data.total
    } catch (err) {
      console.error('Failed to fetch movies:', err)
    } finally {
      isLoading.value = false
    }
  }

  const setSearch = (query: string): void => {
    searchQuery.value = query
    currentPage.value = 1
    loadMovies(1)
  }

  const toggleFavorite = (movie: Movie): void => {
    if (isFavorite(movie.imdbID)) {
      favorites.value = favorites.value.filter((m) => m.imdbID !== movie.imdbID)
    } else {
      favorites.value.push(movie)
    }
    localStorage.setItem('jibbleflix-favorites', JSON.stringify(favorites.value))
  }

  const loadFavoritesFromStorage = (): void => {
    const saved = localStorage.getItem('jibbleflix-favorites')
    if (saved) {
      favorites.value = JSON.parse(saved) as Movie[]
    }
  }

  function goToPage(page: number) {
    if (page < 1 || page > totalPages.value || page === currentPage.value) return
    loadMovies(page)
  }

  const pagination = computed<number[]>(() => {
    const pages: number[] = []
    const first = 1
    const last = totalPages.value
    const current = currentPage.value

    if (last <= 7) {
      // Show all pages if total pages <= 7
      for (let i = 1; i <= last; i++) pages.push(i)
    } else {
      pages.push(first)

      // Determine start and end for middle pages
      let start = current - 1
      let end = current + 1

      // Adjust if near the beginning
      if (current <= 3) {
        start = 2
        end = 4
      }

      // Adjust if near the end
      if (current >= last - 2) {
        start = last - 3
        end = last - 1
      }

      if (start > 2) pages.push(-1) // left "..."

      for (let i = start; i <= end; i++) pages.push(i)

      if (end < last - 1) pages.push(-1) // right "..."

      pages.push(last)
    }

    return pages
  })

  const moviesWithFavorite = computed<Movie[]>(() =>
    movies.value.map((movie) => ({
      ...movie,
      isFavorite: favorites.value.some((f) => f.imdbID === movie.imdbID),
    }))
  )

  const favoritesWithFlag = computed<Movie[]>(() =>
    favorites.value.map((movie) => ({
      ...movie,
      isFavorite: true,
    }))
  )

  const moviesPagination = computed<Pagination>(() => {
    return {
      page: currentPage.value,
      per_page: perPage.value,
      total: moviesTotal.value,
      total_pages: totalPages.value,
      pages: pagination.value,
    }
  })

  return {
    movies,
    favorites,
    searchQuery,
    currentPage,
    totalPages,
    isLoading,
    starredIds,
    isFavorite,
    loadMovies,
    setSearch,
    toggleFavorite,
    loadFavoritesFromStorage,
    goToPage,
    pagination,
    moviesWithFavorite,
    favoritesWithFlag,
    moviesPagination,
  }
})
