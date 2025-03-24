import React from 'react'
import { FlashList } from '@shopify/flash-list'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const DATA = Array(20)
  .fill(null)
  .map((_, i) => ({ id: i.toString(), title: `Item ${i}` }))

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  headerFooter: {
    padding: 20,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#e0e0e0',
  },
})

const Item = ({ title }: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
)

const App = () => {
  const renderItem = ({ item }: any) => <Item title={item.title} />

  const ListHeader = () => (
    <Text style={styles.headerFooter}>Header Component</Text>
  )

  const ListFooter = () => (
    <Text style={styles.headerFooter}>Footer Component</Text>
  )

  return (
    <SafeAreaView className='flex-1'>
      <FlashList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        estimatedItemSize={200}
      />
    </SafeAreaView>
  )
}

export default App
