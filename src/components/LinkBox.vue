<template>
  <div class="link-box">
    <slot />
    <div class="link-box__dec"></div>
  </div>
</template>

<script>
export default {
  name: 'LinkBox',
};
</script>

<style lang="scss" scoped>
.link-box {
  position: relative;
  display: inline-block;

  &:hover {
    .link-box__dec {
      width: 100%;
    }
  }
}

.link-box__dec {
  position: absolute;
  height: 2px;
  width: 0;
  background: #000000;
  transition: width 0.3s;
  overflow: hidden;
}
</style>
