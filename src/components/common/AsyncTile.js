import React, { Component } from 'react';
import { Tile, Text } from 'react-native-elements';
import { View } from 'react-native';
import { Spinner } from './Spinner';
import firebase from 'firebase';

class AsyncTile extends Component {

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
        <Tile
          imageSrc={{uri: this.state.url}}
          title={this.props.title}
          contentContainerStyle={{ height: 70 }}
        >
          {this.props.children}
        </Tile>
      );
    }
    return null;
  }
}

export {AsyncTile};
