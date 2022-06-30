import React, {useEffect, useState} from 'react';
// import { StatusBar } from 'expo-status-bar';
import { Alert,
        Keyboard,
        KeyboardAvoidingView,
        Platform,
        ScrollView,
        StyleSheet,
        Text,
        TextInput,
        TouchableOpacity,
        View } from 'react-native';
import Task from './components/Task';
import Msg from './components/Msg';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [msg, setMsg] = useState();

  const handleAddTask = () => {
    if(task === null){
      alert('Please write a task!');
      return;
    } else {
      // Keyboard.dismiss();
      setMsg('');
      setTaskItems([...taskItems, task])
      setTask(null);
    }
  }

  const showConfirmDialog = (index) => {
    return Alert.alert(
      "",
      "Are you completed this task?",
      [
        {
          text: "Yes",
          onPress: () => {
            let itemsCopy = [...taskItems];
            itemsCopy.splice(index, 1);
            setTaskItems(itemsCopy);
          }
        },
        {
          text: "No",
        },
      ]
    );
  };

  useEffect(() => {
      if(taskItems.length === 0){
        let message = "You don't have any task!";
        setMsg(message);
      }
    },
  )


  // const completeTask = (index) => {
  //   let itemsCopy = [...taskItems];
  //   itemsCopy.splice(index, 1);
  //   setTaskItems(itemsCopy);
  // }

  return (
    <View style={styles.container}>
      
      {/* My tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>My tasks</Text>

        <ScrollView style={styles.ScrollView}>
          <View style={styles.items}>
            {/* Task Items */}
            {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => showConfirmDialog(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              )              
            }) 
            }
            <Msg text={msg} />
          </View>
        </ScrollView>
        
      </View>


      {/* Create task section */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
        >
          {/* Task Text Field */}
          <TextInput style={styles.input} placeholder={"Write a task"} value={task} onChangeText={text => setTask(text)} />
          
          {/* Add Button */}
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',  
  },
  tasksWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  items: {
    marginTop: 10,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 300,
  },
  addWrapper: {
    width: 44,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    color: '#C0C0C0',
    fontSize: 25,
    fontWeight: '300',
  },
  ScrollView: {
    height: '80%',
  },
});
