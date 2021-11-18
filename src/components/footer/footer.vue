<template>
  <v-footer app absolute height="72px" color="#333333" class="twt-footer">
    <div class="twt-copyright">
      <span style="cursor:pointer;" @click="$router.push({path:'/about'})"><strong>@</strong></span>
      {{ thisYearcopy }}
    </div>
    <!-- <img
      src="../../assets/logo.png"
      alt="twt-footer-logo"
      class="twt-footer-logo"
    /> -->
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    thisYearcopy: "2021",
  }),
};
</script>

<style lang="scss" scoped>
.twt-footer {
  padding: 0;
  margin: 0;
  font-size: 1rem;
}
.twt-copyright {
  position: absolute;
  left: 50%;
  line-height: 40px;
  //  height: 50px;
  width: 100%;
  transform: translate(-50%);
  text-align: center;
}
.twt-copyright{
  color: #666666;
  margin-bottom: 0;
}
.twt-copyright a {
  color: #666666;
  text-decoration: none;
}
.twt-footer-logo {
  position: absolute;
  top: 40px;
  left: 50%;
  /* height: 40px; */
  width: 40px;
  transform: translate(-50%);
}
</style>
