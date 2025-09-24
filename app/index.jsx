import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { useTheme } from './components/ThemeContext';
import TaskItem from './components/TaskItem';
import TaskForm from './components/TaskForm';

export default function HomeScreen() {
  const theme = useTheme();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const initialTasks = [
      {
        id: '1',
        title: 'Welcome to Task Manager',
        description: 'This is a sample task to get you started',
        dueDate: '2024-12-31',
        priority: 'High',
        category: 'Personal',
        completed: false,
        createdAt: new Date().toISOString(),
      }
    ];
    setTasks(initialTasks);
    setFilteredTasks(initialTasks);
  }, []);

  useEffect(() => {
    filterAndSortTasks();
  }, [tasks, searchQuery, filter, sortBy]);

  const filterAndSortTasks = () => {
    let filtered = tasks.filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filter !== 'All') {
      filtered = filtered.filter(task => 
        filter === 'Completed' ? task.completed : !task.completed
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { High: 3, Medium: 2, Low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'dueDate':
          return new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31');
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    setFilteredTasks(filtered);
  };

  const addTask = (taskData) => {
    if (editingTask) {
      setTasks(tasks.map(task => task.id === taskData.id ? taskData : task));
      setEditingTask(null);
    } else {
      setTasks([taskData, ...tasks]);
    }
  };

  const deleteTask = (taskId) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => setTasks(tasks.filter(task => task.id !== taskId))
        }
      ]
    );
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
        

    
    
    },
    header: {
      padding: 20,
      paddingTop: 60,
      backgroundColor: theme.colors.primary,
      borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    },
    headerText: {
      color: '#fff',
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    controls: {
      padding: 10,
      backgroundColor: theme.colors.card,
    },
    searchInput: {
      backgroundColor: theme.colors.background,
      padding: 10,
      borderRadius: 10,
      marginBottom: 5,
      color: theme.colors.text,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    filterButton: {
      flex: 1,
      padding: 10,
      marginHorizontal: 2,
      borderRadius: 5,
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    activeFilter: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    filterText: {
      color: theme.colors.text,
    },
    activeFilterText: {
      color: '#fff',
    },
    sortContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
    },
    addButton: {
      backgroundColor: theme.colors.primary,
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      margin: 10,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    stats: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      backgroundColor: theme.colors.card,
    },
    stat: {
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    statLabel: {
      fontSize: 12,
      color: theme.colors.text + '80',
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    emptyStateText: {
      fontSize: 16,
      color: theme.colors.text + '80',
      textAlign: 'center',
      marginTop: 10,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Task Manager</Text>
        <TouchableOpacity 
  onPress={theme.toggleTheme}
  style={{ position: 'absolute', right: 15, top: 50 , }}
>
  <Ionicons 
    name={theme.isDarkMode ? "sunny" : "moon"} 
    size={24} 
    color="#fff" 
  />
</TouchableOpacity>
      </View>

      <View style={styles.controls}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks..."
          placeholderTextColor={theme.colors.text + '80'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.filterContainer}>
          {['All', 'Pending', 'Completed'].map((filterOption) => (
            <TouchableOpacity
              key={filterOption}
              style={[
                styles.filterButton,
                filter === filterOption && styles.activeFilter
              ]}
              onPress={() => setFilter(filterOption)}
            >
              <Text style={[
                styles.filterText,
                filter === filterOption && styles.activeFilterText
              ]}>
                {filterOption}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sortContainer}>
          {['Date', 'Priority', 'Title'].map((sortOption) => (
            <TouchableOpacity
              key={sortOption}
              style={[
                styles.filterButton,
                sortBy === sortOption.toLowerCase() && styles.activeFilter
              ]}
              onPress={() => setSortBy(sortOption.toLowerCase())}
            >
              <Text style={[
                styles.filterText,
                sortBy === sortOption.toLowerCase() && styles.activeFilterText
              ]}>
                Sort: {sortOption}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{tasks.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>
            {tasks.filter(t => !t.completed).length}
          </Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>
            {tasks.filter(t => t.completed).length}
          </Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onEdit={editTask}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {searchQuery ? 'No tasks match your search' : 'No tasks yet!'}
            </Text>
            <Text style={styles.emptyStateText}>
              Tap the button below to add your first task.
            </Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowForm(true)}
      >
        <Text style={styles.addButtonText}>+ Add New Task</Text>
      </TouchableOpacity>

      <TaskForm
        visible={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingTask(null);
        }}
        onSave={addTask}
        task={editingTask}
      />
    </View>
  );
}