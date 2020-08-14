<template>
  <div>
    <h3>这是git</h3>
  </div>
</template>
<script>

export default {
  data() {
    return {
       code:''
    };
  },
  mounted() {
    var code=this.$route.query.code
    this.code=code
    this.gitOauth();
  },
  methods: {
    gitOauth: function() {
      
      this.$axios({
        methods: "get",
        url: "/login/git_oauth",
        data: {
            code:this.code
        }
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style></style>
