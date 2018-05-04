Vue.component('editable-span',{
    props:['value','disabled'],   
    template:`
    <span class="editableSpan">
        <span  v-show="!editing">
         {{value}}
        </span>
        <input type="text" v-bind:value="value" v-show="editing" @input="triggerEdit">
        <button v-if="!disabled" v-on:click="editing=!editing">edit</button>  
    </span>
    `,
    data(){
        return {
            editing:false
        }
    },
    methods:{
        triggerEdit(e){
          this.$emit('edit',e.target.value)  //发布数据
        }
    }
})

//预览模式不允许编辑