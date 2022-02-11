<template>
  <div>
    <Accept />
    <Footer/>
  </div>
</template>

<script>
import Accept from '@/views/QuickBuy/Accept.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Home',
  components: {
    Accept,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
</style>
