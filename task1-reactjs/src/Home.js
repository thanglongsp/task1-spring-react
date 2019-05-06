import React, {Component} from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});
        axios.get('api/getall')
            .then(response => {
                this.setState({items: response.data});
            });
    }

    async insert() {
        var body = new FormData();
        body.set("name", document.getElementById('aName').value);
        body.set("date", document.getElementById('aDate').value);
        axios.post('/api/insert', body)
            .then(res => {
                document.getElementById('aName').value = "";
                document.getElementById('aDate').value = "";
            }).catch(console.error)
    }

    async delete() {
        var body = new FormData();
        body.set("name", document.getElementById('dName').value);
        body.set("id", document.getElementById('dId').value);
        axios.post('/api/delete', body)
            .then(res => {
                document.getElementById('dId').value = "";
                document.getElementById('dName').value = "";
            }).catch(console.error)
    }

    async update() {
        var body = new FormData();
        body.set("id", document.getElementById('uId').value);
        body.set("name", document.getElementById('uName').value);
        body.set("created_at", document.getElementById('uDate').value);
        axios.post('/api/update', body)
            .then(res => {
                document.getElementById('uId').value = "";
                document.getElementById('uName').value = "";
                document.getElementById('uDate').value = "";
            }).catch(console.error)
    }

    push(index) {
        document.getElementById('uId').value =
            document.getElementById('dId').value =
                document.getElementById('id' + index).innerHTML;

        document.getElementById('uName').value =
            document.getElementById('dName').value =
                document.getElementById('name' + index).innerHTML;

        document.getElementById('uDate').value =
            document.getElementById('date' + index).innerHTML;
    }

    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="row">
                        <div className="col-5">
                            <FormGroup>
                                <Label for="aName">Name</Label>
                                <Input type="text" name="aName" id="aName" autoComplete="aName"/>
                                <Label for="aDate">Created at</Label>
                                <Input type="date" name="aDate" id="aDate" autoComplete="aDate"/>
                                <Button onClick={this.insert} color="success">Add</Button>
                            </FormGroup>

                            <FormGroup>
                                <Label for="dId">Id</Label>
                                <Input type="text" name="dId" id="dId" autoComplete="dId"/>
                                <Label for="dName">Name</Label>
                                <Input type="text" name="dName" id="dName" autoComplete="dName"/>
                                <Button onClick={this.delete} color="danger">Delete</Button>
                            </FormGroup>

                            <FormGroup>
                                <Label for="uId">Id</Label>
                                <Input type="text" name="uId" id="uId" autoComplete="uId"/>
                                <Label for="uName">Name</Label>
                                <Input type="text" name="uName" id="uName" autoComplete="uName"/>
                                <Label for="uDate">Created at</Label>
                                <Input type="date" name="uDate" id="uDate" autoComplete="uDate"/>
                                <Button onClick={this.update} color="warning">Update</Button>
                            </FormGroup>
                        </div>
                        <div className="col-7">
                            <h3>Table list</h3>
                            <table className="table table-bordered table-hover" width="100%">
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>Created at</th>

                                </tr>
                                {this.state.items.map(article => (
                                    <tr onClick={this.push.bind(this, article.id)}>
                                        <td id={"id" + article.id}>{article.id}</td>
                                        <td id={"name" + article.id}>{article.name}</td>
                                        <td id={"date" + article.id}>{article.created_at}</td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Home;