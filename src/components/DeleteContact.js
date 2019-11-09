import React, { Component } from 'react';
import axios from "axios";
import 'antd/dist/antd.css';
import { Input, Button, Form }  from 'antd';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { BASEURL } from './Constants';

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
  };
  const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
  };
  
class BorrarContacto extends Component{
    constructor() {
        super();
        this.deleteById = this.deleteById.bind(this);
    }

    state = {
        value: "",
        open: false,
       }

    handleOpen = () => {
        this.setState({open: true});
      };
    
    handleClose = () => {
        this.setState({open: false});
      };

    handleConfirm = () => {
        this.setState({open: false});
        const url = `${BASEURL}/deleteAllContact/`;
                axios.delete(url)
                .then(function(response)
                {
                    console.log(response);
                    window.location='/'
                })
                .catch(function(error){
                    console.log(error);
                });
      };

      handleChange=event=>{
        console.log(event.target.value)
        this.setState({
            value: event.target.value
        });
    }


    deleteById(event) {
        this.props.form.validateFields(err => {
            if (!err) { 
                const id = this.state.value
                const url = `${BASEURL}/contact/${id}`;
                axios.delete(url)
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

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form.Item {...formItemLayout} label="Delete by Id">
                    {getFieldDecorator('id', {
                        rules: [
                        {
                            required: true,
                            message: 'Please input id',
                        },
                         ],
                    })(<Input placeholder="Please input id" onChange={this.handleChange} name='id'/>)}
                </Form.Item>

                <Form.Item {...formTailLayout}>
                    <Button type="primary" onClick={this.deleteById}>Delete</Button>
                    <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}></span>
                    
                    <Button type="primary" onClick={this.handleOpen}>Delete All</Button>
                    
                    <Dialog
                         open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        onRequestClose={this.handleClose}
                    >
                        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Do you want delete all contacts?
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleConfirm} color="primary" autoFocus>
                                Confirm
                            </Button>
                            </DialogActions>
                        </Dialog>
                </Form.Item>
            </div>
        );
    }
}

const BorrarContactoDinamic = Form.create({ name: 'borrar_contacto' })(BorrarContacto);
export default BorrarContactoDinamic