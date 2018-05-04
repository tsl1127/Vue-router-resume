Vue.component('share',{
    props:['shareLink'],
    template:`
    <div  class="share" v-cloak>
    <h3>
        请将下面链接分享给面试官
    </h3>
    <div>
            <textarea readonly>{{shareLink}} </textarea>
            
    </div>
</div>
    `
})