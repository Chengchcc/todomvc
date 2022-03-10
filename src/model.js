export default class Model {
    constructor() {
        this.todos = []
    }

    addTodo(todo) {
        this.todos.push(todo)
        this._commit(this.todos)
  }

    editTodo(id, text) {
        console.log(id, text)
        const todo = this.todos.find(todo => todo.id == id)
        todo.text = text
        this._commit(this.todos)
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id)
        this._commit(this.todos)
   }

    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id == id)
        todo.complete = !todo.complete
        this._commit(this.todos)
     }

    _commit(todos) {
        this.onTodoListChanged(todos)
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    bindTodoListChanged(callback) {
        this.onTodoListChanged = callback
    }
}