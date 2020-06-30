import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import * as actions from '../reducer/actions'

const Feedback = props => {
    const [fio, setFIO] = useState('')
    const [mail, setMAIL] = useState('')
    const [text, setTEXT] = useState('')

    return (
        <ScrollView>
            <View style={styles.feedbackWrapper}>
                <Text style={{ color: "#a0a0a0" }}>❗В целях объективного и всестороннего рассмотрения вашего обращения в установленные сроки, необходимо в тексте обращения указывать адрес описанного вами места действия, факта или события, а также можно указать телефон для возможного уточнения содержания вашего обращения.</Text>
                <TextInput style={styles.textInpit}
                    placeholder="ФИО"
                    onChangeText={fio => setFIO(fio)}
                    defaultValue={fio}
                />
                <TextInput style={styles.textInpit}
                    placeholder="e-mail"
                    onChangeText={mail => setMAIL(mail)}
                    defaultValue={mail}
                />
                <TextInput style={[styles.textInpit, { height: 200 }]}
                    placeholder="Текст вашего обращения"
                    multiline
                    onChangeText={text => setTEXT(text)}
                    defaultValue={text}
                />
                <View style={styles.feedbackButton}>
                    <Button title='📫 Отправить' onPress={() => actions.sendMessage([fio, mail, text])} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    feedbackWrapper: {
        padding: 10
    },
    textInpit: {
        marginTop: 10,
        borderColor: '#ccc',
        borderWidth: 2,
        borderRadius: 5,
        height: 50,
        padding: 10,
        textAlignVertical: "top",
        fontSize: 20,

    },
    feedbackButton: {
        paddingTop: 50
    }
})

export default Feedback