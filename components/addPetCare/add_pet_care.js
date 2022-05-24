import React, {Component} from 'react';
import Svg, {Path, Rect, Circle, Defs, Stop,G, ClipPath} from "react-native-svg";
import {LinearGradient} from 'expo-linear-gradient';
// import {TextInput} from "react-native-paper";
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-datepicker';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AsyncStorage from '@react-native-async-storage/async-storage'


import {
    Text,
    Alert,
    Button,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    ImageBackground,
    ScrollView,
    Modal,
    TextInput,


} from 'react-native';

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import axios from "axios";
import {AuthContext} from "../AuthContext/context";


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showFilter: false,

            name_field: '',
            name_field_error:false ,
            name_field_valid: false,
            name_field_error_text: '',

            edit_birth: '',
            edit_birth_error: false,
            edit_birth_valid: false,
            edit_birth_error_text: '',

            messageInput: null,

        };


    }
    static contextType = AuthContext
    componentDidMount() {
        // this.handleGetDogsList().then(e => console.log(e))
    }

    backToPetCare = () => {
        this.props.navigation.navigate("PetCare");
    }


    dateBirth = (date) => {
        this.setState({
            edit_birth: date,
            edit_birth_error: false,
            edit_birth_valid: true,
        })

    }




    render() {

        return (
            <SafeAreaView style={styles.container}>

                {/*TOP PANEL START*/}

                <View style={styles.top_panel}>

                    <TouchableOpacity style={styles.back_to_pets_page_btn}
                                      onPress={() => {this.backToPetCare()}}
                    >
                        <Svg
                            width={26}
                            height={26}
                            viewBox="0 0 18 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            top_panel
                        >
                            <Path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.165 6.007l-.002.354c-.012 1.404-.096 2.657-.242 3.451 0 .015-.16.802-.261 1.064-.16.38-.447.701-.808.905a2 2 0 01-.91.219c-.25-.012-.661-.137-.955-.242l-.244-.094C5.126 11.022 2.036 8.924.852 7.64l-.087-.09-.39-.42A1.856 1.856 0 010 5.992c0-.379.116-.758.347-1.064.07-.099.18-.226.28-.334l.379-.397C2.31 2.876 5.135 1.022 6.599.407c0-.013.91-.393 1.343-.407H8c.664 0 1.285.379 1.602.991.087.168.17.496.233.784l.114.544c.13.874.216 2.216.216 3.688zm6.332-1.525c.83 0 1.503.68 1.503 1.518a1.51 1.51 0 01-1.503 1.517l-3.7-.327c-.65 0-1.179-.532-1.179-1.19 0-.658.528-1.191 1.18-1.191l3.699-.327z"
                                fill="#b56422"
                            />
                        </Svg>
                    </TouchableOpacity>
                    <Text style={styles.toptext}>
                        Добавить Заметки
                    </Text>





                </View>

                {/*TOP PANEL END*/}



                <LinearGradient colors={['#E1C1B7', '#FFFFFF']} style={styles.add_pets_items_wrapper}>

                    <ScrollView style={styles.add_pet_care_items_scrollView}>

                        <View style={styles.add_pet_care_item}>
                            <View style={styles.add_pet_care_item_title_box}>
                                <Text style={styles.add_pet_care_item_title}>Название</Text>
                            </View>
                            <View style={styles.register_input_parent}>

                                <TextInput
                                    style={[styles.add_pet_input,

                                        // {
                                        //     borderWidth: 1,
                                        //     borderColor: this.state.name_field_error ? '#A4223C' : this.state.name_field_valid ? '#337363' : '#d9d9d9'
                                        // },

                                    ]}
                                    onChangeText={(val) => this.setState({name_field: val})}
                                    value={this.state.name_field}
                                    placeholder="Имя"
                                    placeholderTextColor="#b56422"
                                />

                                {this.state.name_field_error &&

                                <Text style={styles.error_text}>
                                    {this.state.name_field_error_text}
                                </Text>

                                }


                            </View>


                        </View>
                        <View style={styles.add_pet_care_item}>
                            <View style={styles.add_pet_care_item_title_box}>
                                <Text style={styles.add_pet_care_item_title}>Дата</Text>
                            </View>
                            <View style={styles.inputWrapper}>


                                <View style={[styles.emptyInput, {top: 5, zIndex: 98}]}>
                                    <DatePicker
                                        style={[
                                            {width: 30, height: 30, fontWeight:"500"},

                                            // {borderWidth:1,borderColor: this.state.error_phone_code ? '#A4223C' : this.state.valid_phone_code ? '#337363' :  '#d9d9d9'  },

                                        ]}

                                        mode="date" //The enum of date, datetime and time
                                        // placeholder="select date"
                                        format="DD-MM-YYYY"
                                        minDate="01-01-1940"
                                        maxDate="30-12-2022"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                            dateIcon: {
                                                // display: 'none',
                                                position: 'absolute',
                                                // right: 0,
                                                // top: 4,
                                                // marginLeft: 0,
                                                zIndex: 56,

                                            },
                                            dateInput: {
                                                // flex:1,
                                                // backgroundColor:'white',
                                                display: 'none',
                                                // textAlign:'left'
                                                position: 'absolute',

                                                width: 0,
                                                height: 0
                                            },
                                            datePicker: {
                                                backgroundColor: "#b56422",

                                            },

                                        }}
                                        onDateChange={(date) => {
                                            this.dateBirth(date);
                                        }}
                                        textColor="black"
                                        isDarkModeEnabled='true'
                                        iconComponent={// 设置之后 iconSource 失效 且 icon 不能改变位置
                                            <Svg
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"


                                            >
                                                <Path
                                                    d="M2 7.5V19a4 4 0 004 4h12a4 4 0 004-4V7.5m-20 0v0A3.5 3.5 0 015.5 4h1M2 7.5h20m0 0v0A3.5 3.5 0 0018.5 4h-1m-11 0V.5m0 3.5h11m0 0V.5"
                                                    stroke="#b56422"
                                                    strokeLinecap="round"
                                                />
                                            </Svg>
                                        }
                                    />
                                </View>

                                <TextInput
                                    value={this.state.edit_birth}
                                    editable={false}
                                    style={[styles.datepicker_input,

                                        // {
                                        //     borderWidth: 1,
                                        //     borderColor: this.state.name_field_error ? '#A4223C' : this.state.name_field_valid ? '#337363' : '#d9d9d9'
                                        // },

                                    ]}

                                    placeholder="День роджения"
                                    placeholderTextColor="#b56422"
                                />

                                {this.state.edit_birth_error &&

                                <Text style={styles.error_text}>
                                    {this.state.edit_birth_error_text}
                                </Text>

                                }


                                {/*<Text style={styles.inp_buttom_label}>*/}
                                {/*    Выберите дату вашего рождения*/}
                                {/*</Text>*/}


                            </View>





                        </View>

                        <View style={styles.add_pet_care_item}>
                            <View style={styles.add_pet_care_item_title_box}>
                                <Text style={styles.add_pet_care_item_title}>Описание</Text>
                            </View>
                            <TextInput
                                style={[styles.message_input]}
                                onChangeText={(val) => this.setState({messageInput: val})}
                                value={this.state.messageInput}
                                placeholder="Описание"
                                placeholderTextColor="#b56422"

                            />


                        </View>




                    </ScrollView>

                </LinearGradient>


            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff',
        position: 'relative'

    },


    add_pets_items_wrapper: {
        width: "100%",
        paddingBottom: 50,
        flex: 1
    },

    menuItem: {
        width: '100%',
        height: 48,
        paddingLeft: 25,
        flexDirection: 'row',
        alignItems: 'center'
    },

    toptext: {
        fontSize: 20,
        color: "#b56422",
        fontWeight: 'bold'
    },
    pet_care_items_scrollView: {
        flex: 1,
        height: "100%",
        width: "100%",

    },


    top_panel: {
        backgroundColor: 'white',
        width: '100%',
        height: 56,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',

    },



    back_to_pets_page_btn: {
        marginRight: 20,
    },

    add_pet_care_item_title_box: {
        backgroundColor: "#bd9a82",
        shadowColor: "#b56422",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.05,
        shadowRadius: 20,

        elevation: 8,
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 5,
        marginBottom: 10,
    },

    add_pet_care_item_title: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#ffffff',
    },
    add_pet_input: {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 17,
        backgroundColor: '#ffffff',
        fontSize: 14,
        color: '#b56422',
        fontWeight: '500',
        borderRadius: 5,

    },
    emptyInput:{
        position: 'absolute',
        zIndex: 5,
        alignSelf: 'center',
        top: 12,
        right: 12,
    },
    datepicker_input: {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 17,
        backgroundColor: '#ffffff',
        fontSize: 14,
        color: '#b56422',
        fontWeight: '500',
        borderRadius: 5,

    },

    message_input: {
        width: "100%",
        backgroundColor: "#ffffff",
        paddingTop: 15,
        paddingBottom: 100,
        paddingHorizontal: 20,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        color: "#b56422",
        fontWeight: '500',
        borderRadius: 5,

    },
    add_pet_care_items_scrollView: {
        flex: 1,
        height: "100%",
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 30,

    },

    add_pet_care_item: {
        marginBottom: 25,
        width: "100%",
    }


});

