import { Button, StyleSheet, Text, View } from 'react-native';

const Home = ({ navigation }) => {
  function goToScreen() {
    navigation.navigate('pantalla'); 
  }

  return (
    <View style={styles.container}>
      <Text>Menú principal de nuestro proyecto</Text>
      <br></br>
      <Button 
        title='Ir a Inicio' 
        onPress={goToScreen} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Home;