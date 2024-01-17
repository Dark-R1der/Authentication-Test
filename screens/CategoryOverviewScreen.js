import { FlatList } from "react-native";

import CategoriesGridTile from "../components/components/categoryGridTiles";
import { CATEGORIES } from "../assets/data/dummydata";
import { useCategory } from "../CategoryContext";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";



function CategoriesScreen({navigation}){

  const authCtx = useContext(AuthContext);
    const { setCategory, selectedCategoryId } = useCategory();
    function renderCategoryItem({item}){
     function pressHandler(){
            setCategory(item.id);
            console.log(item.id);
            if (authCtx.isAuthenticatted) {
                navigation.navigate("MealOverViewScreen", {
                  categoryId: selectedCategoryId,
                });
              } else {
                navigation.navigate("LoginOption", {
                  categoryId: selectedCategoryId,
                });
              }
            // navigation.navigate('MealsOverview', {
            //     categoryId: item.id,
            // });
 }
        
        return <CategoriesGridTile title={item.title} color={item.color} onPress={pressHandler}/>;
    }
    return <FlatList data = {CATEGORIES} keyExtractor={(item) => item.id} renderItem={
        renderCategoryItem
    }
    numColumns={2}
    />
}

export default CategoriesScreen;