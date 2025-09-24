import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useTheme } from "./ThemeContext";
import { Ionicons } from '@expo/vector-icons';

const TaskForm = ({ visible, onClose, onSave, task }) => {
  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Personal");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setDueDate(task.dueDate || "");
      setPriority(task.priority);
      setCategory(task.category);
    } else {
      resetForm();
    }
  }, [task, visible]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Medium");
    setCategory("Personal");
  };

  const handleSave = () => {
    if (!title.trim()) return;

    const taskData = {
      id: task ? task.id : Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      dueDate,
      priority,
      category,
      completed: task ? task.completed : false,
      createdAt: task ? task.createdAt : new Date().toISOString(),
    };

    onSave(taskData);
    resetForm();
    onClose();
  };

  const getPriorityIcon = (level) => {
    switch (level) {
      case "High":
        return { name: "alert-circle", color: theme.colors.highPriority };
      case "Medium":
        return { name: "time", color: theme.colors.mediumPriority };
      case "Low":
        return { name: "chevron-down", color: theme.colors.lowPriority };
      default:
        return { name: "flag", color: theme.colors.primary };
    }
  };

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: theme.colors.background,
      margin: 20,
      borderRadius: 10,
      padding: 20,
      width: "90%",
      maxHeight: "80%",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: 20,
      textAlign: "center",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 5,
      marginBottom: 15,
      backgroundColor: theme.colors.card,
    },
    icon: {
      padding: 10,
      paddingHorizontal: 15,
    },
    input: {
      flex: 1,
      padding: 10,
      color: theme.colors.text,
    },
    label: {
      color: theme.colors.text,
      marginBottom: 5,
      fontWeight: "500",
    },
    priorityContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 15,
    },
    priorityButton: {
      flex: 1,
      padding: 12,
      marginHorizontal: 2,
      borderRadius: 5,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
    },
    priorityButtonContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    priorityText: {
      marginLeft: 5,
      fontSize: 12,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    button: {
      flex: 1,
      padding: 15,
      borderRadius: 5,
      alignItems: "center",
      marginHorizontal: 5,
      flexDirection: "row",
      justifyContent: "center",
    },
    saveButton: {
      backgroundColor: theme.colors.primary,
    },
    cancelButton: {
      backgroundColor: theme.colors.border,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      marginLeft: 8,
    },
    sectionTitle: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      marginTop: 5,
    },
    sectionIcon: {
      marginRight: 8,
    },
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return theme.colors.highPriority;
      case "Medium":
        return theme.colors.mediumPriority;
      case "Low":
        return theme.colors.lowPriority;
      default:
        return theme.colors.primary;
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.title}>
              <Ionicons 
                name={task ? "create-outline" : "add-circle-outline"} 
                size={24} 
                color={theme.colors.primary} 
              />
              {" "}{task ? "Edit Task" : "Add New Task"}
            </Text>

            {/* Title Input */}
            <Text style={styles.label}>
              <Ionicons name="document-text-outline" size={16} color={theme.colors.text} />
              {" "}Title *
            </Text>
            <View style={styles.inputContainer}>
              <Ionicons 
                name="text" 
                size={20} 
                color={theme.colors.text + "80"} 
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter task title"
                placeholderTextColor={theme.colors.text + "80"}
              />
            </View>

            {/* Description Input */}
            <Text style={styles.label}>
              <Ionicons name="list-outline" size={16} color={theme.colors.text} />
              {" "}Description
            </Text>
            <View style={[styles.inputContainer, { minHeight: 80 }]}>
              <Ionicons 
                name="document-outline" 
                size={20} 
                color={theme.colors.text + "80"} 
                style={[styles.icon, { alignSelf: 'flex-start', marginTop: 10 }]}
              />
              <TextInput
                style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter task description"
                placeholderTextColor={theme.colors.text + "80"}
                multiline
              />
            </View>

            {/* Due Date Input */}
            <Text style={styles.label}>
              <Ionicons name="calendar-outline" size={16} color={theme.colors.text} />
              {" "}Due Date
            </Text>
            <View style={styles.inputContainer}>
              <Ionicons 
                name="calendar" 
                size={20} 
                color={theme.colors.text + "80"} 
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                value={dueDate}
                onChangeText={setDueDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={theme.colors.text + "80"}
              />
            </View>

            {/* Priority Selection */}
            <Text style={styles.label}>
              <Ionicons name="flag-outline" size={16} color={theme.colors.text} />
              {" "}Priority
            </Text>
            <View style={styles.priorityContainer}>
              {["High", "Medium", "Low"].map((level) => {
                const iconInfo = getPriorityIcon(level);
                return (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.priorityButton,
                      {
                        backgroundColor:
                          priority === level
                            ? getPriorityColor(level)
                            : theme.colors.card,
                        borderWidth: 1,
                        borderColor:
                          priority === level
                            ? getPriorityColor(level)
                            : theme.colors.border,
                      },
                    ]}
                    onPress={() => setPriority(level)}
                  >
                    <View style={styles.priorityButtonContent}>
                      <Ionicons 
                        name={iconInfo.name} 
                        size={16} 
                        color={priority === level ? "#fff" : iconInfo.color} 
                      />
                      <Text 
                        style={[
                          styles.priorityText,
                          { color: priority === level ? "#fff" : theme.colors.text }
                        ]}
                      >
                        {level}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Category Input */}
            <Text style={styles.label}>
              <Ionicons name="pricetags-outline" size={16} color={theme.colors.text} />
              {" "}Category
            </Text>
            <View style={styles.inputContainer}>
              <Ionicons 
                name="folder-outline" 
                size={20} 
                color={theme.colors.text + "80"} 
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                value={category}
                onChangeText={setCategory}
                placeholder="Work, Personal, Shopping, etc."
                placeholderTextColor={theme.colors.text + "80"}
              />
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Ionicons name="close-circle-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
              >
                <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>
                  {task ? "Update" : "Save"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default TaskForm;