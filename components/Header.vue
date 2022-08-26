<template>
  <header>
    <div class="header__container">
      <div class="header__left">
        <LogoComponent />
      </div>
      <div class="header__right">
        <nav>
          <ul>
            <li v-for="(link, i) in links" :key="i">
              <nuxt-link :to="link.href">
                <nav-link class="uppercase">
                  {{ link.text }}
                </nav-link>
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <div class="social">
          <nav-link v-for="(icon, i) in social" :key="i">
            <img :src="require(`~/assets/icons/social/${icon}`)">
          </nav-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import LogoComponent from '@/components/Logo'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  components: { LogoComponent },
  data: () => ({
    links: [
      {
        href: '/categories',
        text: 'Categories'
      },
      {
        href: '/blog',
        text: 'Blog'
      },
      {
        href: '/about-me',
        text: 'About me'
      }
    ],
    social: ['inst.svg', 'fb.svg']
  })
}
</script>

<style scoped lang="scss">
header {
  background: var(--background-color);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  max-width: 100vw;
  padding: 41px 0 20px;
  margin: 0;
  .header__container {
    width: 100%;
    max-width: calc(100% - 134px);
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header__left {
    margin-left: 102px;
  }
  .header__right {
    display: flex;
    align-items: center;
    gap: 153px
  }
  nav ul {
    display: flex;
    align-items: center;
    gap: 46px;
  }
  .social {
    display: flex;
    align-items: center;
    gap: 14px;
  }
}
</style>
