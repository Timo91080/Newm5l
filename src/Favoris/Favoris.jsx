import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./Favoris.style";
import { COLORS, SIZES } from "../style/constants";
import FavorisCard from "./FavorisCard";
import useFetch from "./useFetch"; // Importez le hook useFetch depuis votre code source

const Favoris = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("search", {
    query: "React developer",
    num_pages: "1",
  });

  const [selectedJob, setSelectedJob] = useState();
  const [favorisData, setFavorisData] = useState([]);


  useEffect(() => {
    const fetchFavoris = async () => {
      try {
        const response = await fetch(`http://192.168.1.34:8088/favoris/${utilisateurId}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des favoris');
        }

        const favorisData = await response.json();
        setFavorisData(favorisData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavoris();
  }, [utilisateurId]);

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={[...data, ...favorisData]} // Combinez les données de la recherche avec les favoris
            renderItem={({ item }) => (
              <FavorisCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Favoris;
