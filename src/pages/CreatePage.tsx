import Navbar from "../components/Navbar.tsx";
import React, {useState} from "react";
import axios from "axios";

interface CreateTodo {
    userId:number,
    id:number,
    title:string,
    completed:boolean,
}
const CreatePage = () => {
    const [data, setData] = useState<CreateTodo>({
        userId:1,
        id:1,
        title:"",
        completed:false
    })

    const postData = async (data: CreateTodo) => {
        try{
            const res = await axios.post("https://jsonplaceholder.typicode.com/posts",data)
            console.log("Data" , res)

        }catch (e){
            console.log("Post request failed ", e)
        }
    }

    const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value);
        setData((prevData) => ({
            ...prevData,
            userId: newValue,
        }));
    };

    const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value);
        setData((prevData) => ({
            ...prevData,
            id: newValue,
        }));
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setData((prevData) => ({
            ...prevData,
            title: newValue,
        }));
    };

    const handleCompletedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.checked;
        setData((prevData) => ({
            ...prevData,
            completed: newValue,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        postData(data);
        console.log(data);
        setData({
            userId:1,
            id:1,
            title:"",
            completed:false
        })
    }
    return (
        <div>
            <Navbar/>
                <div className="flex w-full justify-center items-center bg-white dark:bg-gray-700" style={{height:"92.4vh"}}>
                    <form className="w-2/4 border p-2 rounded-lg bg-gray-100 dark:bg-gray-800" onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="userid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User ID</label>
                            <input
                                type="number"
                                id="userid"
                                value={data.userId}
                                onChange={handleUserIdChange}
                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="todoid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Todo ID</label>
                            <input
                                type="number"
                                id="todoid"
                                value={data.id}
                                onChange={handleIdChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input type="text"
                                   id="title"
                                   value={data.title}
                                   onChange={handleTitleChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="title" required />
                        </div>
                        <div className="flex items-start mb-5">
                            <div className="flex items-center h-5">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={data.completed}
                                    onChange={handleCompletedChange}
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                            </div>
                            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Completed</label>
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
        </div>
    );
};

export default CreatePage;