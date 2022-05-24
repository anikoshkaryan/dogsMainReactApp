import React, {Component} from 'react';
import Svg, {Path, Rect, Circle, Defs, Stop} from "react-native-svg";
import {LinearGradient} from 'expo-linear-gradient';
// import {TextInput} from "react-native-paper";
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-datepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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

            selectedGender: null,
            error_gender: false,
            valid_gender: false,
            error_gender_text: "",


            selectedPetBreed: null,
            error_pet_breed: false,
            valid_pet_breed: false,
            error_pet_breed_text: "",


            edit_birth: '',
            edit_birth_error: false,
            edit_birth_valid: false,
            edit_birth_error_text: '',

            selectedSterilizedPet: null,
            error_sterilized_pet: false,
            valid_sterilized_pet: false,
            error_sterilized_pet_text: "",


            selectedPetColor: null,
            error_pet_color: false,
            valid_pet_color: false,
            error_pet_color_text: "",

            messageInput: null,
        };


    }
    static contextType = AuthContext
    componentDidMount() {
        // this.handleGetDogsList().then(e => console.log(e))
    }

    redirectToMyPets = () => {
        this.props.navigation.navigate("MyPets");
    }




    clearNameInput = () => {
        this.setState({
            name_field: '',
            name_field_error:false,
        })
    }
    changeRegisterName = (name_field) => {
        this.setState({
            name_field: name_field,
        })


        if (name_field == "") {
            this.setState({
                name_field_error:false,
                name_field_valid: false,
            })
        } else {

            this.setState({
                name_field_error:false,
                name_field_valid: true,
            })


        }

    }

    onBlurRegisterName = () => {

    }

    chooseGender = (item) => {
        this.setState({
            selectedGender: item.value,
            error_gender: false,
            valid_gender: true
        })

    }


    choosePetBreed = (item) => {
        this.setState({
            selectedPetBreed: item.value,
            error_pet_breed: false,
            valid_pet_breed: true,
        })
    }

    chooseSterilizedPet = (item) => {
        this.setState({
            selectedSterilizedPet: item.value,
            error_sterilized_pet: false,
            valid_sterilized_pet: true,
        })
    }

    choosePetColor = (item) => {
        this.setState({
            selectedPetColor: item.value,
            error_pet_color: false,
            valid_pet_color: true,
        })
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
                                          onPress={() => {this.redirectToMyPets()}}
                        >
                            <Svg
                                width={26}
                                height={26}
                                viewBox="0 0 18 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"

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
                            Добавить питомца
                        </Text>


                </View>

                {/*TOP PANEL END*/}



                <LinearGradient colors={['#E1C1B7', '#FFFFFF']} style={styles.add_pets_items_wrapper}>

                    <KeyboardAwareScrollView style={styles.add_pets_items_scrollView}>


                        <View style={styles.add_pets_img_btn_wrapper}>
                            <View style={styles.add_pets_img_wrapper}>

                                <Image style={styles.add_pets_img} source={require('../../assets/images/pet_img.png')} />

                            </View>

                            <TouchableOpacity style={styles.add_pets_img_btn}>
                                <Svg
                                    width={35}
                                    height={35}
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 528.899 528.899"
                                    xmlSpace="preserve"
                                    enableBackground="new 0 0 528.899 528.899"
                                    fill="#b56422"

                                >
                                    <Path d="M328.883 89.125l107.59 107.589-272.34 272.34L56.604 361.465l272.279-272.34zm189.23-25.948l-47.981-47.981c-18.543-18.543-48.653-18.543-67.259 0l-45.961 45.961 107.59 107.59 53.611-53.611c14.382-14.383 14.382-37.577 0-51.959zM.3 512.69c-1.958 8.812 5.998 16.708 14.811 14.565l119.891-29.069L27.473 390.597.3 512.69z" />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.add_pets_main_input_wrapper}>
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
                                    placeholderTextColor="#c9a477"
                                />

                                {this.state.name_field_error &&

                                <Text style={styles.error_text}>
                                    {this.state.name_field_error_text}
                                </Text>

                                }


                            </View>
                            <View style={styles.gender_dropdown_wrapper}>
                                <Dropdown
                                    style={[
                                        styles.gender_dropdown,

                                        // {
                                        //     borderWidth: 1,
                                        //     borderColor: this.state.error_gender ? '#A4223C' : this.state.valid_gender ? '#337363' : 'transparent'
                                        // },

                                    ]}
                                    data={
                                        [
                                            {label: "Женщина", value: "Женщина"},
                                            {label: "Мужчина", value: "Мужчина"},

                                        ]

                                    }
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle="#b56422"
                                    placeholder={"Пол"}
                                    maxHeight={150}
                                    labelField="label"
                                    valueField="value"
                                    value={this.state.selectedGender}

                                    onChange={item => {
                                        this.chooseGender(item);
                                    }}
                                />
                                {this.state.error_gender &&

                                <Text style={styles.error_text}>
                                    {this.state.error_gender_text}
                                </Text>

                                }

                            </View>
                            <View style={styles.pet_breeds_dropdown_wrapper}>
                                <Dropdown
                                    style={[
                                        styles.pet_breeds_dropdown,

                                        // {
                                        //     borderWidth: 1,
                                        //     borderColor: this.state.error_pet_breed ? '#A4223C' : this.state.valid_pet_breed ? '#337363' : 'transparent'
                                        // },

                                    ]}
                                    data={
                                        [
                                            {label: "Бульдог", value: "Бульдог"},
                                            {label: "Хаски", value: "Хаски"},
                                            {label: "Чихуахуа", value:"Чихуахуа"},
                                            {label: "Овчарка", value:"Овчарка"},

                                        ]

                                    }
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    placeholder={"Парода"}
                                    maxHeight={150}
                                    labelField="label"
                                    valueField="value"
                                    value={this.state.selectedPetBreed}

                                    onChange={item => {
                                        this.choosePetBreed(item);
                                    }}
                                />
                                {this.state.error_pet_breed &&

                                <Text style={styles.error_text}>
                                    {this.state.error_pet_breed_text}
                                </Text>

                                }

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
                                    placeholderTextColor="#c9a477"
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


                            <View style={styles.about_sterilization_dropdown_wrapper}>
                                <Dropdown
                                    style={[
                                        styles.about_sterilization_dropdown,

                                        // {
                                        //     borderWidth: 1,
                                        //     borderColor: this.state.error_sterilized_pet ? '#A4223C' : this.state.valid_sterilized_pet ? '#337363' : 'transparent'
                                        // },

                                    ]}
                                    data={
                                        [
                                            {label: "Стрилизованная", value: "Стрилизованная"},
                                            {label: "Не стирилизованная", value: "Не стирилизованная"},


                                        ]

                                    }
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    placeholder={"Стерилизация"}
                                    maxHeight={150}
                                    labelField="label"
                                    valueField="value"
                                    value={this.state.selectedSterilizedPet}

                                    onChange={item => {
                                        this.chooseSterilizedPet(item);
                                    }}
                                />
                                {this.state.error_sterilized_pet &&

                                <Text style={styles.error_text}>
                                    {this.state.error_sterilized_pet_text}
                                </Text>

                                }

                            </View>

                            <View style={styles.pets_colors_dropdown_wrapper}>
                                <Dropdown
                                    style={[
                                        styles.pets_colors_dropdown,

                                        // {
                                        //     borderWidth: 1,
                                        //     borderColor: this.state.error_pet_color ? '#A4223C' : this.state.valid_pet_color ? '#337363' : 'transparent'
                                        // },

                                    ]}
                                    data={
                                        [
                                            {label: "Черный", value: "Черный"},
                                            {label: "Белый", value: "Белый"},
                                            {label: "Красный", value: "Красный"},
                                            {label: "Серый", value: "Серый"},
                                            {label: "Золотистый", value: "Золотистый"},
                                            {label: "Кремовый", value: "Кремовый"},



                                        ]

                                    }
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    placeholder={"Цвет"}
                                    maxHeight={150}
                                    labelField="label"
                                    valueField="value"
                                    value={this.state.selectedPetColor}

                                    onChange={item => {
                                        this.choosePetColor(item);
                                    }}
                                />
                                {this.state.error_pet_color &&

                                <Text style={styles.error_text}>
                                    {this.state.error_pet_color_text}
                                </Text>

                                }

                            </View>



                            <TextInput
                                style={[styles.review_input]}
                                onChangeText={(val) => this.setState({reviewInput: val})}
                                value={this.state.reviewInput}
                                placeholder="Описание"
                                placeholderTextColor="#c9a477"

                            />


                            </View>

                    </KeyboardAwareScrollView>

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
        paddingVertical: 50,
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
    add_pets_items_scrollview: {
        flex: 1,
        height: "100%",
        width: "100%",

    },


    top_panel: {
        backgroundColor: 'white',
        width: '100%',
        height: 56,
        paddingLeft: 12,
        paddingRight: 12,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',

    },


    back_to_pets_page_btn: {
        marginRight: 20,
    },

    add_pets_img_btn_wrapper: {
        backgroundColor: "#FFFFFF",
        shadowColor: "#b56422",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.05,
        shadowRadius: 20,

        elevation: 8,
        borderRadius: 12,
        width: "80%",
        alignSelf: 'center',
        padding: 20,
        marginBottom: 20,

    },




    add_pets_img: {
        width: 150,
        height: 150,
    },

    add_pets_img_wrapper: {
        alignItems: "center",
        justifyContent: "center",
    },

    add_pets_img_btn: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    inputWrapper: {
        width:'100%',
        marginBottom: 10,
    },

    input: {
        width:'100%',
        height: 50,
        backgroundColor: '#ffffff',
        fontSize:15,
        color:'#000000',
        borderRadius:4,
        paddingHorizontal:14,
        borderColor: "#d9d9d9",
        borderWidth: 1,
        fontWeight: "bold",

    },
    emptyInput:{
        position: 'absolute',
        zIndex: 5,
        alignSelf: 'center',
        top: 12,
        right: 12,
    },

    gender_dropdown_wrapper: {
        width: "100%",
        marginBottom: 10,
    },

    gender_dropdown: {
        width: "100%",
        height: 50,
        paddingHorizontal: 15,
        paddingVertical: 17,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        fontSize:15,
        color:'#c9a477',
        fontWeight: "bold",


    },

    pet_breeds_dropdown_wrapper: {
        width: "100%",
        marginBottom: 10,
    },

    pet_breeds_dropdown: {
        width: "100%",
        height: 50,
        paddingHorizontal: 15,
        paddingVertical: 17,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        fontSize:15,
        color:'#c9a477',
        fontWeight: "bold",


    },

    placeholderStyle: {
        fontSize: 13,
        color: "#c9a477",
        fontWeight: "500",
    },

    selectedTextStyle: {
        fontSize: 15,
        color:'#c9a477',
        fontWeight: "bold",
    },

    inputSearchStyle: {
        height: 40,
        fontSize: 15,
    },

    about_sterilization_dropdown: {
        width: "100%",
        height: 50,
        paddingHorizontal: 15,
        paddingVertical: 17,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        fontSize:15,
        color:'#c9a477',
        fontWeight: "bold",

    },

    about_sterilization_dropdown_wrapper: {
        width: "100%",
        marginBottom: 10,
    },

    pets_colors_dropdown: {
        width: "100%",
        height: 50,
        paddingHorizontal: 15,
        paddingVertical: 17,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        fontSize:15,
        color:'#c9a477',
        fontWeight: "bold",

    },

    pets_colors_dropdown_wrapper: {
        width: "100%",
        marginBottom: 10,
    },

    review_input: {
        width: "100%",
        backgroundColor: "#ffffff",
        paddingTop: 15,
        paddingBottom: 100,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 16,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        color: "#c9a477",
        fontWeight: '500'
    },

    add_pet_input: {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 17,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        fontSize: 14,
        color: '#c9a477',
        fontWeight: '500',
        marginBottom: 10
    },
    datepicker_input: {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 17,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        fontSize: 14,
        color: '#c9a477',
        fontWeight: '500',
    },
    add_pets_main_input_wrapper: {
        paddingHorizontal: 20,
    }

});

