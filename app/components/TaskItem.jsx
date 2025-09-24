import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const theme = useTheme();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return theme.colors.highPriority;
      case 'Medium': return theme.colors.mediumPriority;
      case 'Low': return theme.colors.lowPriority;
      default: return theme.colors.text;
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'High': return 'alert-circle';
      case 'Medium': return 'time';
      case 'Low': return 'chevron-down';
      default: return 'flag';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'work': return 'briefcase-outline';
      case 'personal': return 'person-outline';
      case 'shopping': return 'cart-outline';
      case 'health': return 'fitness-outline';
      case 'study': return 'school-outline';
      default: return 'folder-outline';
    }
  };

  const styles = StyleSheet.create({
    taskItem: {
      backgroundColor: theme.colors.card,
      padding: 15,
      marginVertical: 5,
      marginHorizontal: 10,
      borderRadius: 8,
      borderLeftWidth: 4,
      borderLeftColor: getPriorityColor(task.priority),
    },
    taskHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
    },
    taskTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    taskTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
      textDecorationLine: task.completed ? 'line-through' : 'none',
      flex: 1,
      marginLeft: 8,
    },
    taskDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    categoryContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primary + '20',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 10,
    },
    categoryText: {
      fontSize: 12,
      color: theme.colors.primary,
      marginLeft: 4,
    },
    dueDateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dueDate: {
      fontSize: 12,
      color: theme.colors.text + '80',
      marginLeft: 4,
    },
    actions: {
      flexDirection: 'row',
      marginTop: 10,
      justifyContent: 'flex-end',
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginLeft: 10,
      borderRadius: 5,
      backgroundColor: theme.colors.primary,
    },
    actionText: {
      color: '#fff',
      fontSize: 12,
      marginLeft: 4,
    },
    completedContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.completed + '20',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 10,
    },
    completedText: {
      color: theme.colors.completed,
      fontSize: 12,
      fontWeight: 'bold',
      marginLeft: 4,
    },
    priorityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    priorityText: {
      fontSize: 12,
      color: theme.colors.text + '80',
      marginLeft: 4,
    },
  });

  return (
    <View style={styles.taskItem}>
      <View style={styles.taskHeader}>
        <View style={styles.taskTitleContainer}>
          <Ionicons 
            name={task.completed ? "checkmark-done-circle" : "ellipse-outline"} 
            size={20} 
            color={task.completed ? theme.colors.completed : theme.colors.text + '80'} 
          />
          <Text style={styles.taskTitle}>{task.title}</Text>
        </View>
        {task.completed && (
          <View style={styles.completedContainer}>
            <Ionicons name="checkmark" size={12} color={theme.colors.completed} />
            <Text style={styles.completedText}>Done</Text>
          </View>
        )}
      </View>
      
      {task.description ? (
        <Text style={{ color: theme.colors.text + '80', fontSize: 14, marginTop: 5, marginLeft: 28 }}>
          {task.description}
        </Text>
      ) : null}

      <View style={styles.priorityContainer}>
        <Ionicons 
          name={getPriorityIcon(task.priority)} 
          size={14} 
          color={getPriorityColor(task.priority)} 
        />
        <Text style={styles.priorityText}>{task.priority} Priority</Text>
      </View>

      <View style={styles.taskDetails}>
        <View style={styles.categoryContainer}>
          <Ionicons 
            name={getCategoryIcon(task.category)} 
            size={14} 
            color={theme.colors.primary} 
          />
          <Text style={styles.categoryText}>{task.category}</Text>
        </View>
        
        {task.dueDate && (
          <View style={styles.dueDateContainer}>
            <Ionicons name="calendar-outline" size={14} color={theme.colors.text + '80'} />
            <Text style={styles.dueDate}>
              {new Date(task.dueDate).toLocaleDateString()}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: theme.colors.completed }]}
          onPress={() => onToggleComplete(task.id)}
        >
          <Ionicons 
            name={task.completed ? "refresh" : "checkmark"} 
            size={16} 
            color="#fff" 
          />
          <Text style={styles.actionText}>
            {task.completed ? 'Undo' : 'Complete'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#FF9500' }]}
          onPress={() => onEdit(task)}
        >
          <Ionicons name="create-outline" size={16} color="#fff" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: theme.colors.highPriority }]}
          onPress={() => onDelete(task.id)}
        >
          <Ionicons name="trash-outline" size={16} color="#fff" />
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskItem;