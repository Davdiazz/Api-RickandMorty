import { StyleSheet, Text, View } from 'react-native';

const Setting = () => {
  return (
    <View style={styles.container}>
      <Text>Este es el menú de configuraciones de la pagina web</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
    },
});

export default Setting;