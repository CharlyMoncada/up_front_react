import { Table } from 'antd';
import React, { Component } from 'react';
import axios from "axios";
import 'antd/dist/antd.css';

const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Country of Birth',
      dataIndex: 'birthCountry',
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
    }
  ];

class TableAgenda extends Component{

  state = {
    postsInput: '',
    postsItems: []
  }

    async componentDidMount() {
        const itemToadd = this.state.postsInput
        const {data} = await axios.get('http://localhost:3000/contacts', itemToadd);
        const currentState = this.state.postsItems
        this.setState({ 
          postsItems: currentState.concat(data.data),
          postsInput: ''
        });
      }

      render() {
        return (
          <div>
             <br></br>
                <Table columns={columns} dataSource={this.state.postsItems} size="middle" />
             <br></br>
          </div>
            );
        }
  }

export default TableAgenda;