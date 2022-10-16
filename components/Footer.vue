<template>
  <footer>
    <div class="footer__container">
      <div>
        <span>created by: </span>
      </div>
      <div>
        <a href="https://t.me/Zhyvny" target="_blank">Illia Serbin</a> <span class="delimiter">&</span>
      </div>
      <div><a href="https://t.me/yseffk" target="_blank">Pavlo Pavlenko</a> <span class="delimiter">&</span></div>
      <div><a href="https://www.instagram.com/krmisabitchh/" target="_blank">krmisabitcchh</a></div>
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
    @media screen and (max-width: 500px) {
      max-width: 90%;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      text-align: center;
      .delimiter {
        display: none;
      }
    }
    * {
      font-weight: 400 !important;
      text-decoration: none !important;
    }
  }
}

</style>
