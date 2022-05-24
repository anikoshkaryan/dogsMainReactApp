import React, {Component} from 'react';
import Svg, {Path, Rect, Circle, Defs, Stop} from "react-native-svg";
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

        };


    }
    static contextType = AuthContext
    componentDidMount() {
        // this.handleGetDogsList().then(e => console.log(e))
    }

    redirectToMyPets = () => {
        this.props.navigation.navigate("MyPets");
    }

    redirectToPetCarePage = () => {
        this.props.navigation.navigate('PetCare');
    }




    render() {

        return (
            <SafeAreaView style={styles.container}>

                {/*TOP PANEL START*/}

                <View style={styles.top_panel}>
                    <View style={styles.top_panel_child}>
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
                            Бульдог
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.pet_care_btn} onPress={() => {this.redirectToPetCarePage()}}>
                        <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width={26}
                            height={26}
                            viewBox="0 0 610.398 610.398"
                            xmlSpace="preserve"
                            enableBackground="new 0 0 610.398 610.398"
                            fill="#b56422"
                        >
                            <Path d="M159.567 0h-15.329c-1.956 0-3.811.411-5.608.995-8.979 2.912-15.616 12.498-15.616 23.997v51.613c0 2.611.435 5.078 1.066 7.44 2.702 10.146 10.653 17.552 20.158 17.552h15.329c11.724 0 21.224-11.188 21.224-24.992V24.992c0-13.804-9.5-24.992-21.224-24.992zM461.288 0h-15.329c-11.724 0-21.224 11.188-21.224 24.992v51.613c0 13.804 9.5 24.992 21.224 24.992h15.329c11.724 0 21.224-11.188 21.224-24.992V24.992C482.507 11.188 473.007 0 461.288 0z" />
                            <Path d="M539.586 62.553h-37.954v14.052c0 24.327-18.102 44.117-40.349 44.117h-15.329c-22.247 0-40.349-19.79-40.349-44.117V62.553H199.916v14.052c0 24.327-18.102 44.117-40.349 44.117h-15.329c-22.248 0-40.349-19.79-40.349-44.117V62.553H70.818c-21.066 0-38.15 16.017-38.15 35.764v476.318c0 19.784 17.083 35.764 38.15 35.764h468.763c21.085 0 38.149-15.984 38.149-35.764V98.322c.005-19.747-17.059-35.769-38.144-35.769zM527.757 557.9l-446.502-.172V173.717h446.502V557.9z" />
                            <Path d="M353.017 266.258h117.428c10.193 0 18.437-10.179 18.437-22.759s-8.248-22.759-18.437-22.759H353.017c-10.193 0-18.437 10.179-18.437 22.759 0 12.575 8.243 22.759 18.437 22.759zM353.017 348.467h117.428c10.193 0 18.437-10.179 18.437-22.759 0-12.579-8.248-22.758-18.437-22.758H353.017c-10.193 0-18.437 10.179-18.437 22.758 0 12.58 8.243 22.759 18.437 22.759zM353.017 430.676h117.428c10.193 0 18.437-10.18 18.437-22.759s-8.248-22.759-18.437-22.759H353.017c-10.193 0-18.437 10.18-18.437 22.759s8.243 22.759 18.437 22.759zM353.017 512.89h117.428c10.193 0 18.437-10.18 18.437-22.759 0-12.58-8.248-22.759-18.437-22.759H353.017c-10.193 0-18.437 10.179-18.437 22.759 0 12.579 8.243 22.759 18.437 22.759zM145.032 266.258H262.46c10.193 0 18.436-10.179 18.436-22.759s-8.248-22.759-18.436-22.759H145.032c-10.194 0-18.437 10.179-18.437 22.759.001 12.575 8.243 22.759 18.437 22.759zM145.032 348.467H262.46c10.193 0 18.436-10.179 18.436-22.759 0-12.579-8.248-22.758-18.436-22.758H145.032c-10.194 0-18.437 10.179-18.437 22.758.001 12.58 8.243 22.759 18.437 22.759zM145.032 430.676H262.46c10.193 0 18.436-10.18 18.436-22.759s-8.248-22.759-18.436-22.759H145.032c-10.194 0-18.437 10.18-18.437 22.759s8.243 22.759 18.437 22.759zM145.032 512.89H262.46c10.193 0 18.436-10.18 18.436-22.759 0-12.58-8.248-22.759-18.436-22.759H145.032c-10.194 0-18.437 10.179-18.437 22.759.001 12.579 8.243 22.759 18.437 22.759z" />
                        </Svg>
                    </TouchableOpacity>



                </View>

                {/*TOP PANEL END*/}



                <LinearGradient colors={['#E1C1B7', '#FFFFFF']} style={styles.add_pets_items_wrapper}>

                    <ScrollView style={styles.add_pets_items_scrollView}>

                        <View style={styles.add_pets_img_wrapper}>

                            <Image style={styles.add_pets_img} source={require('../../assets/images/dog_img1.jpg')} />

                        </View>
                        <View style={styles.add_pet_single_page_info_wrapper}>

                            <View style={styles.add_pet_single_page_info_item}>
                                <Text style={styles.add_pet_single_page_info_item_title}>Имя -</Text>
                                <Text style={styles.add_pet_single_page_info_item_text}>Бульдог</Text>
                            </View>

                            <View style={styles.add_pet_single_page_info_item}>
                                <Text style={styles.add_pet_single_page_info_item_title}>Пол -</Text>
                                <Text style={styles.add_pet_single_page_info_item_text}>Мужчина</Text>
                            </View>


                            <View style={styles.add_pet_single_page_info_item}>
                                <Text style={styles.add_pet_single_page_info_item_title}>Парода -</Text>
                                <Text style={styles.add_pet_single_page_info_item_text}>Бульдог</Text>
                            </View>

                            <View style={styles.add_pet_single_page_info_item}>
                                <Text style={styles.add_pet_single_page_info_item_title}>День роджения -</Text>
                                <Text style={styles.add_pet_single_page_info_item_text}>27-06-2020</Text>
                            </View>

                        </View>
                        <View style={styles.pet_medical_documents}>
                            <View style={styles.pet_medical_documents_icon_title_wrapper}>
                                <View style={styles.pet_medical_documents_icon}>
                                    <Svg
                                        width={30}
                                        height={30}
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 490.012 490.012"
                                        xmlSpace="preserve"
                                        enableBackground="new 0 0 490.012 490.012"
                                        fill="#b56422"

                                    >
                                        <Path d="M429.039 38.5h-84.3V20.8c0-11.4-9.4-20.8-20.8-20.8h-157c-11.4 0-20.8 9.4-20.8 20.8v17.7h-85.3c-5.5-.4-19.9 4.5-20.8 20.8v409.9c0 11.4 9.4 20.8 20.8 20.8h369.3c13.3.5 20.3-14.1 19.8-20.8V59.3c.5-4.8-4.4-20.2-20.9-20.8zm-241.3 3.1h116.5V77h-116.5V41.6zm221.6 407.8h-328.8V80.1h65.5v16.6c1.3 17.2 15.6 20.8 20.8 20.8h158.1c10.4 0 19.8-9.4 19.8-20.8V80.1h64.5v369.3h.1z" />
                                        <Path d="M170.039 328.7h149.8c11.4 0 20.8-9.4 20.8-20.8s-9.4-20.8-20.8-20.8h-149.8c-11.4 0-20.8 9.4-20.8 20.8s9.4 20.8 20.8 20.8zM322.939 366.2h-149.8c-11.4 0-20.8 9.4-20.8 20.8s9.4 20.8 20.8 20.8h149.8c10.4 0 19.8-9.4 20.8-20.8 0-11.4-9.3-20.8-20.8-20.8zM213.739 219.5h11.4V231c0 11.4 9.4 20.8 20.8 20.8s20.8-9.4 20.8-20.8v-11.4h11.4c11.4 0 20.8-9.4 20.8-20.8s-9.4-20.8-20.8-20.8h-11.4v-11.4c0-11.4-9.4-20.8-20.8-20.8s-20.8 9.4-20.8 20.8V178h-11.4c-11.4 0-20.8 9.4-20.8 20.8 0 11.3 9.3 20.7 20.8 20.7z" />
                                    </Svg>
                                </View>
                                <Text style={styles.pet_medical_documents_title}> Медицинские документы</Text>
                            </View>
                            <TouchableOpacity style={styles.add_pet_medical_documents_btn}  >
                                <Svg
                                    width={50} height={50}
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 490 490"
                                    xmlSpace="preserve"
                                    enableBackground="new 0 0 490 490"
                                    fill="#b56422"
                                >
                                    <Path d="M227.8 174.1v53.7h-53.7c-9.5 0-17.2 7.7-17.2 17.2s7.7 17.2 17.2 17.2h53.7v53.7c0 9.5 7.7 17.2 17.2 17.2s17.1-7.7 17.1-17.2v-53.7h53.7c9.5 0 17.2-7.7 17.2-17.2s-7.7-17.2-17.2-17.2h-53.7v-53.7c0-9.5-7.7-17.2-17.1-17.2s-17.2 7.7-17.2 17.2z" />
                                    <Path d="M71.7 71.7C25.5 118 0 179.5 0 245s25.5 127 71.8 173.3C118 464.5 179.6 490 245 490s127-25.5 173.3-71.8C464.5 372 490 310.4 490 245s-25.5-127-71.8-173.3C372 25.5 310.5 0 245 0 179.6 0 118 25.5 71.7 71.7zm384 173.3c0 56.3-21.9 109.2-61.7 149s-92.7 61.7-149 61.7S135.8 433.8 96 394s-61.7-92.7-61.7-149S56.2 135.8 96 96s92.7-61.7 149-61.7S354.2 56.2 394 96s61.7 92.7 61.7 149z" />
                                </Svg>
                            </TouchableOpacity>
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
        paddingVertical: 50,
        paddingHorizontal: 20,
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
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    top_panel_child: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },


    back_to_pets_page_btn: {
        marginRight: 20,
    },
    add_pets_img: {
        width: 250,
        height: 250,
        alignSelf: "center",
        borderRadius: 5,

    },

    add_pet_single_page_info_wrapper: {
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
        width: "100%",
        marginBottom: 10,
        padding: 20,
    },
    add_pets_img_wrapper: {
      marginBottom: 20,
    },
    add_pet_single_page_info_item: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 10,
    },
    add_pet_single_page_info_item_title: {
        fontWeight: "400",
        fontSize: 14,
        color: "#b56422",
       width: "50%",

    },
    add_pet_single_page_info_item_text: {
        fontWeight: "500",
        fontSize: 16,
        color: "#b56422",
        width: "50%",
    },
    pet_medical_documents_icon_title_wrapper: {
      flexDirection: "row",
        alignItems: "center",
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
        width: "100%",
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    pet_medical_documents_title: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#b56422",
        marginLeft: 10,
    },
    pet_medical_documents: {
        alignItems: "center",
        backgroundColor: "#c9a477bd",
        shadowColor: "#b56422",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.05,
        shadowRadius: 20,

        elevation: 8,
        borderRadius: 12,
        width: "100%",
        paddingBottom: 30,
    },
    add_pet_medical_documents_btn: {
      marginTop: 20,
    },

});

