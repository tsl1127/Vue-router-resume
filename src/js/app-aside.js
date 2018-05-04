Vue.component('app-aside',{
    props:['logoutvisible'],
    template:`
    <aside > 
    <div class="upper">
        <ul class="actions">
            <li>
                    <button class="button" @click="$emit('save')">保存</button>                       
            </li>
            <li>
                    <button class="button" @click="$emit('share')">分享</button>                       
            </li>
            <li>
                    <button class="button" @click="$emit('print')">打印</button>                        
            </li>
            <li>
                    <button class="button" @click="$emit('changetheme')">换肤</button>                       
            </li>
            <!-- <li>
                    <button class="button" @click="$emit('changemode')">退出预览</button>                       
            </li> -->
        </ul>
    </div> 
    <div class="down">
            <button class="button" @click="$emit('logout')" v-show="logoutvisible">登出</button>                
    </div>
</aside>
    `
})