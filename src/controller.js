export default class Controller {

    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.onTodoChange(this.model.todos);
        this.view.bindEvents.apply(this);
        this.model.bindTodoListChanged(this.onTodoChange.bind(this));
    }

    onTodoChange(todos) {
        console.log(todos)
        this.view.displayTodos(todos);
    }

    onAddTodo(e) {
        e.preventDefault();
        if(this.view.inputValue){
            const todo = {
                id: Date.now(),
                text: this.view.inputValue,
                complete: false
            }
            this.model.addTodo(todo);
            this.view.resetInput();
        }
    }

    onDeleteTodo(evt) {
        if(evt.target.className == 'delete'){
            const id = evt.target.parentElement.id;
            this.model.deleteTodo(id);
        }
    }

    onEditTodo(evt) {
        if(this.view._temporaryTodoText){
            const id = evt.target.parentElement.id;
            this.model.editTodo(id, this.view._temporaryTodoText);
            this.view._temporaryTodoText = '';
        }
    }

    onToggleTodo(evt) {
        const id = evt.target.parentElement.id;
        this.model.toggleTodo(id);
    }



}