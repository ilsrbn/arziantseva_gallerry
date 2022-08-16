<template>
  <aside class="sidebar">
    <div class="sidebar__header">
      <LogoComponent />
    </div>
    <nav class="sidebar__navigation">
      <ul>
        <li v-for="(item, i) in menu" :key="i">
          <nuxt-link :to="item.url">
            {{ item.name }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <footer class="sidebar__footer" />
  </aside>
</template>

<script>
import LogoComponent from '@/components/Logo'
export default {
  name: 'SidebarComponent',
  components: { LogoComponent },
  data: () => ({
    menu: [
      {
        name: 'Home',
        url: '/'
      }
    ]
  })
}
</script>

<style scoped lang="scss">
.sidebar {
  padding: 34px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  //border: 1px dashed white;
  &__header, &__footer {
    flex: 0 0 8%;
  }
  &__navigation {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    ul {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  }
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: var(--secondary-color);
    font-size: 22px;
    transition: all 150ms;
    transform: translateX(0);
    &:hover {
      color: var(--accent2-color);
      transform: translateX(4px);
    }
    &:active,  {
      color: var(--accent-color) !important;
    }
    &.nuxt-link-exact-active {
      color: var(--accent-color) !important;
      transform: translateX(8px);
    }
  }
}
</style>
