import React, { Component } from 'react';
import { Image } from 'react-native';
import { Spinner } from './Spinner';
import firebase from 'firebase';

class AsyncImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      mounted: true,
      image: "",
      url: ""
    }
  }

  componentDidMount() {
    this.getAndLoadHttpUrl();
  }

  async getAndLoadHttpUrl() {
    if (this.state.mounted) {
      const ref = firebase.storage().ref(this.props.image);
      ref.getDownloadURL().then(data => {
        this.setState({ url: data, loading: false, mounted: true });
      }).catch(error => {
        this.setState({ url: "regalo.jpg", loading: false });
      })
    }
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  render() {
    if (this.state.mounted) {
      if (this.state.loading) {
        return <Spinner size="large"/>;
      }
      return (
        <Image style={this.props.style} source={{uri: this.state.url}} />
      );
    }
    return null;
  }
}

export {AsyncImage};
