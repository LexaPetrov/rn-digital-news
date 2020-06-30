import React, { useEffect, useReducer } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import reducer from '../reducer/reducer'
import * as actions from '../reducer/actions'

export default props => {
    const initialState = {
        news: []
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        actions.getNews(dispatch)
    }, [])

    return (
        <View style={styles.newsContainer}>
            <ScrollView>
                {
                    state.news.map((v, i) => {

                        return (
                            <View  key={i} style={[styles.shadow, styles.whiteBackground]}>
                                <TouchableOpacity>
                                    <View style={[styles.newsItem]}>
                                        <Text style={styles.newsTitle}>
                                            {v.title}
                                        </Text>
                                        <Image
                                            source={{
                                                uri: 'https://i.pinimg.com/736x/50/df/34/50df34b9e93f30269853b96b09c37e3b.jpg'
                                                // uri: v.img
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
            </ScrollView>
        </View>

    )
}


const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'black',
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .2,
        elevation: 3,
    },
    newsContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 50,
        paddingHorizontal: 10,
    },
    newsImage: {
        width: 320,
        height: 200,
    },
    newsItem: {
        padding: 5,
        overflow: "hidden"
    },
    newsTitle: {
        fontSize: 15,
        color: '#5fa9ee',
        fontWeight: 'bold',

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
        marginVertical:10,
        marginHorizontal:10
    }
})