import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image, TouchableOpacity, NativeModules, Dimensions } from 'react-native';
import Video from 'react-native-video';
import uuid from 'uuid';


const ImagePicker = NativeModules.ImageCropPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default class Album extends Component {

  static navigationOptions = {
    title: 'All Photos'
  };

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      images: null
    };
  }

  pickSingleWithCamera() {
    ImagePicker.openCamera({
      cropping: true,
      includeExif: true,
    }).then(image => {
      console.log('received image', image);
      this.setState({ image: { uri: image.path, width: image.width, height: image.height } });
    }).catch(e => alert(e));
  }

  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: true,
      includeExif: true,
      mediaType: 'photo',
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressVideoPreset: 'MediumQuality',
    }).then(images => {
      this.setState({
        images: images.map(i => {
          console.log('received image', i);
          return { uri: i.path, width: i.width, height: i.height, mime: i.mime };
        })
      });
    }).catch(e => alert(e));
  }

  renderImage(image) {
    return <Image key={uuid.v4()} style={{ width: 300, height: 300, resizeMode: 'contain' }} source={image} />
  }

  renderAsset(image) {
    return this.renderImage(image);
  }

  render() {
    let { image, albums } = this.props.navigation.state.params;
    return (<View style={styles.container}>
      <ScrollView>
        {image ? this.renderAsset(image) : null}
        {albums ? albums.map(i => <View key={uuid.v4()}>{this.renderAsset(i)}</View>) : null
        }
      </ScrollView>

    </View>);
  }
}