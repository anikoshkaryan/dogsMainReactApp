import React, {Component} from 'react';
import Svg, {Path, Rect, Circle, Defs, Stop} from "react-native-svg";
// import { LinearGradient } from 'expo-linear-gradient';
import {AuthContext} from '../AuthContext/context';
import axios from 'axios';

import {
    Text,
    Alert,
    Button,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    ActivityIndicator,
    ImageBackground
} from 'react-native';

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import {LinearGradient} from "expo-linear-gradient";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            login: '',
            password: '',
            confirmPassword: '',

            error_name: false,
            error_login: false,
            error_password: false,
            error_confirm_password: false,
            genderError: false,

            error_name_text: '',
            error_login_text: '',
            error_password_text: '',
            error_confirm_password_text: '',

            successRegistered: false,

            gender: [
                {label: 'мужчина', value: 'man', id: 1},
                {label: 'женщина', value: 'woman', id: 2}
            ],
            value: ''

        };
    }

    componentDidMount() {

    }

    // submitForm = () =>  {
    //     let login_val = this.state.login;
    //     let password_val = this.state.password;
    //     console.log(login_val, password_val);
    //     var re = /\S+@\S+\.\S+/;

    //      if ( re.test(login_val) && password_val >= 6) {
    //         alert("You has been logged sucessfully");
    //      }
    // }

    registerForm = () => {

        let name_val = this.state.name;
        let login_val = this.state.login;
        let password_val = this.state.password;
        let confirmPassword_val = this.state.confirmPassword;

        const req = {
            name: name_val,
            login: login_val,
            password: password_val,
            password_confirmation: confirmPassword_val,
            gender: this.state.value,
        };

        axios.post('http://80.78.246.59/dogs-app/public/api/registration', req).then(
            (response) => {
                // if (response.status === 200  ) {
                //     let foundUser = {
                //         email: response.data.user.email,
                //         name: response.data.user.name,
                //         token: response.data.token,
                //     }
                //
                //     this.context.signIn(foundUser);
                // }
                let response_data = response.data;
                if (response_data.success) {
                    this.setState({
                        successRegistered: true
                    })
                    setTimeout(() => {
                        this.props.navigation.navigate('Login')
                        this.setState({
                            successRegistered: false
                        })
                    }, 3000)
                } else {
                    if (response_data.data.hasOwnProperty("name")) {
                        this.setState({
                            error_name: true,
                            error_name_text: "Не верное значение!"
                        })
                        return false
                    } else {
                        this.setState({
                            error_name: false,
                            error_name_text: ""
                        })

                    }

                    if (response_data.data.hasOwnProperty("login")) {
                        this.setState({
                            error_login: true,
                            error_login_text: "Не верное значение!"
                        })
                        return false

                    } else {
                        this.setState({
                            error_login: false,
                            error_login_text: ""
                        })
                    }


                    if (response_data.data.hasOwnProperty("password")) {
                        this.setState({
                            error_password: true,
                            error_password_text: response_data.data.password
                        })
                        return false
                    } else {
                        this.setState({
                            error_password: false,
                            error_password_text: ""
                        })
                    }
                    if (this.state.value === ''){
                        this.setState({
                            genderError: true
                        })
                        return false
                    }else{
                        this.setState({
                            genderError: false
                        })
                    }


                    if (response_data.data.hasOwnProperty("password_confirmation")) {
                        this.setState({
                            error_confirm_password: true,
                            error_confirm_password_text: response_data.data.password_confirmation
                        })
                    } else {
                        this.setState({
                            error_confirm_password: false,
                            error_confirm_password_text: ""
                        })
                    }
                }
            },

            (err) => {
                console.log(err, 'error')
                // if (err.response.status === 404 && err.response.data === 'User does not exist') {
                //     this.setState({
                //         existEmail: false
                //     })
                // }

                // if (err.response.status === 401) {
                //     this.setState({
                //         isValidPassword: false
                //     })
                // }
            },
        );

    }

    loginLink = () => {
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient colors={['#E1C1B7', '#FFFFFF']} style={styles.register_wrapper}>
                    <View style={styles.register_inputs_wrapper}>
                        <Text style={styles.register_title}>Регистрация</Text>
                        {this.state.successRegistered === true
                        &&
                        <View style={styles.modalStyle}>
                            <Text style={{color: '#b56422', fontSize: 18, textAlign: 'center'}}>
                                Пользователь успешно зарегистрирован!
                            </Text>
                            <TouchableOpacity style={styles.success_btn} onPress={()=>{this.props.navigation.navigate('Login')}}>
                                <Text style={{color: 'white', fontSize: 17,}}>
                                    Войти
                                </Text>
                            </TouchableOpacity>
                        </View>

                        }
                        <View style={styles.register_input_parent}>
                            {this.state.error_name &&

                                <Text style={styles.error_text}>
                                    {this.state.error_name_text}
                                </Text>

                            }
                            <TextInput
                                style={[styles.register_input]}
                                onChangeText={(val) => this.setState({name: val})}
                                value={this.state.name}
                                placeholder="Имя"
                                placeholderTextColor="#c9a477"
                            />


                        </View>
                        <View style={styles.register_input_parent}>
                            {this.state.error_login &&

                                <Text style={styles.error_text}>
                                    {this.state.error_login_text}
                                </Text>

                            }
                            <TextInput
                                style={[styles.register_input]}
                                onChangeText={(val) => this.setState({login: val})}
                                value={this.state.login}
                                placeholder="Логин"
                                placeholderTextColor="#c9a477"
                            />

                        </View>
                        <View style={styles.register_input_parent}>
                            {this.state.error_password &&

                                <Text style={styles.error_text}>
                                    {this.state.error_password_text}
                                </Text>

                            }
                            <TextInput
                                style={[styles.register_input]}
                                onChangeText={(val) => this.setState({password: val})}
                                value={this.state.password}
                                placeholder="Пароль"
                                secureTextEntry={true}
                                placeholderTextColor="#c9a477"
                            />

                        </View>
                        <View style={styles.register_input_parent}>
                            <TextInput
                                style={[styles.register_input]}
                                onChangeText={(val) => this.setState({confirmPassword: val})}
                                value={this.state.confirmPassword}
                                placeholder="Повторите пароль"
                                secureTextEntry={true}
                                placeholderTextColor="#c9a477"
                            />

                            {this.state.error_confirm_password &&

                                <Text style={styles.error_text}>
                                    {this.state.error_confirm_password_text}
                                </Text>

                            }
                            <View>
                                <Text style={{textAlign: 'center'}}>
                                    <View>
                                        <RadioForm
                                            style={{flexDirection: 'row', marginTop: 20,}}
                                            radio_props={this.state.gender}
                                            buttonColor={'#b56422'}
                                            labelHorizontal={true}
                                            initial={-1}
                                            animation={true}
                                            buttonInnerColor={'#b56422'}
                                            selectedButtonColor={'#b56422'}
                                            buttonSize={16}
                                            labelStyle={{fontSize: 16, color: '#b56422', marginRight: 25}}
                                            onPress={(value) => {this.setState({value:value})}}
                                        />
                                    </View>
                                </Text>
                                {this.state.genderError === true &&
                                    <Text style={{color: 'red', textAlign: 'center', fontSize: 16}}>Выберите пол</Text>}
                            </View>
                        </View>

                        <LinearGradient colors={['#c9a477', '#b56422']} style={styles.register_button_wrapper}>
                            <TouchableOpacity style={styles.register_button} onPress={() => {
                                this.registerForm()
                            }}>
                                <Text style={styles.register_button_text}>Регистрация</Text>

                            </TouchableOpacity>

                        </LinearGradient>

                        <View style={styles.login_link_wrapper}>
                            <Text style={styles.already_have_an_account_text}>У вас уже есть аккаунт?</Text>
                            <TouchableOpacity onPress={this.loginLink}>
                                <Text style={styles.login_link_text}>Войти</Text>
                            </TouchableOpacity>
                        </View>

                    </View>


                </LinearGradient>
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },

    register_wrapper: {
        width: "100%",
        paddingVertical: 60,
        height: "100%",
    },
    register_inputs_wrapper: {
        paddingHorizontal: 20,
    },
    register_title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#b56422',
        textAlign: 'center',
        marginBottom: 40,
    },
    register_input_parent: {
        // width: '100%',
        marginBottom: 15,
    },
    register_input: {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 17,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        fontSize: 14,
        color: '#c9a477',
    },
    register_button_wrapper: {
        width: '100%',
        backgroundColor: '#2EB6A5',
        borderRadius: 10,
        paddingVertical: 17,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 62,
    },
    register_button: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    register_button_text: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    login_link_wrapper: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    already_have_an_account_text: {
        fontSize: 14,
        marginBottom: 12,
        color: '#c9a477',

    },
    login_link_text: {
        color: '#b56422',
        fontSize: 14,
        fontWeight: "bold",
    },
    error_text: {
        fontSize: 12,
        color: "red",
        fontWeight: "bold",
        marginTop: 5,
        marginLeft: 4,
    },
    modalStyle: {
        width: 300,
        height: 200,
        backgroundColor: '#ffffff',
        position: 'absolute',
        zIndex: 4,
        left: '15%',
        top: '30%',
        borderRadius: 20,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 25,
        paddingHorizontal: 20,
        shadowColor: "#000000",
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 2,
        shadowRadius: 4.65,

        elevation: 8,

    },
    success_btn: {
        backgroundColor: "#b56422",
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        paddingVertical: 10,
    }
});
