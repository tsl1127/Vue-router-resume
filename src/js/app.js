const routes = [
    { path: '/', component: window.appedit },
    { path: '/login', component: window.Login},
    { path: '/signUp', component: window.SignUp},
  ]
  
  // 3. 创建 router 实例，然后传 `routes` 配置
  // 你还可以传别的配置参数, 不过先这么简单着吧。
  const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
  })
  
  // 4. 创建和挂载根实例。
  // 记得要通过 router 配置参数注入路由，
  // 从而让整个应用都有路由功能
//   const apps = new Vue({
//     router
//   }).$mount('#app')


let app=new Vue(
    {
        el:'#app',
        router,
        data:{
            editingName:false,
            loginVisible:false,
            signUpVisible:false,
            shareVisible:false,
            skinPickerVisible:false,
            // logoutvisible:false,
            previewUser:{
                objectId:undefined
            },
            previewResume:{   //预览用户
                
               
            },
            currentUser:{
                objectId:'',
                email:''
            },
            resume:{   //当前用户
                name:'姓名',
                gender:'男',
                birthday:'1990年12月',
                jobTitle:'前端工程师',
                phone:'138xxxx4080',
                email:'taosiliang1127tsl@163.com',
                skills: [
                    {
                        name: '请填写技能名称（如CSS）',
                        description: '请填写技能描述'
                    },
                    {
                        name: '请填写技能名称（如HTML）',
                        description: '请填写技能描述'
                    },
                    {
                        name: '请填写技能名称（如JavaScript）',
                        description: '请填写技能描述'
                    },
                    {
                        name: '请填写技能名称（如Vue）',
                        description: '请填写技能描述'
                    }
                ],
                projects:[
                    {
                        name:'请填写项目名称',
                        link:'http://xxx',
                        keywords:'请填写关键词',
                        description:'请详细描述项目'
                    },
                    {
                        name:'请填写项目名称',
                        link:'http://yyy',
                        keywords:'请填写关键词',
                        description:'请详细描述项目'
                    },
                    {
                        name:'请填写项目名称',
                        link:'http://zzz',
                        keywords:'请填写关键词',
                        description:'请详细描述项目'
                    }
                ]
            },
            shareLink:'',
            mode:'edit',  //'preview'
            // mainClass:'default'
        },
        computed:{
            displayResume(){
               return  this.mode==='preview' ? this.previewResume : this.resume
            },
            // hasLogin(){
            //      if(this.currentUser.objectId){
            //          return logoutvisible=ture
            //      }else{
            //          return logoutvisible=false
            //      }
            // }           
        },
        watch:{
            'currentUser.objectId':function (newValue,oldValue){
                // console.log(newValue)
                if(newValue){
                    // console.log('newValue')
                    // console.log(newValue)
                    // console.log(this.currentUser)
                    this.getResume(this.currentUser)
                    this.shareLink=location.origin+location.pathname+'?user_id='+this.currentUser.objectId

                }
            }
        },
        methods:{
            onEdit(key,value){
                // console.log(key+value)
                let regex=/\[(\d+)\]/g
                key=key.replace(regex,(match,number)=>{  //把[]变成.分割
                    return `.${number}`
                })
                keys=key.split('.')
                // console.log(keys) keys=['skills','0','name']

                let result=this.resume
                // console.log(result)
                for(let i=0;i<keys.length;i++){
                    if(i===keys.length-1){
                        result[keys[i]]=value   //画内存图
                    }else{
                        result=result[keys[i]]                    
                    }
                    //result=this.resume['skills']['0']['name']
                }

                //对于编辑技能那一项来说，skills[0].name是个字符串，用正则把[]变成.
                // result=value
            },




            getResume(user){
                let query=new AV.Query('User')
                return query.get(user.objectId).then((user)=>{
                    // console.log('user')
                    // console.log(user)
                    // console.log(user.toJSON().resume)
                    let resume=user.toJSON().resume
                    // this.resume=resume  //数据库里的resume读到了本地 //没有skills
                    Object.assign(this.resume,resume) //右边有什么属性，就加到左边来，不覆盖左边的属性
                    return resume
                },(error)=>{

                })
            },
            addSkill(){
                this.resume.skills.push({'name':'请填写技能名称','description':'请填写技能描述'})
            },
            removeSkill(index){
                this.resume.skills.splice(index,1)
            },
            addProject(){
                this.resume.projects.push({
                    name:'请填写项目名称',
                    link:'http://...',
                    keywords:'请填写关键词',
                    description:'请详细描述'
                })
            },
            removeProject(index){
                this.resume.projects.splice(index,1)
            },


            faonLogin(user){
                this.currentUser.objectId=user.objectId
                this.currentUser.email=user.email
                // this.getResume(this.currentUser)                                
                // this.loginVisible=false
            },
            faonsignup(user){
                this.currentUser.objectId=user.objectId
                this.currentUser.email=user.email
                this.signUpVisible=false
                // console.log('注册接收数据')
                // addResume(user)
                // console.log(this.currentUser)
                let {objectId}=AV.User.current().toJSON()               
                let userxxx= AV.Object.createWithoutData('User',objectId)
                userxxx.set('resume',this.resume)
                userxxx.save().then(()=>{
                    // console.log('ddd')
                },()=>{
                   
                })
            },


            // gotosignup(){
            //     this.signUpVisible=true
            //     this.loginVisible=false
            // },
            // gotologin(){
            //     this.signUpVisible=false
            //     this.loginVisible=true
            // },
            exitPreview(){
                this.mode='edit'
                // this.$router.push(location.origin+location.pathname) 
                // this.$router.push({ name: 'user', params: { userId: 123 }})
                // this.$router.push({ path: 'register', query: { plan: 'private' }})

                // window.location.reload()
            },
            onClickSave(){
                let currentUser=AV.User.current()
                // console.log(currentUser)
                if(!currentUser){
                    //  this.loginVisible=true      
                    this.$router.push('/login')      
                }else{
                    this.saveResume()
                }
            },
            onShare(){
                if(this.currentUser.objectId){
                    this.shareVisible=!this.shareVisible  //传出
                }else{
                    alert('请先登录')
                }
            },
            print(){
                window.print()
            },
            changeTheme(){
                this.skinPickerVisible=!this.skinPickerVisible  //传出
            },
            changeMode(){
                this.mode='edit'  //传出
            },
            onLogout(){
                AV.User.logOut()
                alert('登出成功')
                window.location.reload()
            },
            hasLogin(){
                return  !!this.currentUser.objectId
            },
            saveResume(){
                let {objectId}=AV.User.current().toJSON()
                
                let user= AV.Object.createWithoutData('User',objectId)
                user.set('resume',this.resume)
                user.save().then(()=>{
                    alert('保存成功')
                },()=>{
                    alert('保存失败')
                })
    
            },

        }
    }

)
//获取当前用户
let currentUser = AV.User.current()
// console.log(currentUser)
if(currentUser){
    app.currentUser=currentUser.toJSON()
    // console.log('app.currentUser')
    // console.log(app.currentUser)

    app.shareLink=location.origin+location.pathname+'?user_id='+app.currentUser.objectId
    // console.log('currentId:'+app.currentUser.objectId)
    // app.mode="edit"
    app.getResume(app.currentUser).then((resume)=>{
        app.resume=resume
    })
}



//如果链接里有id，就根据id号查找数据库的数据然后显示
//获取预览用户的id
let search=location.search
// console.log(search)
let regex=/user_id=([^&]+)/
let matchs=search.match(regex)
// console.log(matchs)
let userId
if(matchs){
    userId=matchs[1]
    // console.log('preview id:'+userId)
    app.mode='preview'
    app.getResume({objectId:userId}).then((resume)=>{
        app.previewResume=resume
    })
}





