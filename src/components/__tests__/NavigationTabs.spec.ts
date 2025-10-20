import { mount } from '@vue/test-utils'
import NavigationTabs from '@/components/NavigationTabs.vue'
import { describe, expect, it } from 'vitest'

const mockTabs = [
  { name: 'Movies', badge: 5 },
  { name: 'Favorites', badge: 2 },
]

describe('NavigationTabs.vue', () => {
  it('renders all mobile tabs', () => {
    const wrapper = mount(NavigationTabs, {
      props: { tabs: mockTabs },
    })

    const mobileTabs = wrapper.findAll('[data-cy="tab-mobile"]')
    expect(mobileTabs.length).toBe(mockTabs.length)
  })

  it('renders all desktop tabs', () => {
    const wrapper = mount(NavigationTabs, {
      props: { tabs: mockTabs },
    })

    const desktopTabs = wrapper.findAll('[data-cy="tab-desktop"]')
    expect(desktopTabs.length).toBe(mockTabs.length)
  })

  it('sets the first tab as active by default (desktop)', () => {
    const wrapper = mount(NavigationTabs, {
      props: { tabs: mockTabs },
    })

    const firstDesktopTab = wrapper.findAll('[data-cy="tab-desktop"]')[0]
    expect(firstDesktopTab?.classes().join(' ')).toContain('bg-primary-500/20')
  })

  it('respects the initialTab prop', () => {
    const wrapper = mount(NavigationTabs, {
      props: { tabs: mockTabs, initialTab: 'Favorites' },
    })

    const activeDesktopTab = wrapper.find('[data-cy="tab-desktop"][aria-current="page"]')
    expect(activeDesktopTab.text()).toContain('Favorites')
  })

  it('emits update:activeTab when desktop tab clicked', async () => {
    const wrapper = mount(NavigationTabs, {
      props: { tabs: mockTabs },
    })

    const secondTab = wrapper.findAll('[data-cy="tab-desktop"]')[1]
    await secondTab?.trigger('click')

    const emitted = wrapper.emitted('update:activeTab')
    expect(emitted).toBeTruthy()
    expect(emitted?.[0]?.[0]).toBe('Favorites')
  })

  it('emits update:activeTab when mobile tab clicked', async () => {
    const wrapper = mount(NavigationTabs, {
      props: { tabs: mockTabs },
    })

    const firstMobileTab = wrapper.findAll('[data-cy="tab-mobile"]')[0]
    await firstMobileTab?.trigger('click')

    const emitted = wrapper.emitted('update:activeTab')
    expect(emitted).toBeTruthy()
    expect(emitted?.[0]?.[0]).toBe('Movies')
  })

  it('renders badges correctly', () => {
    const wrapper = mount(NavigationTabs, {
      props: { tabs: mockTabs },
    })

    const desktopBadges = wrapper.findAll('[data-cy="tab-desktop"] span.rounded-full')
    expect(desktopBadges.length).toBe(2)
    expect(desktopBadges[0]?.text()).toBe('5')
    expect(desktopBadges[1]?.text()).toBe('2')
  })
})
