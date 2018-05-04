window.SignUp={
    data(){
        return {
            signUp:{
                email:'',
                password:''
            },
        }        
    },
    template:`
    <div class="signUp"  v-cloak>
    <form class="form" @submit.prevent="onSignUp">
            <h2>注册</h2>

            <router-link to="/">关闭</router-link>               
            <div class="row">
                <label >邮箱</label>
                <input type="text" v-model="signUp.email">
            </div>
            <div class="row">
                    <label >密码</label>
                    <input type="password" v-model="signUp.password">
            </div>
            <div class="actions">
                <button type="submit">提交</button>

                <router-link to="/login">登录</router-link>
            </div>
    </form>
</div>
    `,
    methods:{
        onSignUp(){
            // console.log(this.signUp)
            const user = new AV.User()
            user.setUsername(this.signUp.email)
            user.setPassword(this.signUp.password)
            user.setEmail(this.signUp.email)
            user.signUp().then((user)=>{
                alert('注册成功')
                user=user.toJSON()
                // console.log(user)
                // this.currentUser.objectId=user.objectId
                // this.currentUser.email=user.email
                // this.signUpVisible=false
                this.$emit('signup',user)
                this.$router.push('/')
                // console.log('注册发布数据')
            },(error)=>{
                alert(error.rawMessage)
            })

        },
        // onClickLogin(){
        //     this.$emit('gotologin')
        // }
    }
}

Vue.component('signUp',window.SignUp)