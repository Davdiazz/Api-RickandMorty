import { StyleSheet, Text, View } from 'react-native';

export default function HomeCard({ title, description, children }) {
  return (
    <View style={styles.card}>
      {title && <Text style={styles.title}>{title}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F3EDE7',
    padding: 24,
    borderRadius: 30,
    marginBottom: 25,
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000',
  },
  description: {
    fontSize: 15,
    color: '#555',
    marginBottom: 15,
  },
});
