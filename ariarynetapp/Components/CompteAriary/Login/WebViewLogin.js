import React, { Component } from 'react';
import { WebView } from 'react-native';
listeNavigationStateChage=()=>{
    Alert.alert('Url has changed!!!!');
}
export default class WebViewLogin extends Component {
  render() {
    return (
      <WebView
      startInLoadingState={true}
        onNavigationStateChange={this.listeNavigationStateChage}
        source={{uri: 'http://54.229.79.45/LoginWeb/'}}
        style={{marginTop: 20}}
      />
    );
  }
}