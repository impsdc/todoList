Vue.component('todo',{
    props: {
        name: String,
        todo:Object,
        done:Boolean, default: false, 
        edit:Boolean, default: false, 

        value: []
    },
    data: function () {
        return {isDone: this.done, valueLocal:this.value,}
    },
    template:
    `<div class="view">
   
    <div v-if="edit.todo">
        <input type="checkbox" class="toggle" v-model="done" @click="tib">
        
        <label @dblclick="edit.todo="true">{{name}}</label>
        
        <button class="destroy" @click="del"></button>
    </div>

  <div v-else>
        <input type="text" class="edit" v-model="todo.name"
        @keyup.enter="edit.todo="false">
  </div>
   
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
    directives: {
        focus: {
          inserted (el) {
            el.focus()
          }
        }
      }
})