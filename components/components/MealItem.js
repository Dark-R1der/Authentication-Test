import { 
    View,
    Pressable, 
    Text, 
    StyleSheet, 
    Image, 
    Platform } from "react-native"

import { useNavigation, useRoute } from "@react-navigation/native";
import MealDetail from "./MealDetails";

function MealItem({id,title, imageUrl, duration, complexity, affordibility}){
    const navigation = useNavigation();

    function selectMealItemHander(){

        navigation.navigate('MealDetail', {
            meadId: id,
        });
    }
    return (
        <View style= {styles.mealItem}>
            <Pressable android_ripple={{color: "#ccc"}} 
            style= {({pressed})=> (pressed ? styles.buttomPressed: null)}
            onPress={selectMealItemHander}
            >
            <View style = {styles.innerContainer}>
                <View>
                    <Image source = {{uri: imageUrl}} style = {styles.image}/>
                    <Text style = {styles.title}>
                        {title}
                    </Text>
                </View>
                    <MealDetail duration={duration} affordibility={affordibility} complexity={complexity}/>
                </View>
            </Pressable>
            
        </View>
    )
}

const styles = StyleSheet.create({
    mealItem:{
        margin: 16,
        borderRadius: 8,
        backgroundColor:'white',
        elevation: 4,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === "android" && Platform.Version >= 21 ? "hidden" : "visible",

    },
    buttomPressed:{
        opacity: 0.5,
    },
    innerContainer:{
        borderRadius: 8,
        overflow: 'hidden'
    },
    image:{
        width: '100%',
        height: 200,
    },
    title:{
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        margin: 8,
    },
    details:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    detailItem:{
        marginHorizontal: 4,
        fontSize: 12,
    }
});

export default MealItem