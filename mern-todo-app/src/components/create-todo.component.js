import React,{Component} from'react';
import axios from 'axios';
import { useAlert } from 'react-alert'

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name:'',
            description:'',  
            prescription:'',
            instock: false
        }
    }

    onChangeTodoDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeTodoResponsible(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            prescription:e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.description}`);
        console.log(`Todo Responsible: ${this.state.name}`);
        console.log(`Todo Priority: ${this.state.prescription}`);
        console.log(`Todo Completed: ${this.state.instock}`);

        const newTodo = {
            name:this.state.name,
            description: this.state.description,
            prescription: this.state.prescription,
            instock: this.state.instock
        }
        
        axios.post('http://localhost:4000/medicine/add', newTodo)
            .then(function (res) {
                    console.log(res.data);
                    const result = res.data;
                    if (result.success) {
                        alert("Medicine Added!");
                    } else {
                        alert("Failed!");

                    }
                    

            });

        this.setState({
            
            name:'',
            description:'',
            prescription:'',
            instock: false
        })
    }

    render() {
        return (           
            <div style={{marginTop: 20}}>
                <h3>Add New Medicine</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeTodoResponsible}
                                />
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>

                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityLow"
                                    value="Prescription Required"
                                    checked={this.state.prescription==='Prescription Required'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Prescription Required</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityMedium"
                                    value="Prescription Not Required"
                                    checked={this.state.prescription==='Prescription Not Required'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Prescription Not Required</label>
                        </div>
                        
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Medicine" className="btn btn-primary" />
                    </div>
                </form>
            </div>
            
        )
    }
}