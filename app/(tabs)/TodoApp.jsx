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

import { useThemeColor } from '@/hooks/use-theme-color';

export default function TodoApp() {
  const [user, setuser] = useState('');
  const [data, setdata] = useState([]);
  const [filter, setfilter] = useState('all');
  const [edit, setedit] = useState(null);

  // ✅ THEME COLORS
  const background = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

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

      {/* INPUT */}
      <TextInput
        placeholder="enter task"
        value={user}
        onChangeText={setuser}
        style={[styles.input, { color: textColor, borderColor: textColor }]}
        placeholderTextColor="gray"
      />

      <Button title="add / update" onPress={addtask} />

      {/* LIST */}
      <FlatList
        data={filterdata}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.item, { borderColor: textColor }]}>

            <Text
              style={[styles.text, { color: textColor }]}
              onPress={() => chek(item.id)}
            >
              {item.completed ? '✔ ' : ''}
              {item.title}
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

      {/* FILTER BUTTONS */}
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
    marginTop: 5,
  },
  delete: {
    color: 'red',
  },
  edit: {
    color: 'blue',
  },
  buttons: {
    marginTop: 20,
    gap: 5,
  },
});



// import { useState } from 'react';
// import {
//   Button,
//   FlatList,
//   Pressable,
//   Text,
//   TextInput,
//   View,
// } from 'react-native';

// // 👉 adjust path if needed
// // import { useThemeColor } from './hooks/use-theme-color.ts';
// import { useThemeColor } from '@/hooks/use-theme-color';
// export default function App() {
//   const [user, setuser] = useState('');
//   const [data, setdata] = useState([]);
//   const [filter, setfilter] = useState('all');
//   const [edit, setedit] = useState(null);

//   // ✅ THEME COLORS
//   const background = useThemeColor({}, 'background');
//   const textColor = useThemeColor({}, 'text');

//   const addtask = () => {
//     if (user.trim() === '') return;

//     if (edit !== null) {
//       setdata((prev) =>
//         prev.map((item) =>
//           item.id === edit ? { ...item, title: user } : item
//         )
//       );
//       setedit(null);
//     } else {
//       const newtask = {
//         id: Date.now().toString(), // ✅ fixed
//         title: user,
//         completed: false,
//       };
//       setdata((prev) => [...prev, newtask]);
//     }
//     setuser('');
//   };

//   const remove = (id) => {
//     setdata((prev) => prev.filter((item) => item.id !== id));
//   };

//   const chek = (id) => {
//     setdata((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? { ...item, completed: !item.completed }
//           : item
//       )
//     );
//   };

//   const filterdata =
//     filter === 'all'
//       ? data
//       : filter === 'completed'
//       ? data.filter((item) => item.completed)
//       : data.filter((item) => !item.completed);

//   return (
//     <View>

//       {/* INPUT */}
//       <TextInput
//         placeholder="enter task"
//         value={user}
//         onChangeText={setuser}
        
//       />

//       <Button title="add / update" onPress={addtask} />

//       {/* LIST */}
//       <FlatList
//         data={filterdata}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View >
//             <Text
              
//               onPress={() => chek(item.id)}
//             >
//               {item.completed ? '✔ ' : ''}
//               {item.title}
//             </Text>

//             {/* BUTTONS */}
//             <View >

//               <Pressable onPress={() => remove(item.id)}>
//                 <Text>delete</Text>
//               </Pressable>

//               <Pressable
//                 onPress={() => {
//                   setuser(item.title);
//                   setedit(item.id);
//                 }}
//               >
//                 <Text>edit</Text>
//               </Pressable>

//             </View>
//           </View>
//         )}
//       />

//       {/* FILTER BUTTONS */}
//       <View>
//         <Button title="all" onPress={() => setfilter('all')} />
//         <Button title="completed" onPress={() => setfilter('completed')} />
//         <Button title="pending" onPress={() => setfilter('pending')} />
//         <Button title="delete all" onPress={() => setdata([])} />
//       </View>

//     </View>
//   );
// }













// import { useState } from 'react';
// import {
//     Button,
//     FlatList,
//     Pressable,
//     Text,
//     TextInput,
//     View,
// } from 'react-native';
// export default function App() {
//   const [user, setuser] = useState('');
//   const [data, setdata] = useState([]);
//   const [filter, setfilter] = useState('all');
//   const [edit, setedit] = useState(null);

//   const addtask = () => {
//     if (user.trim() === '') return;

//     if (edit !== null) {
//       setdata((prev) =>
//         prev.map((item) => (item.id === edit ? { ...item, title: user } : item))
//       );
//       setedit(null);
//     } else {
//       const newtask = {
//         id: Date.now(),
//         title: user,
//         completed: false,
//       };
//       setdata((prev) => [...prev, newtask]);
//     }
//     setuser('');
//   };
//   const remove = (id) => {
//     setdata((prev) => prev.filter((item) => item.id !== id));
//   };

