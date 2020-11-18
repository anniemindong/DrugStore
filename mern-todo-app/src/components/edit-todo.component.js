import React,{Component} from'react';
import axios from 'axios';

export default class EditTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            description:'',
            name:'',
            prescription:'',
            instock: false
        }
    }

    componentDidMount(){
        axios.get('http://localhost:4000/medicine/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    description: response.data.description,
                    name: response.data.name,
                    prescription: response.data.prescription,
                    instock: response.data.instock
                })
            })
            .catch(function(error){
                console.log(error)
            })
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
            prescription: e.target.value
        });
    }
    onChangeTodoCompleted(e) {
        this.setState({
            instock: !this.state.instock
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            description: this.state.description,
            name: this.state.name,
            prescription: this.state.prescription,
            instock: this.state.instock
        };
        axios.post('http://localhost:4000/medicine/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3>Update medicine</h3>
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
                        
                        <div className="form-check">
                            <input type="checkbox"
                                    className="form-check-input"
                                    id="completedCheckbox"
                                    name="completedCheckbox"
                                    onChange={this.onChangeTodoCompleted}
                                    checked={this.state.instock}
                                    value={this.state.instock}
                                    />
                            <label className="form-check-label" htmlFor="completedCheckbox">
                                Out Stock
                            </label>
                        </div>
                        <br/>
                        <div className="form-group">
                            <input type="submit" value="Update Medicine" className="btn btn-primary"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}