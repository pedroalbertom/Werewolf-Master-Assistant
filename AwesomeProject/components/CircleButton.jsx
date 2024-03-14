import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";

export default function CircleButton({ top, left, onPress }) {
  const circleRadius = 40;
  const [imageIndex, setImageIndex] = useState(0);
  const images = [require('../assets/villager.jpeg'), require('../assets/witch.jpg'), require('../assets/wolf.jpg')];

  const toggleImage = () => {
    setImageIndex((imageIndex + 1) % images.length);
  };

  return (
    <TouchableOpacity
      style={[
        styles.circle,
        {
          left: left - circleRadius,
          top: top - circleRadius,
          width: circleRadius * 2,
          height: circleRadius * 2,
          borderRadius: circleRadius,
        }
      ]}
      onPress={toggleImage}
    >
      <Image source={images[imageIndex]} style={styles.image} />

      <TouchableOpacity onPress={onPress} style={styles.deleteButton}>
        <View style={styles.deleteIcon}></View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 40, // ou circleRadius se as imagens forem quadradas
  },
  deleteButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    width: 15,
    height: 2,
    backgroundColor: 'white',
    borderRadius: 1,
  },
});