//   const chek = (id) => {
//     setdata((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, completed: !item.completed } : item
//       )
//     );
//   };

//   const filterdata =
//     filter === 'all'
//       ? data
//       : filter === 'completed'
//       ? data.filter((item) => item.completed)
//       : data.filter((item) => !item.completed);

//   return (
//     <View>
//       <TextInput placeholder="enter task" value={user} onChangeText={setuser} />
//       <Button title="add" onPress={addtask}></Button>

//       <FlatList
//         data={filterdata}
//         renderItem={({ item }) => (
//           <View>
//             <Text onPress={() => chek(item.id)}>
//               {item.completed ? '✔' : ''}
//               {item.title}
//             </Text>
//             <Pressable onPress={() => remove(item.id)}>
//               <Text>delet</Text>
//             </Pressable>

//             <Pressable
//               onPress={() => {
//                 setuser(item.title);
//                 setedit(item.id);
//               }}>
//               <Text>edit</Text>
//             </Pressable>
//           </View>
//         )}
//       />
//       <Button title="all" onPress={() => setfilter('all')}></Button>
//       <Button title="completed" onPress={() => setfilter('completed')}></Button>

//       <Button title="pending" onPress={() => setfilter('pending')}></Button>

//       <Button title="all delet" onPress={() => setdata([])}></Button>
//     </View>
//   );
// }




















































// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// import { Collapsible } from '@/components/ui/collapsible';
// import { ExternalLink } from '@/components/external-link';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { IconSymbol } from '@/components/ui/icon-symbol';
// import { Fonts } from '@/constants/theme';

// export default function TabTwoScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
//       headerImage={
//         <IconSymbol
//           size={310}
//           color="#808080"
//           name="chevron.left.forwardslash.chevron.right"
//           style={styles.headerImage}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText
//           type="title"
//           style={{
//             fontFamily: Fonts.rounded,
//           }}>
//           Explore
//         </ThemedText>
//       </ThemedView>
//       <ThemedText>This app includes example code to help you get started.</ThemedText>
//       <Collapsible title="File-based routing">
//         <ThemedText>
//           This app has two screens:{' '}
//           <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
//           <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
//         </ThemedText>
//         <ThemedText>
//           The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
//           sets up the tab navigator.
//         </ThemedText>
//         <ExternalLink href="https://docs.expo.dev/router/introduction">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Android, iOS, and web support">
//         <ThemedText>
//           You can open this project on Android, iOS, and the web. To open the web version, press{' '}
//           <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
//         </ThemedText>
//       </Collapsible>
//       <Collapsible title="Images">
//         <ThemedText>
//           For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
//           <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
//           different screen densities
//         </ThemedText>
//         <Image
//           source={require('@/assets/images/react-logo.png')}
//           style={{ width: 100, height: 100, alignSelf: 'center' }}
//         />
//         <ExternalLink href="https://reactnative.dev/docs/images">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Light and dark mode components">
//         <ThemedText>
//           This template has light and dark mode support. The{' '}
//           <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
//           what the user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
//         </ThemedText>
//         <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Animations">
//         <ThemedText>
//           This template includes an example of an animated component. The{' '}
//           <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
//           the powerful{' '}
//           <ThemedText type="defaultSemiBold" style={{ fontFamily: Fonts.mono }}>
//             react-native-reanimated
//           </ThemedText>{' '}
//           library to create a waving hand animation.
//         </ThemedText>
//         {Platform.select({
//           ios: (
//             <ThemedText>
//               The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
//               component provides a parallax effect for the header image.
//             </ThemedText>
//           ),
//         })}
//       </Collapsible>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   headerImage: {
//     color: '#808080',
//     bottom: -90,
//     left: -35,
//     position: 'absolute',
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     gap: 8,
//   },
// });













// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// import { HelloWave } from '@/components/hello-wave';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Link } from 'expo-router';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <Link href="/modal">
//           <Link.Trigger>
//             <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//           </Link.Trigger>
//           <Link.Preview />
//           <Link.Menu>
//             <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
//             <Link.MenuAction
//               title="Share"
//               icon="square.and.arrow.up"
//               onPress={() => alert('Share pressed')}
//             />
//             <Link.Menu title="More" icon="ellipsis">
//               <Link.MenuAction
//                 title="Delete"
//                 icon="trash"
//                 destructive
//                 onPress={() => alert('Delete pressed')}
//               />
//             </Link.Menu>
//           </Link.Menu>
//         </Link>

//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
