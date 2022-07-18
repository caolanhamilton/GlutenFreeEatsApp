import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import CategoryCard from "./CategoryCard";

const restaurantCategories = [
  {
    cat: "American",
    img: "https://i.insider.com/53b579166da811b136c10d7b?width=1000&format=jpeg&auto=webp",
    id: 1,
  },
  {
    cat: "Asian",
    img: "https://www.manchesterworld.uk/jpim-static/image/2021/08/19/14/shutterstock_1937661397.jpg?quality=65&smart&width=990",
    id: 2,
  },
  {
    cat: "British",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkWxcNiGpL_4bPXjzkjKoa7q4wqbGxHM02GA&usqp=CAU",
    id: 3,
  },
  {
    cat: "Indian",
    img: "https://www.blueosa.com/wp-content/uploads/2020/01/the-best-top-10-indian-dishes.jpg",
    id: 4,
  },
  {
    cat: "Italian",
    img: "https://www.sightseeingtoursitaly.com/wp-content/uploads/2019/06/Famous-Italian-dishes.jpg",
    id: 5,
  },
  {
    cat: "Mexican",
    img: "https://www.lacademie.com/wp-content/uploads/2022/01/popular-mexican-foods.jpg",
    id: 7,
  },
];

export default function Categories() {
  return <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10, paddingBottom: 10}} className="bg-gray-100">
    {restaurantCategories.map((category) => { 
      return (
        <CategoryCard
          key={category.id}
          cat={category.cat}
          img={category.img}
          id={category.id}
        />
      );
    })} 
  </ScrollView>;
}
