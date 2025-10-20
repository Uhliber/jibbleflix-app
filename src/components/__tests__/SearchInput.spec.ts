import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SearchInput from '@/components/SearchInput.vue'

describe('SearchInput.vue', () => {
  it('renders properly with initial model value', () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: 'Jibble',
      },
    })

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.element.value).toBe('Jibble')
  })

  it('emits update:modelValue when typing', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: '',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('Inception')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['Inception'])
  })

  it('clears input when clear button is clicked', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: 'Matrix',
      },
    })

    const clearButton = wrapper.find('a[role="button"]')
    await clearButton.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    const emitted = wrapper.emitted('update:modelValue')!
    const last = emitted[emitted.length - 1]
    expect(last).toEqual([''])
  })

  it('has correct placeholder text', () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: '',
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Search Movie by Title')
  })
})
