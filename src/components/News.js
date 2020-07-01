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
        dispatch({ type: 'REFRESHING_TRUE' })
        actions.getNews(dispatch)
        dispatch({ type: 'REFRESHING_FALSE' })
    }

    if (Platform.OS === 'web') {
        return (
            <ScrollView>
                <View style={styles.newsContainer}>
                    {
                        state.news.map((v, i) => {
                            return (
                                <View key={i} style={[styles.shadow, styles.whiteBackground]}>
                                    <TouchableOpacity onPress={() => onPress(v)}>
                                        <View style={[styles.newsItem]}>
                                            <Text style={styles.newsTitle} numberOfLines={1}>
                                                {v.title}
                                            </Text>
                                            <Image
                                                source={{
                                                    // uri: 'https://i.pinimg.com/736x/50/df/34/50df34b9e93f30269853b96b09c37e3b.jpg'
                                                    uri: v.img
                                                }}
                                                style={styles.newsImage}
                                            />
                                            <Text style={styles.newsDate}>
                                                {v.date}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            )
                        })
                    }
                </View>
            </ScrollView>
        )
    } else {
        return (
            <View style={styles.wrapper}>
                {
                    Platform.OS !== 'web' && state.news && <FlatList
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
}

News.navigationOptions = {
    headerTitle: 'Новости'
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: Platform.OS === 'web' ? 'row' : null,
        flexWrap: Platform.OS === 'web' ? 'wrap' : null,
    },
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
        minWidth: 300,
        maxWidth: Platform.OS === 'web' ? '100%' : null,
        justifyContent: "center",
        alignItems: 'center',
        paddingHorizontal: 0,
        display: Platform.OS === 'web' ? 'flex' : null,
        flexDirection: Platform.OS === 'web' ? 'row' : null,
        flexWrap: Platform.OS === 'web' ? 'wrap' : null,
    },
    newsImage: {
        minWidth: Platform.OS === 'web' ? '100%' : '100%',
        height: Platform.OS === 'web' ? 200 : 200,
    },
    newsItem: {
        minWidth: 300,
        padding: 5,
        overflow: "hidden"
    },
    newsTitle: {
        maxWidth: Platform.OS === 'web' ? 300 : '100%',
        minWidth: 300,
        fontSize: 16,
        color: '#00185c',
        fontWeight: 'bold',
        // width: Platform.OS === 'web' ? 730 : 320,
    },
    newsDate: {
        fontSize: 12,
        padding: 3,
        backgroundColor: 'black',
        color: 'white',
        borderRadius: 5,
        width: 150,
        marginTop: 2,
        overflow: "hidden",
        textAlign: "center"
    },
    whiteBackground: {
        backgroundColor: 'white',
        marginVertical: 10,
        marginHorizontal: 10,
    }
})

export default News