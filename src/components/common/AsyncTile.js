import React, { Component } from 'react';
import { Tile } from 'react-native-elements';
import { Spinner } from './Spinner';
import firebase from 'firebase';

class AsyncTile extends Component {
  
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
      this.setState({ url: "regalo.jpg", loading: false });
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
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
}

export { AsyncTile };
