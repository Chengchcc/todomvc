export default class View {

    constructor(){

        this.app = View.getElement('#app');

        // title
        this.title = View.createElement('h1')
        this.title.textContent = 'Todo List';

        // form
        this.form = View.createElement('form');

        // input
        this.input = View.createElement('input');
        this.input.type = 'text';
        this.input.placeholder = 'Add todo...';

        // button
        this.button = View.createElement('button');
        this.button.textContent = 'Add';

        // list
        this.list = View.createElement('ul');

        // append
        this.form.append(this.input, this.button);

        this.app.append(this.title, this.form, this.list);

        this._initLocalListeners()
    }

    get inputValue(){
        return this.input.value;
    }

    resetInput(){
        this.input.value = '';
    }

    displayTodos(todos){
        this.list.innerHTML = '';
        if(todos.length === 0){
            this.list.textContent = 'No todos for today!';
            return;
        }else {
            todos.forEach(todo => {
                const li = View.createElement('li');
                li.id = todo.id;

                const checkbox = View.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.complete;

                const span = View.createElement('span', 'editable');
                span.contentEditable = true;
                span.textContent = todo.text;

                if(todo.complete){
                    li.classList.add('complete');
                }else {
                    li.classList.remove('complete');
                }

                const removeButton = View.createElement('button', 'delete');
                removeButton.textContent = 'x';

                li.append(checkbox, span, removeButton);
                this.list.append(li);
            });
        }
    }

    _initLocalListeners() {
        this.list.addEventListener('input', event => {
            if (event.target.className === 'editable') {
                this._temporaryTodoText = event.target.innerText
            }
        })
    }

    bindEvents(){
        this.view.form.addEventListener('submit', this.onAddTodo.bind(this));
        this.view.list.addEventListener('click', this.onDeleteTodo.bind(this));
        this.view.list.addEventListener('change', this.onToggleTodo.bind(this));
        this.view.list.addEventListener('focusout', this.onEditTodo.bind(this));
    }

    static createElement(tag, className){
        const el = document.createElement(tag);
        if(className) el.className = className;
        return el;
    }

    static getElement(selector){
        return document.querySelector(selector);
    }
}