import React, { Component } from 'react';
import { Tile } from 'react-native-elements';
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
          style={[this.props.style]}
          imageSrc={{uri: this.state.url}}
          title={this.props.title}
          contentContainerStyle={{ flex: 1 }}
        >
          {this.props.children}
        </Tile>
      );
    }
    return null;
  }
}

export { AsyncTile };
