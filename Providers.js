/**
 * Created by tdesai on 5/13/2016.
 */
import React  from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView
} from 'react-native';


//http://stackoverflow.com/questions/33969333/react-native-fetch-request-failed-with-error-typeerror-network-request-faile
export const Providers = React.createClass({
    getInitialState () {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows([]),
        };
        /*return {
         contacts: ['Tapshil']
         };*/
    },
    loadData () {
        var self = this;
        fetch('http://172.24.12.195:7005/athena_rest/v1/claims/77707/contacts', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic a2hpbGw6emVuaXRoMTE='
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            self.setState({
                dataSource: this.state.dataSource.cloneWithRows(data),
            });
            return;
        }).catch((error) => {
            console.error(error);
        });
    },
    componentDidMount() {
        this.loadData();
    },
    render () {
        return (
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => {
                    return <View style={styles.card}>
                        <Text>Hi {rowData.contactName.first}!</Text>
                    </View>}}
            />
        );
    },
});

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 150,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: {width: 2, height: 2,},
        shadowOpacity: 0.5,
        shadowRadius: 3,
    }
});
