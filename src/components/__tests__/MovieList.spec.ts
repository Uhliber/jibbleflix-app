import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import MovieList from '@/components/MovieList.vue'
import type { Movie, Pagination } from '@/types/movie'

const mockMovies: Movie[] = [
  { imdbID: 'tt001', Title: 'Batman Begins', Year: '2005', isFavorite: false },
  { imdbID: 'tt002', Title: 'The Dark Knight', Year: '2008', isFavorite: true },
]

const mockPagination: Pagination = {
  page: 1,
  per_page: 10,
  total: 20,
  total_pages: 2,
  pages: [1, 2],
}

describe('MovieList.vue', () => {
  it('renders "No movies available" when movies are empty', () => {
    const wrapper = mount(MovieList, {
      props: { movies: [], isLoading: false },
    })

    expect(wrapper.text()).toContain('No movies available.')
  })

  it('shows a spinner when loading', () => {
    const wrapper = mount(MovieList, {
      props: { movies: [], isLoading: true },
    })

    expect(wrapper.findComponent({ name: 'TheSpinner' }).exists()).toBe(true)
  })

  it('renders a list of movies', () => {
    const wrapper = mount(MovieList, {
      props: { movies: mockMovies },
    })

    const items = wrapper.findAll('[data-cy="movie-item"]')

    expect(items.length).toBe(mockMovies.length)

    expect(items[0]!.text()).toContain('Batman Begins')
    expect(items[1]!.text()).toContain('The Dark Knight')
  })

  it('emits toggleFavorite when a movie item is clicked', async () => {
    const wrapper = mount(MovieList, {
      props: { movies: mockMovies },
    })

    await wrapper.find('[data-cy="movie-item"]').trigger('click')

    const emitted = wrapper.emitted('toggleFavorite')
    expect(emitted).toBeTruthy()
    expect(emitted?.[0]?.[0]).toEqual(mockMovies[0])
  })

  it('emits toggleFavorite when favorite button is clicked', async () => {
    const wrapper = mount(MovieList, {
      props: { movies: mockMovies },
    })

    const favBtn = wrapper.find('[data-cy="favorite-button"]')
    await favBtn.trigger('click')

    const emitted = wrapper.emitted('toggleFavorite')
    expect(emitted).toBeTruthy()
    expect(emitted?.[0]?.[0]).toEqual(mockMovies[0])
  })

  it('emits pageChange when next/prev pagination buttons are clicked', async () => {
    const wrapper = mount(MovieList, {
      props: {
        movies: mockMovies,
        pagination: {
          page: 2, // start from 2 so "Prev" works
          per_page: 10,
          total: 20,
          total_pages: 3,
          pages: [1, 2, 3],
        },
      },
    })

    const next = wrapper.get('[data-cy="pagination-next"]')
    const prev = wrapper.get('[data-cy="pagination-prev"]')

    await next.trigger('click')
    const emitted = wrapper.emitted('pageChange')
    expect(emitted).toBeTruthy()
    expect(emitted?.[0]?.[0]).toBe(3)

    await prev.trigger('click')
    expect(emitted?.[1]?.[0]).toBe(1)
  })

  it('renders correct pagination text', () => {
    const wrapper = mount(MovieList, {
      props: {
        movies: mockMovies,
        pagination: mockPagination,
      },
    })

    const text = wrapper.text().replace(/\s+/g, ' ').trim()
    expect(text).toContain('Showing 1 to 10 of 20')
  })

  it('disables next button when on last page', async () => {
    const wrapper = mount(MovieList, {
      props: {
        movies: mockMovies,
        pagination: { ...mockPagination, page: 2 },
      },
    })

    const nextButton = wrapper.find('[data-cy="pagination-next"]')
    expect(nextButton.classes()).toContain('pointer-events-none')
  })
})
