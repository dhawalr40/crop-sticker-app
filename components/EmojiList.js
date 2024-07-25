import {useState} from "react";
import {StyleSheet, FlatList, Image, Platform, Pressable} from 'react-native';

export default function EmojiList({onSelect, onCloseModal}) {
    const [emoji] = useState([
        require('../assets/img/file.png'),
        require('../assets/img/file (2).png'),
        require('../assets/img/file (3).png'),
        require('../assets/img/file (4).png'),
        require('../assets/img/file (5).png'),
        require('../assets/img/file (6).png'),
        require('../assets/img/file (7).png'),
        require('../assets/img/file (8).png'),
        require('../assets/img/file (1).png'),
        require('../assets/img/file (9).png'),
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