import { Table } from 'antd';
import React, { Component } from 'react';
import axios from "axios";
import 'antd/dist/antd.css';
import { BASEURL } from './Constants';
import { COLUMNS } from './Constants';

class TableAgenda extends Component{

  state = {
    postsInput: '',
    postsItems: []
  }

    async componentDidMount() {
        const itemToadd = this.state.postsInput
        const {data} = await axios.get(`${BASEURL}/contacts`, itemToadd);
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
                <Table columns={COLUMNS} dataSource={this.state.postsItems} size="middle" />
             <br></br>
          </div>
            );
        }
  }

export default TableAgenda;