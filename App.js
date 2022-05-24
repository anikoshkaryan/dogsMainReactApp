import * as React from 'react';
import {StatusBar} from 'expo-status-bar';

import {ActivityIndicator, Dimensions, StyleSheet, Text, View} from 'react-native';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import LoginComponent from './components/auth/login';
import RegisterComponent from './components/auth/register';
import DogsBreedsComponent from './components/dogsBreeds/dogsBreeds';
import DogFoodComponent from './components/dogFood/dogFood';
import QuestionsComponent from './components/questions/questions'
import QuestionsDogsComponent from './components/questions/questionsDogs'
import DogsBreedsSinglePageComponent from './components/dogsBreedsSinglePage/dogsBreedsSinglePage';
import DogsFoodSinglePageComponent from './components/dogsFoodSinglePage/dogsFoodSinglePage';
import QuestionsSingleDogsComponent from './components/questions/questionsSingleDogs';
import MyPetsComponent   from './components/myPets/my_pets';
import AddPetsComponent   from './components/add_pets/add_pets';
import  AddPetSinglePageComponent from './components/add_pet_single_page/add_pet_single_page';
import  PetCareComponent from './components/PetCare/pet_care';
import  AddPetCareComponent from './components/addPetCare/add_pet_care';


import {AuthContext} from "./components/AuthContext/context";
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'


function LoginScreen({navigation}) {
    return (
        <LoginComponent navigation={navigation}/>
    );
}


function RegisterScreen({navigation}) {
    return (
        <RegisterComponent navigation={navigation}/>
    );
}

function DogsBreedsScreen({navigation}) {
    return (
        <DogsBreedsComponent navigation={navigation}/>
    );
}


function DogFoodScreen({navigation}) {
    return (
        <DogFoodComponent navigation={navigation}/>
    );
}


function DogsBreedsSinglePageScreen({route, navigation}) {

    const {params} = route.params;

    return (
        <DogsBreedsSinglePageComponent dog_info={params} navigation={navigation}/>
    );
}

function DogsFoodSinglePageScreen({route, navigation}) {
    const {params} = route.params;
    return (
        <DogsFoodSinglePageComponent dogs_food_info={params} navigation={navigation}/>
    );
}

function QuestionsScreen({navigation}) {
    return (
        <QuestionsComponent navigation={navigation}/>
    );
}

function QuestionsDogsScreen({route, navigation}) {
    const {dog_info} = route.params
    return (
        <QuestionsDogsComponent dog_info={dog_info} navigation={navigation}/>
    );
}

function QuestionsSingleDogsScreen({route, navigation}) {
    const {params} = route.params
    return (
        <QuestionsSingleDogsComponent all_dogs={params} navigation={navigation}/>
    );
}

function MyPetsScreen ({ navigation}) {
    // const {params} = route.params
    return (
        <MyPetsComponent navigation={navigation}/>
    );
}

function AddPetsScreen ({ navigation}) {
    // const {params} = route.params
    return (
        <AddPetsComponent navigation={navigation}/>
    );
}

function AddPetSinglePageScreen ({ navigation}) {
    // const {params} = route.params
    return (
        <AddPetSinglePageComponent navigation={navigation}/>
    );
}


function PetCareScreen ({ navigation}) {
    // const {params} = route.params
    return (
        <PetCareComponent navigation={navigation}/>
    );
}


function AddPetCareScreen ({ navigation}) {
    // const {params} = route.params
    return (
        <AddPetCareComponent navigation={navigation}/>
    );
}

const tabBarStyle = {
    height: 90,
    backgroundColor: 'white',
    elevation: 0,
    borderTopColor: 'white',
    width: Dimensions.get('window').width - 50,
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
}

