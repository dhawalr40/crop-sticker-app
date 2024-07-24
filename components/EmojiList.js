import {useState} from "react";
import {StyleSheet, FlatList, Image, Platform, Pressable} from 'react-native';

export default function EmojiList({onSelect, onCloseModal}) {
    const [emoji] = useState([
        require('../assets/img/emoji1.png'),
        require('../assets/img/emoji2.png'),
        require('../assets/img/emoji3.png'),
        require('../assets/img/emoji4.png'),
        require('../assets/img/emoji5.png'),
        require('../assets/img/emoji6.png'),
    ]);

    return(
        <FlatList horizontal
                  showsHorizontalScrollIndicator={Platform.OS === 'web'}
                  data={emoji}
                  contentContainerStyle={styles.listContainer}
                  renderItem={ ({item, index}) => (
                      <Pressable onPress={() => {
                          onSelect(item);
                          onCloseModal();}}>
                          <Image style={styles.image} source={item}  key={index} />
                      </Pressable>
                  )} />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 20,
    },
});