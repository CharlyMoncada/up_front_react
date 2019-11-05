import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, Form, InputNumber }  from 'antd';
import axios from "axios";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

class CrearContacto extends Component{
    constructor() {
        super();
        this.add = this.add.bind(this);
    }

    state = {
      values: []
     }

    add(event) {
      this.props.form.validateFields(err => {
        if (!err) {
          const { name, age, address, birthCountry, notes } = this.state;
          axios.post('http://localhost:3000/contact', { name, age, address, birthCountry, notes })
          .then(function(response)
          {
              console.log(response);
              window.location='/'
          })
          .catch(function(error){
              console.log(error);
          });
        }
      });
  }

    handleChange=event=>{
        console.log(event.target.value)
        this.setState({[event.target.name]: event.target.value})
    }

  handleChangeAge=event=>{
    console.log(event)
    this.setState({"age": event})
}

   async componentDidMount() {
    const itemToadd = this.state.postsInput
    const {data} = await axios.get('https://restcountries.eu/rest/v2/all', itemToadd);
    this.setState({ 
      values: data
    });
  }

    render() {
      const { getFieldDecorator } = this.props.form;

        return (
            <div>
               <Form.Item {...formItemLayout} label="Name">
                {getFieldDecorator('name', {
                  rules: [
                  {
                    required: true,
                    message: 'Please input name',
                  },
                ],
                })(<Input placeholder="Please input name" onChange={this.handleChange} name='name' />)}
              </Form.Item>

              <Form.Item {...formItemLayout} label="Age">
                {getFieldDecorator('age', {
                  rules: [
                  {
                    required: true,
                    message: 'Please input age',
                  },
                ],
              })(<InputNumber min={1} max={120} onChange={this.handleChangeAge} name='age'/>)}
              </Form.Item>

              <Form.Item {...formItemLayout} label="Address">
                {getFieldDecorator('address', {
                  rules: [
                  {
                    required: true,
                    message: 'Please input address',
                  },
                ],
                })(<Input placeholder="Please input address" onChange={this.handleChange} name='address'/>)}
              </Form.Item>

              <Form.Item {...formItemLayout} label="Bourn Country">
                {getFieldDecorator('birthCountry', {
                  initialValue: 'Argentina',
                  rules: [
                  {
                    required: true,
                    message: 'Please input bourn country',
                  },
                ],
                })( <select onChange={this.handleChange} name='birthCountry'>{
                  this.state.values.map((obj) => {
                  return <option value={obj.id}>{obj.name}</option>
                  })
                }</select>)}
              </Form.Item>

              <Form.Item {...formItemLayout} label="Notes">
                <Input 
                  placeholder="Notes" 
                  onChange={this.handleChange} 
                  name='notes'
                />
              </Form.Item>

              <Form.Item {...formTailLayout}>
                <Button type="primary" onClick={this.add}>Save</Button>
              </Form.Item>

            </div>
        );
    }
}

const CrearContactoDinamic = Form.create({ name: 'crear_contacto' })(CrearContacto);
export default CrearContactoDinamic