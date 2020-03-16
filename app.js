Vue.component('todo', {
    props: {
        name: String,
        todo: Object,
    },
    template:
        `<div class="view" >
        <input type="checkbox" class="toggle" v-model="todo.completed" @click="tick">
        <label @dblclick="edittodo">{{name}}</label>
        <button class="destroy" @click="triggerdelete"></button>
    </div>`,
    methods: {
        tick: function () {
            this.$emit('tick', this.todo.completed);
            // this.completed = !this.completed;
            // this.$emit('update:done', this.completed);
        },
        edittodo: function () {
            todo.edit = true;
            this.$emit('edittodo')
        },
        triggerdelete() {
            this.$emit('triggerdelete')
        },
    },
});

new Vue({
    el: "#todos",
    props: {
        done: Boolean,
        default: false
    },
    data: {
        list: [],
        newtache: '',
        editing: null,
        snackbar: false,
        message: "Entrez une tâche correcte avant de valider",
        // caracteres de l'alphabet avec les espaces. Pas de chiffres
        taskRule: /^([A-Za-z_]+ ?)*$/,
        SelectedFilter: 'all',

    },
    computed: {
        tasksToDo: function () {
            return this.list.filter(list => !list.completed).length
        },
        filteredTodos: function() {
            return filters[this.SelectedFilter](this.list);
        },
        // showAll() {
        //     return this.list;
        // },
        // showToDo() {
        //     return this.list.filter(function (el) {
        //         return el.completed === false;
        //     });
        // },
        // showDone() {
        //     return this.list.filter(function (el) {
        //         return el.completed === true;
        //     });
        // },
    },
    methods: {
        add: function () {
            var inputTask = document.getElementById('task').value;
            // n'accepte que les lettres/mots avec des espaces
            var taskResult = this.taskRule.test(inputTask);

            console.log(taskResult);

            if (taskResult === true && this.newtache !== '') {
                this.list.push({
                    name: this.newtache,
                    completed: false,
                });
                this.newtache = '';
            } else {
                this.showSnackbar();
            }
            console.log(this.list)
        },
        showSnackbar() {
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function () {
                x.className = x.className.replace("show", "");
            }, 3000);
        },
        tick: function (todo) {
            todo.completed = !todo.completed;
        },
        triggerdelete: function (index) {
            // this.$delete(this.list,index)
            this.list.splice(index, 1);
        },
        edittodo: function (todo) {
            this.editing = todo;
        },
        changeName(todo) {
            this.editing = null;
            todo.name = todo.name.trim();
        },
        clearAccomplished() {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].completed === true) {
                    this.list.splice(i, 1);
                    // décrementer de 1 car la
                    // longueur du tableau d'objet a diminué
                    // suite a la suppression d'un item
                    i--;
                }
            }
        },
        toggleTick() {
            if (this.tasksToDo === 0) {
                // if all tacks are ticked
                for (var i = 0; i < this.list.length; i++) {
                    this.list[i].completed = false;
                }
            } else {
                // put all tasks ticked
                for (var j = 0; j < this.list.length; j++) {
                    this.list[j].completed = true;
                }
            }
        },
        showAll() {
            this.SelectedFilter = 'all';
            return this.list;
        },
        showToDo() {
            this.SelectedFilter = 'toDo';
            var tasksToDo = this.list.filter(function (el) {
                return el.completed === false;
            });
            console.log(tasksToDo)
            // l'object retourné est correct
            // faire apparaitre tasksToDo a la place
            // de list mais en gardant list, sinon
            // pas de retour en arriere possible

            // je pense que la var list dans le v-for
            // doit etre une function qui render la list
            // ou la liste filtrée au click de btn

            // mettre displayItemsWithStatus a la place
            // de list pour voir mon raisonnement
            // MAIS marche pas :(
        },
        showDone() {
            this.SelectedFilter = 'Done';
            var tasksDone =  this.list.filter(function (el) {
                return el.completed === true;
            });
            console.log(tasksDone)
        },
        displayItemsWithStatus(){
            if (this.SelectedFilter === 'all'){
                return this.showAll;
            } else if (this.SelectedFilter === 'toDo'){
                return this.showToDo;
            } else {
                return this.showDone;
            }
            //marche pas :(
        }
    },
})