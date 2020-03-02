Vue.component('todo',{
    props: {
        name: String,
   
    },
    data: function () {
        return { done: false, completed:false, edit:false }
    },
    template:
    `<li class="view" :class="{'completed': done, 'editing' : edit}">

    <input type="checkbox" class="toggle" v-model="done" @click="tib">
    <label @dblclick="chang">{{name}}</label>
    <button class="destroy" @click="del"></button>

    </li>`, 
    methods: {
       tib: function (e) {
        this.done = !this.done
        this.completed = true
        console.log(this.done)
        }, 
        del: function () {
            this.$emit('del')
        }, 
        chang: function () {
            console.log('lol')
             this.$emit('edit')
            this.edit = true
        }
    },
});

new Vue({
    el:"#todos", 
    data: {
        list: [],
        newtache: '', 
        completed:false
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
        del: function (index) {
            this.$delete(this.list,index)
        }
    },
})