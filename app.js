Vue.component('todo',{
    props: {
        name: String,
        done:Boolean, default: false
    },
    data: function () {
        return {isDone: this.done}
    },
    template:
    `<div class="view" >
   
    <input type="checkbox" class="toggle" v-model="done" @click="tib">
    <label @dblclick="chang">{{name}}</label>
    <button class="destroy" @click="del"></button>
   

    </div>`, 
    methods: {
       tib: function () {
        this.isDone = !this.isDone
        this.$emit('update:done', this.isDone)
        },
        chang: function () {
            
            this.$emit('edittodo')
        },
        del: function () {
            this.$emit('del')
        }, 
    },
});

new Vue({
    el:"#todos", 
    props:{done:Boolean, default:false},
    data: {
        list: [],
        newtache: '', 
        completed:false, 
        edit: false, 
        editing: null
    },
    computed:{
        doing: function () {
            this.list.filter(list => !list.completed).lenght
        },
    }, 
    methods: {
        add: function () {
            this.list.push({
                name: this.newtache,
            })
            this.newtache = ''
        },
        tib: function (){
            this.done = !this.done
        },
        del: function (index) {
            this.$delete(this.list,index)
        },
        edittodo: function (todo){
            this.editing = todo
        }
    },
})