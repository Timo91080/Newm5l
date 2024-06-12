import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BsJustify, BsSearch, BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle } from 'react-icons/bs';

const Headero = ({ openSidebar }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.menuIcon} onPress={openSidebar}>
        <BsJustify style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.headerLeft}>
        <BsSearch style={styles.icon} />
      </View>
      <View style={styles.headerRight}>
        <BsFillBellFill style={styles.icon} />
        <BsFillEnvelopeFill style={styles.icon} />
        <BsPersonCircle style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  menuIcon: {
    marginRight: 10,
  },
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    marginHorizontal: 10,
  },
});

export default Headero;