import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Tabs } from 'antd';

import CrearContactoDinamic from './components/AddContact';
import BorrarContactoDinamic from './components/DeleteContact';
import TableAgenda from './components/TableAgenda';
import CarouselImage from './components/CarouselImage';
import EditContactDinamic from './components/EditContact';

import { BrowserRouter, Route, Link } from 'react-router-dom';
const { TabPane } = Tabs;
const { Footer, Content } = Layout;

function callback(key) {
  console.log(key);
}

class App extends Component {

  render(){
    return (
      <div className="App">
        <CarouselImage/>
      <Layout>
        <Content> 
            <BrowserRouter>
                <Tabs onChange={callback} type="card">
                  <TabPane tab={ <Link to='/'>Home</Link>} key="1"> </TabPane>
                  <TabPane tab={ <Link to='/addContacto'>Add Contact</Link>} key="2"></TabPane>
                  <TabPane tab={ <Link to='/editContact'>Edit Contact</Link>} key="3"></TabPane>
                  <TabPane tab={ <Link to='/deleteContact'>Delete Contact</Link>} key="4"> </TabPane>
                </Tabs>
              <Route path='/addContacto' component={CrearContactoDinamic}/>
              <Route path='/deleteContact' component={BorrarContactoDinamic}/>
              <Route path='/editContact' component={EditContactDinamic}/>
            </BrowserRouter>

            <TableAgenda />
        </Content>
        <Footer><a target="_blank" href="https://www.google.com/">Find on Google</a></Footer>
      </Layout>
      </div>
    );
  }
};

export default App;
