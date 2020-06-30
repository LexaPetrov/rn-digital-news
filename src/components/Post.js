import React from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'


const Post = props => {

    let info = props.route.params.info

    props.navigation.setOptions({
        headerTitle: info.title
    })

    const RemoveTabs = (text) => {
        text = text.replace(/\n+/g, '\n');
        return text
    }


    return (
        <ScrollView>
            <View style={styles.postWrapper}>
                <Text style={styles.postTitle}>{info.title}</Text>
                <Text style={styles.postDate}>{info.date}</Text>
                <Text>{RemoveTabs(info.text)}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    postWrapper: {
        padding: 10
    },
    postTitle: {
        fontWeight: "bold",
        fontSize: 18
    },
    postDate: {
        fontSize: 10,
        padding: 3,
        backgroundColor: 'black',
        color: 'white',
        borderRadius: 5,
        width: 140,
        marginTop: 2,
        overflow: "hidden",
        textAlign: "center"
    }
})

export default Post    