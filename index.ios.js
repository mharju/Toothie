import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Vibration,
  NativeModules,
  AppState
} from 'react-native';

var NotificationPlayer = NativeModules.NotificationPlayer;

class Progress extends Component {
    render() {
        const colors = {
            gold: ['#FDFF1C', '#FDFF5C', '#FDFF82', '#A4A609']
        }
        const scheme = 'gold'
        const section = Math.min(Math.floor(this.props.currentTime / 30), 3)

        return (<View style={styles.progress}>
            {new Array(section+1).fill(0).map((item,index) => {
                return <View key={index} style={[styles.section, {backgroundColor: colors[scheme][index]}]} />
            })}
        </View>)
    }
}

class Toothie extends Component {
    constructor(props) {
        super(props)
        this._onChange = this._onChange.bind(this)

        this.state = {
            top: 63, left: 273, currentTime: 0, timer: null
        }
    }
    _onChange(event) {
        if(AppState.currentState == 'active') {
            this.setState({currentTime: 0, timer: setInterval(this.progress.bind(this), 1000)})
        } else if(this.state.timer !== null) {
            clearInterval(this.state.timer)
        }
    }
    formatTime(currentTime) {
        const minutes = Math.floor(currentTime / 60)
        const seconds = currentTime - minutes * 60
        return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }
    layoutText(e) {
        const d = Dimensions.get('window')
        const {width, height} = e.nativeEvent.layout
        const x = (d.width - width) / 2
        const y = (d.height - height) / 2
        this.setState({top: y, left: x})
    }
    progress() {
        const currentTime = this.state.currentTime
        if(currentTime >= 120) {
            clearInterval(this.state.timer)
            this.setState({timer: null});
        } else {
            if (((currentTime + 1) % 30) == 0) {
                Vibration.vibrate(500)
                NotificationPlayer.playNotificationSound()
            }
            this.setState({currentTime: currentTime + 1});
        }
    }
    componentDidMount() {
        AppState.addEventListener('change', this._onChange);
        this._onChange();
    }
    componentWillUnmount() {
        AppState.removeEventListner('change', this._onChange);
    }
    render() {
        return (
          <View style={styles.container} onChange={this._onChange}>
            <Progress currentTime={this.state.currentTime} />
            <Text onLayout={this.layoutText.bind(this)}
                style={[styles.timer, {top: this.state.top+1, left: this.state.left, color: '#1f1f1f' }]}>
                {this.formatTime(this.state.currentTime)}
            </Text>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    timer: {
        backgroundColor: 'transparent',
        fontSize: 100,
        color: 'white',
        fontFamily: 'HelveticaNeue-Light',
        position: 'absolute'
    },
    progress: {
      flex: 1
    },
    section: {
      flex: 1
    }
});

AppRegistry.registerComponent('Toothie', () => Toothie);
