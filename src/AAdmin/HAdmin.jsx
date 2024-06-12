import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Card, Button, Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const HAdmin = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../style/fonfff.png')}
        style={styles.image}
      />
      <View style={styles.overlay}>
        {/* Central Button */}
        <Button
          title="Nos formations"
          buttonStyle={styles.buttonContainer}
          titleStyle={styles.buttonText}
          onPress={() => navigation.navigate('Formation')}
        />
        <Text style={styles.description}>
          Nos formations en un Coup, en un Click 
        </Text>

        {/* Main Card */}
        <Card containerStyle={styles.mainCard}>
          <Image
            source={require('../style/roro.jpg')}
            style={styles.mainCardImage}>
            <View style={styles.mainCardContent}>
              <Card.Title style={styles.cardTitle}>Football</Card.Title>
              <Card.Divider />
              <Text style={styles.cardText}>Formation de foot et bien plus encore</Text>
              <Button
                title="Acceder"
                buttonStyle={styles.buttonContainer1}
                titleStyle={styles.buttonText1}
                onPress={() => navigation.navigate('Formation')}
              />
            </View>
          </Image>
        </Card>

        {/* Other Cards */}
        <View style={styles.cardContainer}>
          {/* First Card */}
          <Card containerStyle={styles.card}>
            <Image
              source={require('../style/baskeeet.jpg')}
              style={styles.mainCardImage2}>
              <View style={styles.mainCardContent}>
                <Card.Title style={styles.cardTitle}>Basket</Card.Title>
                <Card.Divider />
                <Text style={styles.cardText}>Formation de basket</Text>
                <Button
                  title="Acceder"
                  buttonStyle={styles.buttonContainer2}
                  titleStyle={styles.buttonText2}
                  onPress={() => navigation.navigate('Formation')}
                />
              </View>
            </Image>
          </Card>

          {/* Second Card */}
          <Card containerStyle={styles.card}>
            <Image
              source={require('../style/tennis.jpg')}
              style={styles.mainCardImage3}>
              <View style={styles.mainCardContent}>
                <Card.Title style={styles.cardTitle}>Tennis</Card.Title>
                <Card.Divider />
                <Text style={styles.cardText}>Formation de Tennis</Text>
                <Button
                  title="Acceder"
                  buttonStyle={styles.buttonContainer3}
                  titleStyle={styles.buttonText3}
                  onPress={() => navigation.navigate('Formation')}
                />
              </View>
            </Image>
          </Card>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  titre: {
    color: '#FFF',
    fontSize: 48,
    fontWeight: 'bold',
  },
  description: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
  },
  mainCard: {
    width: '50%',
    height: 150,
    borderRadius: 20,
    elevation: 10,
    shadowColor: '#401E43',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    backgroundColor: 'transparent',
    padding: 0,
    overflow: 'hidden',
  },
  mainCardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  mainCardImage2: {
    width: '116%',
    height: 200,
    resizeMode: 'cover',
  },
  mainCardImage3: {
    width: '115%',
    height: 200,
    resizeMode: 'cover',
  },
  mainCardContent: {
    padding: 15,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  card: {
    width: '45%',
    height: 150,
    borderRadius: 20,
    elevation: 10,
    shadowColor: '#DACCDC',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    backgroundColor: 'transparent',
    padding: 0,
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  cardTextother: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: '#515',
    padding: 15,
    borderRadius: 10,
    elevation: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer1: {
    backgroundColor: '#115',
  
    borderRadius: 10,
    elevation: 10,
   
    width:'55%',
    marginLeft: 35,
  },
  buttonText1: {
    color: 'white',
    
    fontWeight: 'bold',
    
  },
  buttonContainer2: {
    backgroundColor: '#115',
  
    borderRadius: 10,
    elevation: 10,
   
    width:'55%',
    marginTop: 10,
    marginLeft: 30,
  },
  buttonText2: {
    color: 'white',
    
    fontWeight: 'bold',
    
  },
  buttonContainer3: {
    backgroundColor: '#115',
  
    borderRadius: 10,
    elevation: 10,
   
    width:'55%',
    marginLeft: 30,
    marginTop: 10,
  },
  buttonText3: {
    color: 'white',
    
    fontWeight: 'bold',
    
  },
});

export default HAdmin;
