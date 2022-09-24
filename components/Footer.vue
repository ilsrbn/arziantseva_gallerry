<template>
  <footer>
    <div class="footer__container">
      <span>created by: </span><a href="https://t.me/Zhyvny" target="_blank">lsrbn</a> <span>&</span> <span>Pavlo Pavlenko</span> <span>&</span> <a href="https://www.instagram.com/krmisabitchh/" target="_blank">krmisabitcchh</a>
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
    * {
      font-weight: 400 !important;
      text-decoration: none !important;
    }
  }
}

</style>
