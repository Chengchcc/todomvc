import './style.css'
import View from './view'
import Model from './model'
import Controller from './controller'

class MVC {
    constructor() {
        this.view = new View()
        this.model = new Model()
        this.controller = new Controller(this.view, this.model)
    }
}

new MVC()