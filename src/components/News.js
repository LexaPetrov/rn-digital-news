import React, { useEffect, useReducer } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Platform, FlatList, SafeAreaView } from 'react-native'
import reducer from '../reducer/reducer'
import * as actions from '../reducer/actions'
const News = props => {
    const initialState = {
        news: [],
        refreshing: true
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        actions.getNews(dispatch)
    }, [])

    setTimeout(() => {
        if (state.news.length === 0) {
            actions.getNewsFromGithub(dispatch)
        }
    }, 5000)

    const onPress = (v) => {
        let info = {
            text: v.text,
            title: v.title,
            date: v.date
        }
        props.navigation.navigate('Post', { screen: 'Post', info, headerBackTitle: 'Назад' })
    }

    const handleRefresh = () => {
        dispatch({type: 'REFRESHING_TRUE'})
        actions.getNews(dispatch)
        dispatch({type: 'REFRESHING_FALSE'})
    }

    return (
        <View style={{flex: 1}}>
            {
                state.news && <FlatList
                        data={state.news.length !== 0 ? state.news : null}
                        renderItem={({ item }) => (
                            <View style={styles.newsContainer}>
                                <View style={[styles.shadow, styles.whiteBackground]}>
                                    <TouchableOpacity onPress={() => onPress(item)}>
                                        <View style={[styles.newsItem]}>
                                            <Text style={styles.newsTitle} numberOfLines={1}>
                                                {item.title}
                                            </Text>
                                            <Image
                                                source={{
                                                    // uri: 'https://i.pinimg.com/736x/50/df/34/50df34b9e93f30269853b96b09c37e3b.jpg'
                                                    uri: item.img
                                                }}
                                                style={styles.newsImage}
                                            />
                                            <Text style={styles.newsDate}>
                                                {item.date}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        keyExtractor={item => item.date}
                        refreshing={state.refreshing}
                        onRefresh={handleRefresh}
                    />
            }

        </View>
    )
}

News.navigationOptions = {
    headerTitle: 'Новости'
}


const styles = StyleSheet.create({
    loader: {
        backgroundColor: 'green',
        color: 'white',
        alignSelf: 'stretch',
        textAlign: 'center'
    },
    shadow: {
        shadowColor: 'black',
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .2,
        elevation: 3,
    },
    newsContainer: {
        justifyContent: "center",
        alignItems: 'center',
        paddingHorizontal: 0,
    },
    newsImage: {
        width: Platform.OS === 'web' ? 730 : 320,
        height: Platform.OS === 'web' ? 400 : 200,
    },
    newsItem: {
        padding: 5,
        overflow: "hidden"
    },
    newsTitle: {
        fontSize: 16,
        color: '#00185c',
        fontWeight: 'bold',
        width: Platform.OS === 'web' ? 730 : 320,
    },
    newsDate: {
        fontSize: 12,
        padding: 3,
        backgroundColor: 'black',
        color: 'white',
        borderRadius: 5,
        width: 140,
        marginTop: 2,
        overflow: "hidden",
        textAlign: "center"
    },
    whiteBackground: {
        backgroundColor: 'white',
        marginVertical: 10,
        marginHorizontal: 10
    }
})

export default News