import TabNavigation from '@/navigation/TabNavigation';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!username.trim() || !password.trim()) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }
        
        // Aquí puedes agregar tu lógica de autenticación
        // Por ahora acepta cualquier usuario/contraseña
        console.log('Login exitoso');
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
    };

    if (isLoggedIn) {
        return <TabNavigation />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Iniciar Sesión</Text>
                </View>
                
                <View style={styles.cardBody}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Usuario</Text>
                        <TextInput
                            style={styles.formControl}
                            placeholder="Ingresa tu usuario"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            placeholderTextColor="#6c757d"
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Contraseña</Text>
                        <TextInput
                            style={styles.formControl}
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoCapitalize="none"
                            placeholderTextColor="#6c757d"
                        />
                    </View>

                    <TouchableOpacity 
                        style={styles.btnPrimary} 
                        onPress={handleLogin}
                    >
                        <Text style={styles.btnText}>Ingresar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnLink}>
                        <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    // Container principal - bg-light
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        padding: 20,
    },
    // Card - Bootstrap card
    card: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    // Card header
    cardHeader: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#dee2e6',
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#212529',
        textAlign: 'center',
    },
    // Card body
    cardBody: {
        padding: 20,
    },
    // Form group - mb-3
    formGroup: {
        marginBottom: 16,
    },
    // Label
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#212529',
        marginBottom: 8,
    },
    // Form control - input
    formControl: {
        width: '100%',
        height: 48,
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 6,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#212529',
        backgroundColor: '#fff',
    },
    // Button primary - btn btn-primary
    btnPrimary: {
        width: '100%',
        height: 48,
        backgroundColor: '#0d6efd',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    // Button link
    btnLink: {
        marginTop: 16,
        alignItems: 'center',
    },
    linkText: {
        color: '#0d6efd',
        fontSize: 14,
    },
});