import React from 'react'
import { ScrollView, Text, View, StyleSheet, Platform, ActivityIndicator, Linking } from 'react-native'
import { WebView } from 'react-native-webview'


const Post = props => {

    let info = props.route.params.info

    props.navigation.setOptions({
        headerTitle: info.title
    })

    const RemoveTabs = (text) => {
        text = text.replace(/\n+/g, '\n');
        return text
    }

    const injectedJavaScript = `
        let meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
        let style = document.createElement('style');
        style.innerHTML = '.footer, .news-full__share, .news-full__footer, .uSocial-Share, .page-nav, .header, #panel {display: none;}';
        document.head.appendChild(style);
        true;
    `



    function ActivityIndicatorLoadingView() {
        return (
            <ActivityIndicator
                color="#00185c"
                size="large"
                style={styles.ActivityIndicatorStyle}
            />
        );
    }
    let refWeb = null
    return (
        <WebView
            source={{ uri: info.link }}
            startInLoadingState
            ref={webView => { refWeb = webView; }}
            useWebKit
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            originWhitelist={['*']}
            javaScriptEnabled={true}
            scalesPageToFit={true}
            onError={() => console.log('err')}
            onMessage={(event) => { }}
            injectedJavaScript={injectedJavaScript}
            renderLoading={ActivityIndicatorLoadingView}
            onNavigationStateChange={event => {
                if(!event.url.includes('digital.orb.ru')) {
                    Linking.openURL(event.url)
                }
            }}
        />
        // <ScrollView>

        //     <View style={styles.postWrapper}>
        //         <Text style={styles.postTitle}>{info.title}</Text>
        //         <Text style={styles.postDate}>{info.date}</Text>
        //         <Text style={styles.postText}>{RemoveTabs(info.text)}</Text>
        //     </View>
        // </ScrollView>
    )
}

const styles = StyleSheet.create({
    postWrapper: {
        padding: 10,
        maxWidth: Platform.OS === 'web' ? 700 : null,
        alignSelf: Platform.OS === 'web' ? 'center' : null
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
    },
    postText: {
        fontSize: 14
    },
    ActivityIndicatorStyle: {
        flex: 1,
        position: 'absolute',
        backgroundColor: 'white',
        width: '100%',
        height: '100%'
    }
})

export default Post    