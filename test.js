import React, { Component } from "react";
import axios from "axios";

export class TodoListClassComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nextTodoId: 0,
            newTodoLabel: ""
        };
    }

    componentDidMount() {
        axios
            .get(
                "https://gist.githubusercontent.com/witalewski/fc8f043d53a0d505f84c5ddb04ae76ea/raw/7c505bbc1675a0bc8a067f8b633b531c769bb64c/data.json"
            )
            .then(({ data }) => {
                this.setState({ todos: data });
                this.setState({ nextTodoId: data.length });
            });
    }

    markTodoAsDone = (id, done) =>
        this.setState({
            todos: this.state.todos.map(todo =>
                todo.id === id ? { ...todo, done } : todo
            )
        });

    removeTodo = id =>
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        });

    addNewTodo = () =>
        this.setState({
            todos: [
                ...this.state.todos,
                {
                    id: this.state.nextTodoId,
                    label: this.state.newTodoLabel,
                    done: false
                }
            ],
            nextTodoId: this.state.nextTodoId + 1,
            newTodoLabel: ""
        });

    render() {
        const { todos, newTodoLabel } = this.state;
        return todos ? (
            <div className="todo-list">
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id}>
                            <input
                                type="checkbox"
                                checked={todo.done}
                                onChange={({ target }) =>
                                    this.markTodoAsDone(todo.id, target.checked)
                                }
                                label={todo.label}
                            />
                            <span className={todo.done ? "done" : ""}>{todo.label}</span>
                            <button onClick={() => this.removeTodo(todo.id)}>X</button>
                        </li>
                    ))}
                </ul>
                <div className="new-todo">
                    <input
                        type="text"
                        value={newTodoLabel}
                        onChange={({ target }) =>
                            this.setState({ newTodoLabel: target.value })
                        }
                    />
                    <button onClick={this.addNewTodo}>Add</button>
                </div>
            </div>
        ) : (
                <div>Loading...</div>
            );
    }
}
