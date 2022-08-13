<template>
  <transition>
    <div v-if="loading" class="clock-loader__wrapper">
      <div class="clock-loader" />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ClockLoader',
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.clock-loader__wrapper {
  position: sticky;
  left: 0;
  top: 0;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  background: black;
}
.clock-loader {
  --clock-color: #1976d2;
  --clock-width: 4rem;
  --clock-radius: calc(var(--clock-width) / 2);
  --clock-minute-length: calc(var(--clock-width) * 0.4);
  --clock-hour-length: calc(var(--clock-width) * 0.2);
  --clock-thickness: 0.2rem;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--clock-width);
  height: var(--clock-width);
  border: 3px solid var(--clock-color);
  border-radius: 50%;

&::before,
&::after {
   position: absolute;
   content: "";
   top: calc(var(--clock-radius) * 0.25);
   width: var(--clock-thickness);
   background: var(--clock-color);
   border-radius: 10px;
   transform-origin: center calc(100% - calc(var(--clock-thickness) / 2));
   animation: spin infinite linear;
 }

&::before {
   height: var(--clock-minute-length);
   animation-duration: 2s;
 }

&::after {
   top: calc(var(--clock-radius) * 0.25 + var(--clock-hour-length));
   height: var(--clock-hour-length);
   animation-duration: 15s;
 }
}

@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}
</style>
