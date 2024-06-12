import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';

const SideBar = ({ openSidebarToggle, openSidebar }) => {
  return (
    <View style={[styles.sidebar, openSidebarToggle && styles.sidebarResponsive]}>
      <View style={styles.sidebarTitle}>
        <View style={styles.sidebarBrand}>
          <BsCart3 style={styles.iconHeader} />
          <Text style={styles.brandText}>M2L Panel</Text>
        </View>
        <Text style={[styles.icon, styles.closeIcon]} onPress={openSidebar}>X</Text>
      </View>

      <View style={styles.sidebarList}>
        <TouchableOpacity style={styles.sidebarListItem}>
          <BsGrid1X2Fill style={styles.icon} />
          <Text>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarListItem}>
          <BsFillArchiveFill style={styles.icon} />
          <Text>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarListItem}>
          <BsFillGrid3X3GapFill style={styles.icon} />
          <Text>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarListItem}>
          <BsPeopleFill style={styles.icon} />
          <Text>Customers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarListItem}>
          <BsListCheck style={styles.icon} />
          <Text>Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarListItem}>
          <BsMenuButtonWideFill style={styles.icon} />
          <Text>Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarListItem}>
          <BsFillGearFill style={styles.icon} />
          <Text>Setting</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 200,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#dddddd',
  },
  sidebarResponsive: {
    width: '100%',
  },
  sidebarTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  sidebarBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandText: {
    marginLeft: 5,
    fontSize: 16,
  },
  closeIcon: {
    fontSize: 18,
  },
  sidebarList: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sidebarListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
});

export default SideBar;
