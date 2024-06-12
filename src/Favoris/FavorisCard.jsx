import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./FavorisCard.style";

const FavorisCard = ({ utilisateurId }) => {
  const [favoris, setFavoris] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les favoris depuis le backend
    const fetchFavoris = async () => {
      try {
        const response = await fetch(`http://192.168.1.34/favoris/${utilisateurId}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des favoris');
        }

        const favorisData = await response.json();
        setFavoris(favorisData);
      } catch (error) {
        console.error(error);
      }
    };

    // Appeler la fonction de récupération des favoris
    fetchFavoris();
  }, [utilisateurId]);

  return (
    <View>
      {favoris.map((item) => (
        <TouchableOpacity
          key={item.id} // Assurez-vous que chaque élément a une clé unique
          style={styles.container(selectedJob, item)}
          onPress={() => handleCardPress(item)}
        >
          {/* Le reste de votre code pour afficher les informations de chaque favori */}
          <Text>{item.formation}</Text>
          
         
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FavorisCard;
