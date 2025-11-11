import TabNavigation from '@/navigation/TabNavigation';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { auth } from '../firebaseConfig';
export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [initializing, setInitializing] = useState(true);

    // Observador del estado de autenticación
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
            if (initializing) setInitializing(false);
            if (user) {
                console.log('Usuario autenticado:', user.email);
            }
        });
        
        return unsubscribe;
    }, []);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }
        
        setLoading(true);
        
        try {
            await signInWithEmailAndPassword(auth, email.trim(), password);
            console.log('Login exitoso');
        } catch (error: any) {
            console.error('Error en login:', error.code);
            
            let errorMessage = 'Error al iniciar sesión';
            
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = 'El correo electrónico no es válido';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'Esta cuenta ha sido deshabilitada';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'No existe una cuenta con este correo';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Contraseña incorrecta';
                    break;
                case 'auth/invalid-credential':
                    errorMessage = 'Credenciales inválidas. Verifica tu correo y contraseña';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Demasiados intentos. Intenta más tarde';
                    break;
                case 'auth/network-request-failed':
                    errorMessage = 'Error de conexión. Verifica tu internet';
                    break;
                default:
                    errorMessage = 'Error: ' + error.message;
            }
            
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setEmail('');
            setPassword('');
            console.log('Logout exitoso');
        } catch (error) {
            console.error('Error en logout:', error);
            Alert.alert('Error', 'No se pudo cerrar sesión');
        }
    };

    if (initializing) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0d6efd" />
                <Text style={styles.loadingText}>Cargando...</Text>
            </View>
        );
    }

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
                        <Text style={styles.label}>Correo Electrónico</Text>
                        <TextInput
                            style={styles.formControl}
                            placeholder="ejemplo@correo.com"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholderTextColor="#6c757d"
                            editable={!loading}
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
                            editable={!loading}
                        />
                    </View>

                    <TouchableOpacity 
                        style={[styles.btnPrimary, loading && styles.btnDisabled]} 
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.btnText}>Ingresar</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.btnLink}
                        disabled={loading}
                    >
                        <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        padding: 20,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#6c757d',
    },
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
    cardBody: {
        padding: 20,
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#212529',
        marginBottom: 8,
    },
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
    btnPrimary: {
        width: '100%',
        height: 48,
        backgroundColor: '#0d6efd',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    btnDisabled: {
        backgroundColor: '#6c757d',
        opacity: 0.6,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    btnLink: {
        marginTop: 16,
        alignItems: 'center',
    },
    linkText: {
        color: '#0d6efd',
        fontSize: 14,
    },
});