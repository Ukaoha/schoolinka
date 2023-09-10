'use client'
import React , { useState, Context, Dispatch, SetStateAction, createContext, useEffect}from  "react"; 
import { TaskDataValue , taskDataSet} from '@/data';


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


    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear())
    const [viewTaskStatus, setViewTaskStatus] = useState(false)
    const [editTaskStatus, setEditTaskStatus] = useState(false)
    const [addTaskStatus, setAddTaskStatus] = useState(false)
    const [selectedDate, setSelectedDate] = useState(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`)
    // const [selectedItem, setSelectedItem] = useState<TaskDataFace | EmptyObject>({})
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

    const [taskData, setTaskData] = useState(taskDataSet)
    // const taskData = taskDataSet

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
        setYear(() => new Date().getFullYear())
        setMonth(() => new Date().getMonth() + 1)
        setSelectedDate(() => `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`)
    }

    const createTask = ({ title, date, time, alarmMin, completed}: TaskDataValueWithoutIds) => {
        const id = taskData.length + 1
        setTaskData((prev: Array<TaskDataValue>) =>  [
            ...prev,
            {
                id,
                title,
                date,
                time,
                alarmMin,
                completed
            }
        ])
    }

    const updateTask = ({ id, title, date, time, alarmMin, completed}: TaskDataValueWithoutIds) => {
        let position = taskData.findIndex(item => item.id == id)
        if(position != -1) {
            // setTaskData((prev: Array<TaskDataFace>) => [])
            setTaskData((prev: Array<TaskDataValue>) => {
                const newTaskData = prev.map((item, index) => {
                    if (index != position) {
                        // 
                        console.log(index, "Index")
                        console.log(position, "Position")
                        return item
                    } else {
                        if (title.length < 4) {
                            return {
                                ...item,
                                date,
                                time,
                                alarmMin,
                                completed,
                            }
                        }
                        return {
                            ...item,
                            title,
                            date,
                            time,
                            alarmMin,
                            completed,
                        }
                    }
                })

                    return newTaskData;
            })
        }
    }

    const updateTaskCompleted = (completed: boolean, id: number) => {
        let position = taskData.findIndex(item => item.id == id)
        if(position != -1) {
            // setTaskData((prev: Array<TaskDataFace>) => [])
            setTaskData((prev: Array<TaskDataValue>) => {
                const newTaskData = prev.map((item, index) => {
                    if (index != position) {
                        // 
                        // console.log(index, "Index")
                        // console.log(position, "Position")
                        return item
                    } else {
                        console.log("found")
                        console.log(item)
                        console.log("found")
                        return {
                            ...item,
                            completed,
                        }
                    }
                })

                console.log(newTaskData)

                return newTaskData;
            })
        }
    }

    const deleteTask = (id: number) => {
        const newArr: Array<TaskDataValue> = taskData.filter(item => item.id != id)
        
        setTaskData(() => newArr)
    }

    const previousMonths = () => {}

    



    


    return (
        <appContext.Provider value={{
          hello: "hello",
          taskData,
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
        }}>{children}</appContext.Provider>
      )
}