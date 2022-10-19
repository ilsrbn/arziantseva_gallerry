<template>
  <header :class="{'mobile': menu}">
    <div class="header__container">
      <div class="header__left">
        <LogoComponent />
      </div>
      <div class="header__right">
        <nav>
          <ul>
            <li v-for="(link, i) in links" :key="i">
              <nav-link :link="link.href" class="uppercase">
                {{ link.text }}
              </nav-link>
            </li>
          </ul>
        </nav>
        <div class="social">
          <a v-for="(item, i) in social" :key="i" :href="item.href">
            <i :class="`ri-${item.icon}-line`" />
          </a>
        </div>
      </div>
      <div class="header__right-mobile">
        <Hamburger />
      </div>
    </div>
    <div v-show="menu" class="header__container-mobile">
      <div class="header__right">
        <nav>
          <ul>
            <li v-for="(link, i) in links" :key="i">
              <nav-link :link="link.href">
                {{ link.text }}
              </nav-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div v-show="menu" class="header__container-mobile-bottom">
      <div class="social">
        <a v-for="(item, i) in social" :key="i" :href="item.href">
          <i :class="`ri-${item.icon}-line`" />
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
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
    social: [
      {
        icon: 'instagram',
        href: 'https://www.instagram.com/solemn_void/'
      },
      {
        icon: 'behance',
        href: 'https://www.behance.net/kingbluelif7dc'
      },
      {
        icon: 'telegram',
        href: 'https://t.me/niemonalisa'
      }
    ]
  }),
  computed: {
    ...mapGetters({
      menu: 'menu/open'
    })
  },
  watch: {
    menu () {
      if (this.menu) {
        document.querySelector('body').classList.add('mobile-nav')
      } else {
        document.querySelector('body').classList.remove('mobile-nav')
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
header {
  //background: var(--background-color);
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0 5px 1rem black;
  //background: linear-gradient(to bottom, rgba(0, 0, 0, .85) 60%, rgba(0, 0, 0, 0));
  @media screen and(max-width: 998px) {
    background: rgba(0, 0, 0, 0.4);
  }
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100vw;
  padding: 30px 0 30px;
  margin: 0;
  z-index: 500;
  &.mobile {
    height: 100vh;
  }
  .header__container {
    width: 100%;
    max-width: calc(100% - 88px);
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 998px) {
      max-width: calc(100% - 32px);
    }
    &-mobile {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      //padding-bottom: 24px;
      .header__right {
        @media screen and (max-width: 998px) {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: center;
          align-items: center;
          nav ul {
            flex-direction: column;
          }
          & > * {
            flex: 0 0 33.333%;
          }
        }
      }
      &-bottom {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 24px;
      }
    }
  }
  .header__left {
    margin-left: 165px;
    @media screen and (max-width: 1280px) {
      margin-left: 0;
    }
  }
  .header__right {
    display: flex;
    align-items: center;
    gap: 4vw;
    @media screen and (max-width: 998px) {
      display: none;
    }
    &-mobile {
      display: none;
      @media screen and (max-width: 998px) {
        display: flex;
      }
    }
  }
  nav ul {
    display: flex;
    align-items: center;
    gap: 90px;
  }
  .social {
    display: flex;
    align-items: center;
    gap: 14px;
    a {
      text-decoration: none;
    }
  }
}
</style>
