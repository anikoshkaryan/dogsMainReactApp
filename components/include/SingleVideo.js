import * as ScreenOrientation from 'expo-screen-orientation'
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native'
import {Video, AVPlaybackStatus} from 'expo-av'
import {setStatusBarHidden} from 'expo-status-bar'
import React, {useRef, useState} from 'react'
import VideoPlayer from 'expo-video-player'

const App = (props) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [inFullscreen, setInFullsreen] = useState(false)
    const [inFullscreen2, setInFullsreen2] = useState(false)
    const refVideo = useRef(null)
    const refVideo2 = useRef(null)
    const refScrollView = useRef(null)


    return (
        <View style={styles.container}>
            <VideoPlayer
                ref={video}
                videoProps={{
                    resizeMode: Video.RESIZE_MODE_CONTAIN,
                    source: {
                        uri: props.video_url.url,
                    },
                }}
                fullscreen={{
                    visible: false,
                }}

                style={styles.video}
                onPlaybackStatusUpdate={status => setStatus(() => status)}
                activityIndicator={true}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1,
        justifyContent: 'center',

    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
    text: {
        marginTop: 36,
        marginBottom: 12,
    },
    video: {
        alignSelf: 'center',
        height: 240,
    },
})

export default App