export default function App() {
    const popAction = StackActions.pop(1);

    const [isLoading, setIsLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(null);

    const initialLoginState = {
        isLoading: true,
        userEmail: null,
        userToken: null,
    };

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userEmail: action.email,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
        }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContext = React.useMemo(() => ({
        signIn: async (foundUser) => {
            // setIsLoading(true);
            const userToken = String(foundUser.token);
            const userEmail = foundUser.email;
            // setUserToken(userToken);

            //  console.log('AuthUser', foundUser);

            try {
                await AsyncStorage.setItem('userToken', userToken);
            } catch (e) {
                console.log(e);
            }
            dispatch({type: 'LOGIN', email: userEmail, token: userToken});
        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem('userToken');
                setIsLoading(false);

            } catch (e) {
                console.log(e);
            }
            dispatch({type: 'LOGOUT'});
        },
        signUp: () => {
            // setIsLoading(false);
        }
    }), []);


    // Проверка при входе в приложение.

    React.useEffect(() => {
        setTimeout(async () => {

            let userToken;
            userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken');
                setIsLoading(false);

            } catch (e) {
                console.log(e);
            }
            dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
        }, 1000);
    }, []);



    if( isLoading ) {
        return(
            <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center', backgroundColor: 'white'}}>
                <ActivityIndicator size="large" color="0078D2"/>
            </View>
        );
    }

    return (

        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {loginState.userToken !== null ?
                    (
                        <Stack.Navigator
                            initialRouteName='DogsBreeds'
                            screenOptions={{
                                tabBarShowLabel: false,
                                headerShown: false,
                                tabBarActiveTintColor: '#2EB6A5',
                                tabBarInactiveTintColor: 'gray',
                            }}

                        >
                            <Stack.Screen name="DogsBreeds" component={DogsBreedsScreen}
                                          options={({route}) => ({
                                              tabBarButton: () => null,
                                              tabBarStyle: {display: 'none'},
                                          })}
                            />

                            <Stack.Screen name="DogFood" component={DogFoodScreen}
                                          options={({route}) => ({
                                              tabBarButton: () => null,
                                              tabBarStyle: {display: 'none'},
                                          })}
                            />

                            <Stack.Screen name="DogsBreedsSinglePage" component={DogsBreedsSinglePageScreen}
                                          options={({route}) => ({
                                              tabBarButton: () => null,
                                              tabBarStyle: {display: 'none'},
                                          })}
                            />

                            <Stack.Screen name="DogsFoodSinglePage" component={DogsFoodSinglePageScreen}
                                          options={({route}) => ({
                                              tabBarButton: () => null,
                                              tabBarStyle: {display: 'none'},
                                          })}
                            />

                            <Stack.Screen name="Questions" component={QuestionsScreen}
                                          options={({route}) => ({
                                              tabBarButton: () => null,
                                              tabBarStyle: {display: 'none'},
                                          })}
                            />
                            <Stack.Screen name="QuestionsDogs" component={QuestionsDogsScreen}
                                          options={({route}) => ({
                                              tabBarButton: () => null,
                                              tabBarStyle: {display: 'none'},
                                          })}
                            />
                            <Stack.Screen name="QuestionsSingleDogs" component={QuestionsSingleDogsScreen}
                                          options={({route}) => ({
                                              tabBarButton: () => null,
                                              tabBarStyle: {display: 'none'},
                                          })}
                            />
                            <Stack.Screen name="MyPets" component={MyPetsScreen}
                                          options={({route}) => ({
                                              tabBarButton: () => null,
                                              tabBarStyle: {display: 'none'},
                                          })}
                            />

                            <Stack.Screen name="AddPets" component={AddPetsScreen}
                                          options={({route}) => ({
                                              tabBarButton: () => null,
                                              tabBarStyle: {display: 'none'},
                                          })}
                            />

                            <Stack.Screen name="AddPetSinglePage" component={AddPetSinglePageScreen}
                                          options={({route}) => ({
                                              tabBarButton: () => null,
                                              tabBarStyle: {display: 'none'},
                                          })}
                            />

                            <Stack.Screen name="PetCare" component={PetCareScreen}
                                          options={({route}) => ({
                                              tabBarButton: () => null,
                                              tabBarStyle: {display: 'none'},
                                          })}
                            />
                            <Stack.Screen name="AddPetCare" component={AddPetCareScreen}
                                          options={({route}) => ({
                                              tabBarButton: () => null,
                                              tabBarStyle: {display: 'none'},
                                          })}
                            />


                        </Stack.Navigator>
                    )
                    :
                    <Stack.Navigator
                        initialRouteName='Login'
                        screenOptions={({route}) => ({
                            tabBarShowLabel: false,
                            headerShown: false,
                            tabBarActiveTintColor: '#2EB6A5',
                            tabBarInactiveTintColor: 'gray',
                            tabBarStyle: tabBarStyle,
                        })}>

                        <Stack.Screen name="Login" component={LoginScreen}
                                      options={({route}) => ({
                                          tabBarButton: () => null,
                                          tabBarStyle: {display: 'none'},
                                      })}
                        />

                        <Stack.Screen name="Register" component={RegisterScreen}
                                      options={({route}) => ({
                                          tabBarButton: () => null,
                                          tabBarStyle: {display: 'none'},
                                      })}
                        />
                    </Stack.Navigator>
                }
            </NavigationContainer>

        </AuthContext.Provider>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },


});
