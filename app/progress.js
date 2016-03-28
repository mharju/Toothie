import React, { View, Component } from 'react-native'

export class Progress extends Component {
    render() {
        const colors ={
            gold: ['rgba(248, 231, 28, 1.0)', 'rgba(248, 231, 28, 0.6)', 'rgba(248, 231, 28, 0.4)', 'rgba(248, 231, 28, 0.2)']
        }
        const scheme = 'gold'
        const section = Math.min(Math.floor(this.props.currentTime / 30), 3)

        return (<View style={[{flex: 1}]}>
            {new Array(4).fill(0).map((item,index) => {
                const color = index <= section ? colors[scheme][index] : 'white'
                return <View key={index} style={[{flex: 1, backgroundColor: color}]} />
            })}
        </View>)
    }
}
