'use client'
import React , { useState, Context, Dispatch, SetStateAction, createContext, useEffect}from  "react"; 
import { TaskDataValue } from '@/data';



export interface AppProvProps {
    children: any,
}



export interface TaskDataValueWithoutIds { 
    id?: number,
    title: string,
    date: string,
    time: string,
    alarmMin: number,
    completed: boolean,
}

type EmptyObject = {

}


export interface AppProvData {
    hello: string,
    taskData: Array<TaskDataValue>,
    currentPages: number,
    month: number,
    setMonth: Dispatch<SetStateAction<number>>,
    year: number,
    setYear: Dispatch<SetStateAction<number>>,
    readonly selectedDate: string,
    setSelectedDate: Dispatch<SetStateAction<string>>,
    addTaskStatus: boolean,
    setAddTaskStatus: Dispatch<SetStateAction<boolean>>,
    editTaskStatus: boolean,
    setEditTaskStatus: Dispatch<SetStateAction<boolean>>,
    viewTaskStatus: boolean,
    setViewTaskStatus: Dispatch<SetStateAction<boolean>>,
    selectedItem: TaskDataValue,
    setSelectedItem: Dispatch<SetStateAction<TaskDataValue>>,
    currentPage: number,
    setCurrentPage: Dispatch<SetStateAction<number>>,
    nextMonth(): void,
    previousMonth(): void,
    goToToday(): void,
    createTask({ title, date, time, alarmMin, completed}: TaskDataValueWithoutIds): void,
    updateTask({ id, title, date, time, alarmMin, completed}: TaskDataValueWithoutIds): void,
    deleteTask(id: number): void,
    updateTaskCompleted(completed: boolean, id: number): void

}


const addDateTimeAlarmFields = (apiData : any) => {
    // Map each item from the API data and add date, time, and alarm fields
    return apiData.map((item : any) => ({
      id: item.id,
      userId: item.userId,
      title: item.title,
      completed: item.completed,
      date: generateRandomDate(),
      time: generateRandomTime(),
      alarmMin: generateRandomAlarm(),
  

    }));
  };
  

  // Function to generate a random date in YYYY-MM-DD format
const generateRandomDate = () => {
    const year = new Date().getFullYear();
    const month = Math.floor(Math.random() * 12) + 1; 
    const day = Math.floor(Math.random() * 28) + 1; 
    return `${year}-${month}-${day}`;
  };
  
  // Function to generate a random time in HH:MM format
  const generateRandomTime = () => {
    const hours = Math.floor(Math.random() * 24); 
    const minutes = Math.floor(Math.random() * 60); 
    return `${hours}:${minutes}`;
  };
  
  // Function to generate a random alarm time (in minutes)
  const generateRandomAlarm = () => {
    return Math.floor(Math.random() * 60); 
  };
  
export const appContext = createContext<AppProvData>({
    hello: "hello",
    taskData: [],
    currentPages: 1,
    month: 1,
    setMonth() {},
    year: 1,
    setYear() {},
    selectedDate: "",
    setSelectedDate() {},
    addTaskStatus: false,
    setAddTaskStatus() {},
    editTaskStatus: false,
    setEditTaskStatus() {},
    viewTaskStatus: false,
    setViewTaskStatus() {},
    selectedItem: {
        id: 999999999,
        userId: 1,
        date: "",
        alarmMin: 0,
        time: "",
        title: "",
        completed: false,
    },
    setSelectedItem() {},
    currentPage: 1,
    setCurrentPage() {},
    nextMonth() {},
    previousMonth() {},
    goToToday() {},
    createTask() {},
    updateTask() {},
    deleteTask() {},
    updateTaskCompleted() {},
})


