import React, { useState, useLayoutEffect } from "react";
import { MEALS, CATEGORIES } from "../assets/data/dummydata";
import { View, StyleSheet, Text, FlatList } from "react-native";
import MealItem from "../components/components/MealItem";
import { useCategory } from "../CategoryContext";

function MealsOverviewScreen({ navigation }) {
    const { selectedCategoryId, setCategory} = useCategory();
    console.log(selectedCategoryId + "hell yeah");

//     useLayoutEffect(() => {const categoryTitle = CATEGORIES.find((category) => category.id === catId).title;
//         navigation.setOptions({
//           title: categoryTitle,
//         });
//   }, [selectedCategoryId]);
  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find((category) => category.id === selectedCategoryId).title;
    navigation.setOptions({
      title: categoryTitle,
    });
  }, [selectedCategoryId, navigation]);

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(selectedCategoryId) >= 0;
  });

  function renderMealItem(itemData) {
    const item = itemData.item;
    const mealItemProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      duration: item.duration,
      complexity: item.complexity,
      affordability: item.affordability,
    };
    return <MealItem {...mealItemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default MealsOverviewScreen;
