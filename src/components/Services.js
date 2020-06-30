import React from 'react'
import { View, StyleSheet, Linking, Button } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'


const Services = props => {

    const openURL = (url) => {
        Linking.openURL(url)
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.link}>
                    <Button  title='🙍‍♂️ Активный гражданин' onPress={() => openURL('https://ag.orb.ru/')} />
                </View>
                <View style={styles.link}>
                    <Button  title='🔐 Удостоверяющий центр' onPress={() => openURL('https://cit.orb.ru/ucit/')} />
                </View>
                <View style={styles.link}>
                    <Button  title='🖥 Услуги в цифровом виде' onPress={() => openURL('https://www.gosuslugi.ru/')} />
                </View>
                <View style={styles.link}>
                    <Button  title='💾 Информационные системы' onPress={() => openURL('http://smev.orb.ru/informacionnye-sistemy/')} />
                </View>
                <View style={styles.link}>
                    <Button  title='📈 Рейтинги ОМСУ' onPress={() => openURL('http://smev.orb.ru/statisticheskaya-informaciya/rating-omsu/')} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    link: {
        marginTop: 15
    }
})

export default Services