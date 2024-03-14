// Wolf.js
import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Alert, Dimensions, Pressable } from "react-native";
import CircleButton from "../components/CircleButton";

export default function Wolf() {
  const [circles, setCircles] = useState([]);
  const circleRadius = 40;

  const addCircle = (locationX, locationY) => {
    const newCircle = {
      key: Math.random().toString(),
      colorIndex: 0,
      x: locationX,
      y: locationY,
    };
    setCircles([...circles, newCircle]);
  };

  const deleteCircle = (key) => {
    setCircles(prevCircles => prevCircles.filter(circle => circle.key !== key));
  };

  const deleteAllCircles = () => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza de que deseja excluir todos os círculos?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            setCircles([]);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleTouch = (event) => {
      const { locationX, locationY } = event.nativeEvent;
      const isInsideCircle = circles.some(circle => {
        const distance = Math.sqrt(Math.pow(circle.x - locationX, 2) + Math.pow(circle.y - locationY, 2));
        return distance <= circleRadius * 2;
      });

      if (!isInsideCircle) {
        addCircle(locationX, locationY);
      }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <Pressable style={styles.container} onPress={handleTouch}>
        {circles.map((circle, index) => (
          <CircleButton
            key={circle.key}
            top={circle.y}
            left={circle.x}
            onPress={() => deleteCircle(circle.key)}
          />
        ))}

        {/* Button to delete all circles */}
        <TouchableOpacity onPress={deleteAllCircles} style={styles.deleteAllButton}>
          <View style={styles.deleteAllIcon}></View>
        </TouchableOpacity>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    backgroundColor: 'white',
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
  deleteAllButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'red',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteAllIcon: {
    width: 30,
    height: 4,
    backgroundColor: 'white',
    borderRadius: 1,
  },
});
