import React, { Component } from 'react';
import { Image } from 'react-native';
import { Spinner } from './Spinner';
import firebase from 'firebase';

class AsyncImage extends Component {
  
  _isMounted = false;
  
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      image: "",
      url: ""
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.getAndLoadHttpUrl();
  }

  
  getAndLoadHttpUrl() {
    const ref = firebase.storage().ref(this.props.image);
    ref.getDownloadURL().then(data => {
      if (this._isMounted) {
        this.setState({ url: data, loading: false });
      }
    }).catch(error => {
      console.log("AsyncImage > getAndLoadHttpUrl", error);
      this.setState({ url: null, loading: false });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.loading) {
      return <Spinner size="large"/>;
    }
    return ( this.state.url &&
      <Image style={this.props.style} source={{uri: this.state.url}} />
    );
  }
}

export { AsyncImage };
