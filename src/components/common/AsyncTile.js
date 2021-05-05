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

  componentDidUpdate(prevProps) {
    if (this.props.image != prevProps.image) {
      this.getAndLoadHttpUrl();
    }
  }

  getAndLoadHttpUrl() {
    const ref = firebase.storage().ref(this.props.image);
    ref.getDownloadURL().then(data => {
      if (this._isMounted) {
        this.setState({ url: data, loading: false });
      }
    }).catch(error => {
      console.log("AsyncTile > getAndLoadHttpUrl", error);
      this.setState({ url: null, loading: false });
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.loading) {
      return <Spinner size="large"/>;
    }
    return (this.state.url &&
      <Tile
        style={[this.props.style]}
        imageContainerStyle={[this.props.imageContainerStyle]}
        imageSrc={{uri: this.state.url}}
        title={this.props.title}
        contentContainerStyle={[this.props.contentContainerStyle]}
      >
        {this.props.children}
      </Tile>
    );
  }
}

export { AsyncTile };
