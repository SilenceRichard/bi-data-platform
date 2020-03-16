import React, { Component } from 'react';
import qs from 'qs';
import './App.css';

// import { MainLayout } from './pages/main/layout';
import StorageLayout from './pages/storage';
import TransportLayout from './pages/transport';

class App extends Component {
  state = {
    type: '',
    token: '',
  }
  getUrlQuery = () => {
    const url = window.location.search.slice(1, window.location.search.length);
    const query = qs.parse(url);
    const { type = '', token = '' } = query;
    this.setState({ type, token });
  }
  componentDidMount() {
    this.getUrlQuery();
  }
  render() {
    const { type, token } = this.state;
    return (
      <div className="App">
        {
          type === 'storage' && token && <StorageLayout token={token} />
        }
        {
          type === 'transport' && token && <TransportLayout token={token} />
        }
      </div>
    );
  }

}

export default App;
