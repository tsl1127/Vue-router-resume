window.Login={
    data(){
        return {
            login:{
                email:'',
                password:''
                }
            }
    },
  template:`
  <div class="login" v-cloak>
  <form class="form" @submit.prevent="onLogin">
          <h2>登录</h2>

          <router-link to="/">关闭</router-link>               
          <div class="row">
              <label >邮箱</label>
              <input type="text" v-model="login.email">
          </div>
          <div class="row">
                  <label >密码</label>
                  <input type="password" v-model="login.password">
          </div>
          <div class="actions">
              <button type="submit">提交</button>

              <router-link to="/signUp">注册</router-link>
          </div>
  </form>      
</div>
  `,
  methods:{
    onLogin(){
        // console.log(this.login)
        AV.User.logIn(this.login.email,this.login.password).then((user)=>{
            
            user=user.toJSON()
            // console.log(user)
            // this.currentUser={
            //     objectId:user.objectId,
            //     email:user.email
            // }
            // this.loginVisible=false
            this.$emit('login',user)
            this.$router.push('/')
        },(error)=>{
            if(error.code===211){
                alert('邮箱不存在')
            }else if(error.code===210){
                alert('邮箱和密码不一样')
            }
        })
    },
    // onClickSignUp(){
    //     this.$emit('gotosignup')
    // }
  }
  
}


Vue.component('login',window.Login)