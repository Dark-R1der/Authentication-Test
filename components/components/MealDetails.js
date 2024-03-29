import { View, Text, StyleSheet } from "react-native";

function MealDetail({duration, complexity, affordibility, style, textStyle}){
    return <View style= {[styles.details, style]}>
                    <Text style= {[styles.detailItem, textStyle]}>{duration}m</Text>
                    <Text style= {[styles.detailItem, textStyle]} >{complexity}</Text>
                    <Text style= {[styles.detailItem, textStyle]}>{affordibility}</Text>
                </View>

}

const styles = StyleSheet.create({
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

export default MealDetail;