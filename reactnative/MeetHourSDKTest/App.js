/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Switch,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';

import MeetHour, {MeetHourView} from 'react-native-meet-hour-sdk';

import styles from './styles/styles';
import strings from './lang/strings';

class App extends Component {
  constructor(props) {
    super(props);
    this.onConferenceTerminated = this.onConferenceTerminated.bind(this);
    this.onConferenceJoined = this.onConferenceJoined.bind(this);
    this.onConferenceWillJoin = this.onConferenceWillJoin.bind(this);
    this.state = {
      showMeet: false,
      serverUrl: 'https://meethour.io',
      roomName: '18311a05e8',
      subject: '',
      displayName: '',
      email: '',
      audioMuted: false,
      videoMuted: false,
    };
  }

  runMeet() {
    this.setState({showMeet: true});

    const meetingInfo = {
      serverUrl: this.state.serverUrl,
      roomName: this.state.roomName,
      subject: this.state.subject,
      userInfo: {
        displayName: this.state.displayName,
        email: this.state.email,
        avatar: strings.avatar.avatarURL,
      },
      audioMuted: this.state.audioMuted,
      videoMuted: this.state.videoMuted,
    };

    setTimeout(() => {
      MeetHour.join_meethour(meetingInfo);
    }, 1000);

    this.cleanUp();
  }

  onConferenceJoined(nativeEvent) {
    /* Conference joined event */
    console.log(nativeEvent);
  }

  onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
    console.log(nativeEvent);
  }

  onConferenceTerminated(nativeEvent) {
    /* Conference terminated event */
    console.log(nativeEvent);
    this.setState({showMeet: false});
  }

  cleanUp() {
    this.setState({
      serverUrl: '',
      roomName: '',
      subject: '',
      displayName: '',
      email: '',
      audioMuted: false,
      videoMuted: false,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.showMeet ? (
          <MeetHourView
            onConferenceTerminated={this.onConferenceTerminated}
            onConferenceJoined={this.onConferenceJoined}
            onConferenceWillJoin={this.onConferenceWillJoin}
            style={{
              flex: 1,
              height: '100%',
              width: '100%',
            }}
          />
        ) : (
          <ScrollView>
            <ImageBackground
              source={require('./images/MeetHour_logo.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <TextInput
              style={styles.textInput}
              value={this.state.serverUrl}
              placeholder={strings.placeholders.serverURL}
              onChangeText={(text) => this.setState({serverUrl: text})}
              keyboardType={'url'}
              autoCapitalize={'none'}
            />
            <TextInput
              style={styles.textInput}
              value={this.state.roomName}
              placeholder={strings.placeholders.roomname}
              onChangeText={(text) => this.setState({roomName: text})}
            />
            <TextInput
              style={styles.textInput}
              value={this.state.subject}
              placeholder={strings.placeholders.subject}
              onChangeText={(text) => this.setState({subject: text})}
            />
            <TextInput
              style={styles.textInput}
              value={this.state.displayName}
              placeholder={strings.placeholders.displayName}
              onChangeText={(text) => this.setState({displayName: text})}
              autoCapitalize={'words'}
            />
            <TextInput
              style={styles.textInput}
              value={this.state.email}
              placeholder={strings.placeholders.email}
              onChangeText={(text) => this.setState({email: text})}
              keyboardType={'email-address'}
            />
            <View style={styles.switch}>
              <Text>{strings.text.startWithAudioMuted}</Text>
              <Switch
                onValueChange={() =>
                  this.setState({audioMuted: !this.state.audioMuted})
                }
                value={this.state.audioMuted}
              />
            </View>
            <View style={styles.switch}>
              <Text>{strings.text.startWithVideoMuted}</Text>
              <Switch
                onValueChange={() =>
                  this.setState({videoMuted: !this.state.videoMuted})
                }
                value={this.state.videoMuted}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <Text>{strings.avatar.avatar}</Text>
              <Image
                style={styles.avatar}
                resizeMode="contain"
                source={{uri: strings.avatar.avatarURL}}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.runMeet()}
              style={styles.button}>
              <Text style={styles.buttonText}>{strings.buttons.join}</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    );
  }
}

export default App;
