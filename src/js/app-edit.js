window.appedit={
        props:['mode','displayResume','resume','logoutvisible','shareVisible','shareLink','skinPickerVisible'],
        
        template:`
        <div class="appedit">
        <app-aside v-show="mode==='edit'" @save="onClickSave" @share="onShare" @print="onPrint" @changetheme="changeTheme" @changemode="changeMode" @logout="onLogout" :logoutvisible="logoutvisible"></app-aside>
        
                   <resume :mode="mode" :display-resume="displayResume" :resume="resume"></resume>

                   <share v-show="shareVisible" :share-link="shareLink"></share>  
                   <skin-picker v-show="skinPickerVisible"></skin-picker>
                   <button @click="exitPreview" class="exitPreview" v-if="mode==='preview'">退出预览</button>
        </div>
        `,
        methods:{
            onClickSave(){
                this.$emit('onclicksave')
            },
            onShare(){
                this.$emit('onshare')
            },
            onPrint(){
                this.$emit('onprint')
            },
            changeTheme(){
                this.$emit('changetheme')
            },
            changeMode(){
                this.$emit('changemode')
            },
            onLogout(){
                this.$emit('onlogout')
            },
            exitPreview(){
                this.$emit('exitpreview')
            }
        }
}


Vue.component('appedit',appedit)

