import { Text, StyleSheet, View, FlatList } from "react-native";

// import <Text
const foodData = [
  { id: "1", name: "Pizza" },
  { id: "2", name: "Burger" },
  { id: "3", name: "Sushi" },
  { id: "4", name: "Pasta" },
  { id: "5", name: "Salad" },
  { id: "6", name: "Ice Cream" },
];

const GridItem = ({ item }) => (
  <View style={styles.gridItem}>
    <Text style={styles.gridItemText}>{item.name}</Text>
  </View>
);
function CategoryOverScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={foodData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => <GridItem item={item} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  gridItem: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#000',
  },

  gridItemText: {
    fontSize: 18, // Increase font size
    fontWeight: "bold",
    color: '#000', // Set text color to black
  },
});
export default CategoryOverScreen;
