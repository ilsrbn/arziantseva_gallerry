<template>
  <footer>
    <div class="footer__container">
      <span>created by: </span><a href="https://t.me/Zhyvny"><nav-link small>ilsrbn</nav-link></a> <span>&</span> <a href="https://www.instagram.com/krmisabitchh/"><nav-link small>krmisabitcchh</nav-link></a>
    </div>
  </footer>
</template>

<script>
export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Footer'
}
</script>

<style scoped lang="scss">
footer {
  width: 100%;
  padding: 33px 0 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  .footer__container {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    color: white;
  }
}

</style>
