// importamos dependencias
import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Text, Button, View, Image, Alert, StatusBar } from 'react-native';
import { createStackNavigator } from 'react-navigation';

// creamos el componente para listar los elementos
class FetchExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  static navigationOptions = {
    title: 'Home'
  };

  componentDidMount() {
    return fetch('http://www.mocky.io/v2/5aa722ea2f0000e8048ea463')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function () {

        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // manejamos el evento y se lo pasamos como paramentro a la ruta
  handlePress(item){
    // console.warn('Artist is ', item);
    this.props.navigation.navigate('Details',{item});
  }

  // creamos el render
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={{flex: 1, backgroundColor: '#e7e7e7'}}>
        <Text style={styles.headline}>List Players</Text>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) =>
            <View style={styles.card}>
              <Image source={{uri: item.thumbnail}} style={styles.image}/>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={{textAlign: 'center', padding: 10}}>Age: {item.age}</Text>
              <Button
                title="Learn More"
                onPress={() => this.handlePress(item)}
                accessibilityLabel="Learn more"
                color="#EC407A"
              />
            </View>}
          keyExtractor={(item, index) => `list-item-${index}`}
        />
      </View>
    );
  }
}

// creamos el componente para detalles
class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
  };

  render() {
    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    const artists = this.props.navigation.state.params.item;
    // console.warn(JSON.stringify(artists))

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={{uri: artists.thumbnail}} style={styles.detailImg}/>
        <Text style={styles.detailTitle}>{(artists.name)}</Text>
        <Text style={[styles.detailSubtitle, styles.flex]}>Hair Color: {(artists.hair_color)}</Text>
        <Text style={[styles.detailSubtitle, styles.flex]}>Weight: {parseInt(artists.weight)}</Text>
        <Text style={[styles.detailSubtitle, styles.flex]}>Height: {parseInt(artists.height)}</Text>
        <Text style={styles.detailSubtitle}>Professions: {JSON.stringify(artists.professions)}</Text>
        <View style={{flex:2, marginTop: 20}} >
          <Button
            title="Go back"
            onPress={() => this.props.navigation.goBack()}
            accessibilityLabel="Go back"
            color="#EC407A"
          />
        </View>
      </View>
    );
  }
}

// manejamos las rutas con react-navigator
export default createStackNavigator(
  {
    Home: {
      screen: FetchExample,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#7E57C2',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    marginTop: 0,
    backgroundColor: '#5E35B1',
    width: '100%',
    padding: 10,
  },
  card: {
    backgroundColor: 'whitesmoke',
    padding: 7,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  image: {
    width: 280,
    height: 250,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 20
  },
  detailTitle: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 25
  },
  detailSubtitle: {
    flex: 1,
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 15
  },
  detailImg: {
    flex: 4,
    width: '100%',
  },
  flex: {
    flex: 0
  }
});
