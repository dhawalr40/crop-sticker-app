import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import {useState, useRef} from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import * as MediaLibrary from 'expo-media-library';
import domtoimage from 'dom-to-image';

import ImageViewer from "./components/ImageViewer";
import Button from './components/Button';
import CircleButton from "./components/CircleButton";
import IconButton from "./components/IconButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from './components/EmojiSticker';
import { captureRef } from 'react-native-view-shot';

const PlaceholderImage = require('./assets/abc.jpg')

export default function App() {

    const [status, requestPermission] = MediaLibrary.usePermissions();
    const [selectedImage, setSelectedImage] = useState(null);
    const [showAppOptions, setShowAppOptions] = useState(false);
    const [isModelVisible, setIsModelVisible] = useState(false);
    const [pickedEmoji, setPickedEmoji] = useState(null);
    const imageRef = useRef();

    if (status === null) {
        requestPermission();
    }

    const pickImageAsync = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if(!result.canceled){
            setSelectedImage(result.assets[0].uri);
            setShowAppOptions(true);
            console.log(result);
        }
        else {
            alert("u did not select any image");
        }
    };

    const onRest = () => {
        setShowAppOptions(false);
    }

    const onAddSticker = () => { setIsModelVisible(true); };
    const onModelclose = () => { setIsModelVisible(false); };
    const onSaveImageAsync = async () => {
        if (Platform.OS !== 'web') {
            try {
                const localUri = await captureRef(imageRef, {
                    quality: 1,
                });
                await MediaLibrary.saveToLibraryAsync(localUri);
                if (localUri) {
                    alert("Saved!");
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                const dataUrl = await domtoimage.toJpeg(imageRef.current, {
                    quality: 0.95,
                    width: 320,
                    height: 440,
                });

                let link = document.createElement('a');
                link.download = 'sticker-smash.jpeg';
                link.href = dataUrl;
                link.click();
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                <View ref={imageRef} collapsable={false} style={styles.imageContainer}>
                    <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage}/>
                    {pickedEmoji && <EmojiSticker imageSize={200} stickerSource={pickedEmoji} />}
                </View>
                {showAppOptions ? (
                    <View style={styles.optionsContainer}>
                        <View style={styles.optionsRow}>
                            <IconButton icon="refresh" onPress={onRest} label="Reset"/>
                            <CircleButton onPress={onAddSticker} />
                            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync}/>
                        </View>
                    </View>
                ) : (
                    <View style={styles.footerContainer}>
                        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync}/>
                        <Button label="Use this pic" onPress={() => setSelectedImage(true)}/>
                    </View>
                )}
                <EmojiPicker isVisible={isModelVisible} onClose={onModelclose}>
                    <EmojiList onSelect={setPickedEmoji} onCloseModal={onModelclose} />
                </EmojiPicker>
                <StatusBar style="light"/>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
    imageContainer: {
        flex: 1,
        paddingTop: 58,
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center',
    },
    optionsContainer: {
        position: 'absolute',
        bottom: 80,
    },
    optionsRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
});
