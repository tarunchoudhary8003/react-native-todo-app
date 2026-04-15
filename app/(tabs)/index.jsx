
import { useState } from 'react';
import {
  Button,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet
} from 'react-native';

export default function TodoApp() {
  const [user, setuser] = useState('');
  const [data, setdata] = useState([]);
  const [filter, setfilter] = useState('all');
  const [edit, setedit] = useState(null);


  const background = '#1e1e1e';
  const textColor = '#ffffff';

  const addtask = () => {
    if (user.trim() === '') return;

    if (edit !== null) {
      setdata((prev) =>
        prev.map((item) =>
          item.id === edit ? { ...item, title: user } : item
        )
      );
      setedit(null);
    } else {
      const newtask = {
        id: Date.now().toString(),
        title: user,
        completed: false,
      };
      setdata((prev) => [...prev, newtask]);
    }
    setuser('');
  };

  const remove = (id) => {
    setdata((prev) => prev.filter((item) => item.id !== id));
  };

  const chek = (id) => {
    setdata((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const filterdata =
    filter === 'all'
      ? data
      : filter === 'completed'
      ? data.filter((item) => item.completed)
      : data.filter((item) => !item.completed);

  return (
    <View style={[styles.container, { backgroundColor: background }]}>

      
      <TextInput
        placeholder="enter task"
        value={user}
        onChangeText={setuser}
        style={[styles.input, { color: textColor, borderColor: textColor }]}
        placeholderTextColor="gray"
      />

      <Button title={edit ? "Update Task" : "Add Task"} onPress={addtask} />

      
      <FlatList
        data={filterdata}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ color: textColor, textAlign: 'center', marginTop: 20 }}>
            No tasks found
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.item,
              {
                borderColor: textColor,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#2c2c2c'
              }
            ]}
          >

            <Text
              style={[
                styles.text,
                {
                  color: textColor,
                  flex: 1,
                  textDecorationLine: item.completed ? 'line-through' : 'none'
                }
              ]}
              onPress={() => chek(item.id)}
            >
              {item.title}
              {item.completed && (
                <Text style={styles.completedLabel}> (Completed)</Text>
              )}
            </Text>

            <View style={styles.row}>
              <Pressable onPress={() => remove(item.id)}>
                <Text style={styles.delete}>delete</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setuser(item.title);
                  setedit(item.id);
                }}
              >
                <Text style={styles.edit}>edit</Text>
              </Pressable>
            </View>

          </View>
        )}
      />

      <View style={styles.buttons}>
        <Button title="all" onPress={() => setfilter('all')} />
        <Button title="completed" onPress={() => setfilter('completed')} />
        <Button title="pending" onPress={() => setfilter('pending')} />
        <Button title="delete all" onPress={() => setdata([])} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  item: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 15,
  },
  delete: {
    color: 'red',
  },
  edit: {
    color: 'skyblue',
  },
  buttons: {
    marginTop: 20,
    gap: 5,
  },
  completedLabel: {
    color: '#00ff9d',
    fontSize: 12,
    fontWeight: 'bold'
  },
});