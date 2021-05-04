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
    if (this.props.uri) {
      this.setState({ url: this.props.uri, loading: false });
    } else {
      this.getAndLoadHttpUrl();
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.uri) {
      if (this.props.image != prevProps.image) {
        this.getAndLoadHttpUrl();
      }
    }
    if (this.props.uri !== prevProps.uri) {
      this.setState({ url: this.props.uri, loading: false });
    }
  }

  
  getAndLoadHttpUrl() {
    this.setState({loading: true});
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