export const AppProvider = ({ children }: AppProvProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear())
    const [viewTaskStatus, setViewTaskStatus] = useState(false)
    const [editTaskStatus, setEditTaskStatus] = useState(false)
    const [addTaskStatus, setAddTaskStatus] = useState(false)
    const [selectedDate, setSelectedDate] = useState(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`)
    const [selectedItem, setSelectedItem] = useState<TaskDataValue>({
        id: 999999999,
        userId: 1,
        date: "",
        alarmMin: 0,
        time: "",
        title: "",
        completed: false,
    })
    const currentPages= 1
    const [currentPage, setCurrentPage] = useState(1)
    const [isInfo, setIsInfo] = useState(false)
    const [tab, setTab] = useState()

    // const [taskData, setTaskData] = useState(taskDataSet)  
    const [apiTaskData, setApiTaskData] = useState<Array<TaskDataValue>>([]);
    useEffect(() => {
        // Fetch data from the JSONPlaceholder API
        const fetchData = async () => {
          try {
            const response = await fetch(
              "https://jsonplaceholder.typicode.com/todos"
            );
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const data = await response.json();
    
            // Transform the API data and set it to apiTaskData state
            const transformedData = addDateTimeAlarmFields(data);

            setApiTaskData(transformedData);
            setIsLoading(false)

          } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false)
          }
        };
    
        // Call the fetchData function when the component mounts
        fetchData();
      }, []);
    

    


    const nextMonth = () => {
        if (month == 12) {
            setMonth(() => 1)
            setYear((prev) => prev + 1)
        } else {
            setMonth((prev) => prev + 1) 
        }
    }

    const previousMonth = () => {
        if (month == 1) {
            setMonth(() => 12)
            setYear((prev) => prev - 1)
        } else {
            setMonth((prev) => prev - 1) 
        }
    }

    const goToToday = () => {
        setYear(() => new Date().getFullYear());
        setMonth(() => new Date().getMonth() + 1);
        setSelectedDate(() => `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
      };
    
      const createTask = ({ title, date, time, alarmMin, completed }: TaskDataValueWithoutIds) => {
        const id = apiTaskData.length + 1;
        setApiTaskData((prev: Array<TaskDataValue>) => [
          ...prev,
          {
            id,
            title,
            date,
            time,
            alarmMin,
            completed,
          },
        ]);
      };
    
      const updateTask = ({ id, title, date, time, alarmMin, completed }: TaskDataValueWithoutIds) => {
        let position = apiTaskData.findIndex((item) => item.id === id);
        if (position !== -1) {
          setApiTaskData((prev: Array<TaskDataValue>) => {
            const newTaskData = prev.map((item, index) => {
              if (index !== position) {
                return item;
              } else {
                if (title.length < 4) {
                  return {
                    ...item,
                    date,
                    time,
                    alarmMin,
                    completed,
                  };
                }
                return {
                  ...item,
                  title,
                  date,
                  time,
                  alarmMin,
                  completed,
                };
              }
            });
            return newTaskData;
          });
        }
      };
    
      const updateTaskCompleted = (completed: boolean, id: number) => {
        let position = apiTaskData.findIndex((item) => item.id === id);
        if (position !== -1) {
          setApiTaskData((prev: Array<TaskDataValue>) => {
            const newTaskData = prev.map((item, index) => {
              if (index !== position) {
                return item;
              } else {
                return {
                  ...item,
                  completed,
                };
              }
            });
            return newTaskData;
          });
        }
      };
    
      const deleteTask = (id: number) => {
        const newArr: Array<TaskDataValue> = apiTaskData.filter((item) => item.id !== id);
        setApiTaskData(() => newArr);
      };
    
      const previousMonths = () => {};
    
      return (
        <appContext.Provider
          value={{
            hello: "hello",
            taskData: apiTaskData,
            currentPages,
            month,
            setMonth,
            year,
            setYear,
            selectedDate,
            setSelectedDate,
            addTaskStatus,
            setAddTaskStatus,
            editTaskStatus,
            setEditTaskStatus,
            viewTaskStatus,
            setViewTaskStatus,
            selectedItem,
            setSelectedItem,
            currentPage,
            setCurrentPage,
            nextMonth,
            previousMonth,
            goToToday,
            createTask,
            updateTask,
            deleteTask,
            updateTaskCompleted,
          }}
        >
          {children}
        </appContext.Provider>
      );
    };
    