import Navbar from "../components/Navbar.tsx";
import axios from "axios";
import React, {ChangeEvent, useEffect, useState} from "react";


interface Todo {
    userId:number;
    id: number;
    title: string;
    completed: boolean;
}
interface TodoSearch {
    value:string;
    onChange: (value: string) => void;
}
const SearchInput:React.FC<TodoSearch> = ({value,onChange}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };
    return(
        <div className="w-full flex justify-center items-center px-2">
            <div className="min-w-80 max-w-lg">
                <form className="min-w-full max-w-full mt-2">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search"
                               id="default-search"
                               value={value}
                               onChange={handleChange}
                               className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Todos..." required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
            </div>
        </div>

    )
}
const HomePage: React.FC = () => {
    const [todoData, setTodoData] = useState<Todo[]>([]);
    const [todoError, setTodoError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [search,setSearch] = useState<string>("");

    const getData = async () => {
        try {
            const res = await axios.get<Todo|Todo[]>(`https://jsonplaceholder.typicode.com/todos/${search}`);
            const resData:Todo[] = Array.isArray(res.data)? res.data : [res.data];
            console.log("Data ", resData);
            setTodoData(resData);
        } catch (e) {
            console.log("GetData error ", e);
            setTodoError("Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        getData();
    }, [search]);
    const handleInputChange = (value: string) => {
        setSearch(value);
    };


    return (
        <div>
            <Navbar/>
            <div className="flex flex-wrap w-full justify-center bg-white dark:bg-gray-700">
                {loading ? (
                    <div className="text-center">
                        <div role="status">
                            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : todoError ? (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">Error alert!</span> {todoError}
                    </div>
                ) : (
                    <>
                        <SearchInput value={search} onChange={handleInputChange}/>
                        <div className="flex flex-wrap justify-center w-full gap-2 mt-2">
                            {todoData.map(todo => (
                                <div key={todo.id} className="p-2 min-w-80 max-w-80 text-center bg-gray-100 border rounded-lg dark:text-white dark:bg-gray-800 dark:border ">
                                    <div className="w-full flex justify-between items-center flex-wrap p-1 bg-gray-300 rounded-lg dark:bg-gray-600">
                                        <div>
                                            UsetId: {todo.userId}
                                        </div>
                                        {todo.completed === true ?
                                            (
                                                <div className="p-1 bg-green-600 text-white rounded-lg">
                                                    {todo.completed.toString()}
                                                </div>
                                            )
                                            :
                                            (
                                                <div className="p-1 bg-red-600 text-white rounded-lg">
                                                    {todo.completed.toString()}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div >{todo.title}</div>
                                </div>
                            ))}
                        </div>

                    </>
                )}
            </div>
        </div>
    );
};

export default HomePage;
