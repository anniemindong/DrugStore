import React,{Component} from'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Medicine = props => (
    <tr> 
        <td className={props.medicine.outstock ? 'completed' : ''}>{props.medicine.name}</td>
        <td className={props.medicine.outstock ? 'completed' : ''}>{props.medicine.description}</td>
        <td className={props.medicine.outstock ? 'completed' : ''}>{props.medicine.prescription}</td>
        <td>
            <Link to={"/edit/"+props.medicine._id}>Edit</Link>
        </td>
    </tr>
)

export default class MedicinesList extends Component {

    constructor(props) {
        super(props);
        this.state = {medicine:[]};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/medicine/')
            .then(response => {
                this.setState({medicine: response.data});
            })
            .catch(function(error) {
                console.log(error);      
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/medcine/')
            .then(response => {
                this.setState({medicine: response.data});
            })
            .catch(function(error) {
                console.log(error);      
            })
    }

    medicineList() {
        return this.state.medicine.map(function(currentMedicine, i){
            return <Medicine medicine={currentMedicine} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Medince List</h3>
                <table className = "table table-striped" style={{marginTop : 20}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Prescription</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.medicineList() }
                    </tbody>
                </table>
            </div>
        )
    }
}