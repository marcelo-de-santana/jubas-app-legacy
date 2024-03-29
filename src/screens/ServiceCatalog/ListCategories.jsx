import { useCatalog } from "../../contexts/catalog";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { global } from "../../components/styles/global";
import LoadingScreen from "../../components/LoadingScreen";
import { ModalCategory } from "../../components/ModalCategory";

export default function ListCategories({ navigation }) {
    const { specialties, setCategoryIndex, refreshPage } = useCatalog();

    const [modalParams, setModalParams] = useState({
        visible: false,
        data: {}
    });

    function changeScreen(routerName, arrayIndex) {
        setCategoryIndex(arrayIndex)
        navigation.push(routerName)
    }

    if (specialties.length === 0) {
        return (
            <LoadingScreen />
        );
    }

    function openModal(category) {
        setModalParams(prev => ({...prev, visible: true, data: category }))
    }

    return (
        <View style={global.container}>
            <ModalCategory modalParams={modalParams} setModalParams={setModalParams} />
            <View style={{ height: '94%' }}>
                {specialties.length === 0 ?
                    <View style={global.blueBoxItems}>
                        <Text style={global.whiteTextSmallCenter}>Nenhuma categoria disponível</Text>
                    </View>
                    :
                    <ScrollView>
                        <Text style={global.textHeader}>Categorias</Text>
                        {specialties.map((item, index) => (
                            <View key={item.category_id} style={global.blueBoxItems}>

                                <View style={global.boxFlexRow}>
                                    <Text style={global.whiteTextSmall}>{item.category_name}</Text>
                                    <TouchableOpacity onPress={() => openModal({
                                        categoryId: item.category_id,
                                        categoryName: item.category_name
                                    })}>
                                        <Text style={global.whiteTextSmall}>Editar</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={global.greyBoxItemsFlex} >
                                    <View>
                                        {item.services.map(serviceItem => (
                                            <Text key={serviceItem.service_id} style={global.darkBlueTextSmall}>{serviceItem.service_name ?? 'Nenhum serviço'}</Text>
                                        ))}
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => changeScreen('ListServices', [index])} >
                                    <Text style={global.whiteTextSmallVeryCenter}>Ver serviços</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                }
            </View>
            <TouchableOpacity style={global.button} onPress={() => openModal({})}>
                <Text style={global.textButton}>Adicionar Categoria</Text>
            </TouchableOpacity>
        </View>
    );
}
