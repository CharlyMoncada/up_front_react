import React, { Component } from 'react';
import axios from "axios";
import 'antd/dist/antd.css';
import { Input, Button, Form, Drawer, InputNumber }  from 'antd';

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
  };
  const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
  };

class EditContact extends Component{
    constructor() {
        super();
        this.getById = this.getById.bind(this);
        this.edit = this.edit.bind(this);
    }

    state = {
        contact: '',
        visible: false,
        id: ""
       }
  
    handleChange=event=>{
        console.log(event.target.value)
        this.setState({[event.target.name]: event.target.value})
    }

    handleChangeId=event=>{
        console.log(event.target.value)
        this.setState({id: event.target.value});
        this.setState({[event.target.name]: event.target.value})
    }

    handleChangeAge=event=>{
        console.log(event)
        this.setState({"age": event})
    }

    getById(event) {
        this.props.form.validateFields( ['id'], err => {
            if (!err) { 
                const id = this.state.id
                const url = `http://localhost:3000/contact/${id}`;
                axios.get(url)
                .then((response) => {
                    this.setState({
                        contact: response.data,
                        visible: true
                    });
                })
                .catch((error)=>{
                    console.log(error);
                 });
            }
        });
    }

    edit(event) {
        this.props.form.validateFields(err => {
            if (!err) { 
                axios.put('http://localhost:3000/contact', {...this.state})
        .then((response) => {
            console.log(response);
            this.setState({
                visible: false
              });
            window.location='/'
            })
            .catch((error)=>{
                console.log(error);
            });
            }
        });
    }

    onClose = () => {
        this.setState({
          visible: false,
        });
      };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form.Item {...formItemLayout} label="Edit by Id">
                    {getFieldDecorator('id', {
                        rules: [
                        {
                            required: true,
                            message: 'Please input id',
                        }],
                    })(<Input placeholder="Please input id" onChange={this.handleChangeId} name='id'/>)}
                </Form.Item>

                <Form.Item {...formTailLayout}>
                    <Button type="primary" onClick={this.getById}>Edit</Button>
                </Form.Item>

                <Drawer
                    title="Edit contact"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                  <Form layout="vertical" hideRequiredMark>
                    <Form.Item label="Id">
                        <Input placeholder={this.state.contact.id} disabled defaultValue={this.state.contact.id} onChange={this.handleChange} name='id'/>
                    </Form.Item> 

                    <Form.Item label="Name">
                        <Input placeholder="Please input name" defaultValue={this.state.contact.name} onChange={this.handleChange} name='name'/>
                    </Form.Item>

                    <Form.Item label="Age">
                        <InputNumber defaultValue={this.state.contact.age} min={1} max={120} onChange={this.handleChangeAge} name='age'/>
                    </Form.Item>

                    <Form.Item label="Address">
                        <Input placeholder="Please input address" defaultValue={this.state.contact.address} onChange={this.handleChange} name='address'/>
                    </Form.Item>

                    <Form.Item label="Notes">
                        <Input placeholder="Please input notes" defaultValue={this.state.contact.notes} onChange={this.handleChange} name='notes'/>
                    </Form.Item>
                  </Form>
                    <div
                        style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                        Cancel
                        </Button>
                        <Button onClick={this.edit} type="primary">
                        Submit
                        </Button>
                    </div>
                </Drawer>
            </div>
        );
    }
}

const EditContactDinamic = Form.create({ name: 'edit_contact' })(EditContact);
export default EditContactDinamic