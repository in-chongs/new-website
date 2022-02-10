<template>
  <div class="footer">
    <div class="box">
      <div class="box-left" />
      <div class="box__terms">
        <div class="g-container">
          <LinkBox class="terms__term first" key="a">
            <a class="link-a" href="#">TWITTER</a>
          </LinkBox>
          <LinkBox class="terms__term" key="b">
            <a class="link-a" href="#">TELEGRAM</a>
          </LinkBox>
          <span class="right">© 2021 ANM. All rights reserved.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LinkBox from '@/components/LinkBox.vue';

export default {
  name: 'Footer',
  components: { LinkBox },
};
</script>

<style lang="scss" scoped>
.box {
  // @media (min-width: 960px) {
  //   z-index: 2;
  //   position: fixed;
  //   bottom: 0;
  //   right: 0;
  //   left: 0;
  // }
  .box-left {
    margin-bottom: 40px;
  }
}

.container {
  @media (max-width: 1280px) {
    max-width: 760px;
    flex: 1;
  }
}

.container-img {
  @media (max-width: 760px) {
    display: none;
  }
}

.title {
  font-size: 40px;
  line-height: 60px;
  @media (max-width: 960px) {
    font-size: 30px;
    line-height: 40px;
  }
}

.btn {
  box-sizing: border-box;
  display: inline-block;
  margin-top: 40px;
  padding: 0 40px;
  height: 60px;
  line-height: 58px;
  text-align: center;
  border-radius: 30px;
  cursor: pointer;
  color: #0045ff;
  font-size: 18px;
  opacity: 0.8;
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
  }
}

.btn--contact {
  margin-right: 60px;
  border: 1px solid #0045ff;
  background: #0045ff;
  color: #fff;
}

.btn--login {
  border: 1px solid #0045ff;
  background: transparent;
}

.terms__term {
  color: #000000;
  transition: color 0.3s;
  line-height: 16px;
  /deep/ .link-box__dec {
    background: #000000;
  }

  &:hover {
    color: var(--color-base-light);
    font-weight: bold;
  }

  &.first {
    margin-right: 20px;
  }
}

.right {
  float: right;
  color: var(--color-content);
}

.box__terms {
  border-top: 1px solid #f2f2f2;
  line-height: 80px;
}

.link-a {
  text-decoration: none;
  color: #000000;
}
</style>
