import { useEmployee } from "../../contexts/employee";
import { global } from "../../components/styles/global";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ModalTimetable } from "../../components/ModalEmployeeTimetable";
import LoadingScreen from "../../components/LoadingScreen";
import { useState } from "react";

export default function EmployeeTimetable() {
    const { barbersData, indexButton, loading } = useEmployee();
    const [modalParams, setModalParams] = useState({
        visible: false
    });

    function openModal(times) {
        setModalParams((prev) => ({ ...prev, visible: true, data: times, }));
    }
    if (loading) {
        return (
            <LoadingScreen />
        )
    }
    
    return (
        <View style={styles.container}>
            <ModalTimetable
                modalParams={modalParams}
                setModalParams={setModalParams}
            />
            <ScrollView style={styles.scroll}>
                <Text style={global.textHeaderMiddle}>
                    {barbersData[indexButton].barber_name}
                </Text>
                {
                    //VERIFICA SE O BARBEIRO POSSUI ALGUM HORÁRIO CADASTRADO PARA EXIBIR
                    (barbersData[indexButton].times[0].start_time) ? (
                        barbersData[indexButton].times.map((item, index) => (
                            <View style={styles.boxTimes} key={item.weekday}>
                                <View style={styles.boxHeader}>
                                    <Text style={styles.textHeader}>{item.weekday}</Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            openModal(barbersData[indexButton].times[index])
                                        }
                                    >
                                        <Text style={styles.textHeader}>Editar</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.boxDetails}>
                                    <Text style={styles.textDetails}>
                                        Entrada{"\n"}
                                        {item.start_time.slice(0, -3)}
                                    </Text>
                                    <Text style={styles.textDetails}>
                                        E. Inter.{"\n"}
                                        {item.start_interval.slice(0, -3)}
                                    </Text>
                                    <Text style={styles.textDetails}>
                                        R. Inter.{"\n"}
                                        {item.end_interval.slice(0, -3)}
                                    </Text>
                                    <Text style={styles.textDetails}>
                                        Saída{"\n"}
                                        {item.end_time.slice(0, -3)}
                                    </Text>
                                    <Text style={styles.textDetails}>
                                        Status{"\n"}
                                        {item.status == 1 ? "Ativo" : "Inativo"}
                                    </Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View style={global.blueBoxItems}>
                            <Text style={global.whiteTextSmallCenter}>
                                Lista de horários vazia
                            </Text>
                        </View>
                    )
                }
            </ScrollView>
            <TouchableOpacity
                style={styles.insertButton}
                onPress={() => openModal({ week: true })}
            >
                <Text style={styles.textInsertButton}>Inserir</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    scroll: {
        height: '90%'
    },
    textTitle: {
        color: "#000000",
        fontSize: 18,
    },
    boxTimes: {
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#9ba7bf',
        borderRadius: 6,
    },
    boxHeader: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    textHeader: {
        color: "#ffffff",
        fontSize: 16,
    },
    boxDetails: {
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: '#ccced9',
        borderRadius: 6,
    },
    textDetails: {
        color: "#161c26",
        fontSize: 14,
        textAlign: 'center'
    },
    insertButton: {
        backgroundColor: "#3c4659",
        borderRadius: 6,
        height: 40,
        justifyContent: "center",
    },
    textInsertButton: {
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center'
    }
})
