Vue.component('skinPicker',{
    template:`
    <div  class="skinPicker">
    <button @click="setTheme('default')">默认</button>
    <button @click="setTheme('dark')">淡蓝</button>
    </div>
    `,
    methods:{
        setTheme(name){
            document.body.className=name
        }
    }
})