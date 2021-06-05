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
      image: null,
      uri: null,
      imageRoute: ""
    }
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.props.uri) {
      this.setState({ uri: this.props.uri, loading: false });
    } else {
      if (this.props.image) {
        this.setState({ image: this.props.image, loading: false });
      } else {
        if (this.props.imageRoute) {
          this.getAndLoadHttpUrl();
        } else {
          this.setState({ loading: false });
        }
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.uri !== prevProps.uri) {
      this.setState({ uri: this.props.uri, loading: false });
    }
    if (!this.props.uri) {
      if (this.props.imageRoute != prevProps.imageRoute) {
        this.getAndLoadHttpUrl();
      }
    }
    if (this.props.image !== prevProps.image) {
      this.setState({ image: this.props.image, loading: false });
    }
  }

  getAndLoadHttpUrl() {
    const ref = firebase.storage().ref(this.props.imageRoute);
    ref.getDownloadURL().then(data => {
      if (this._isMounted) {
        this.setState({ uri: data, loading: false });
      }
    }).catch(error => {
      console.log("AsyncTile > getAndLoadHttpUrl", error);
      this.setState({ uri: null, loading: false });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.loading) {
      return <Spinner size="large"/>;
    }
    const image = this.state.uri ? { uri: this.state.uri } : this.state.image;
    return (
      <Tile
        style={[this.props.style]}
        imageContainerStyle={[this.props.imageContainerStyle]}
        imageSrc={{uri: this.state.uri}}
        title={this.props.title}
        contentContainerStyle={[this.props.contentContainerStyle]}
      >
        {this.props.children}
      </Tile>
    );
  }
}

export { AsyncTile };
