import { useEffect, useState } from 'react'
import clode from './logo.png'
import { useNavigate } from 'react-router-dom'
import { API } from '../../utils/config'
import { toast, ToastContainer } from 'react-toastify'

function HomePage() {
    const [books, setBooks] = useState<any[]>([])
    const [chosedItem, setChosedItem] = useState<any>()
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [isOpenAdder, setIsOpenAdder] = useState<boolean>(false)
    const [newBookInfo, setNewBookInfo] = useState<string>()

    const [dataToEdit, setDataToEdit] = useState({
        status: 0,
    })

    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("auth")) {
            navigate("/SignUp")
        }
    }, [])

    const getBooks = async () => {
        const res = await API.get("/books")
        return res.data.data
    }

    useEffect(() => {
        getBooks().then((res) => setBooks(res))
    }, [])

    const status = ["new", "Reading", "Finished"]

    async function handleDelete(id: any) {
        API.delete(`/books/${id}`).then(() => {
            toast.success("book deleted successfully")
            getBooks().then((res) => setBooks(res))
        })
    }

    function openModal(el: any) {
        setIsOpenModal(true)
        setChosedItem(el)
    }

    const applyChanges = (id: number) => {
        API.patch(`books/${id}`, dataToEdit).then(() => {
            setIsOpenModal(false)
            toast.success("book edited successfully")
            getBooks().then((res) => setBooks(res))
        })
    }

    const sumbitNewBook = () => {
        API.post("/books", { isbn: newBookInfo }).then(() => {
            toast.success("new book added successfully")
            getBooks().then((res) => setBooks(res))
        })
    }

    const searchBooks = (text: any) => {
        API.get(`/books/${text}`).then((res: any) => {
            setBooks(res.data.data)
        })
    }

    return (
        <div>
            <div className='container'>
                <div className='header'>
                    <div className='leftsideHeder'>
                        <img src={clode} alt="Logo" />
                        <input
                            type="text"
                            placeholder="🔎 search for anything you want"
                            onChange={(e) => searchBooks(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <div className='books-top'>
                        <div>
                            <h2>You've got</h2> <span>{books.length} books</span>
                        </div>
                        <button onClick={() => setIsOpenAdder(true)}>+ Create a book</button>
                    </div>
                    <div className='booksList'>
                        <h4>Your books today</h4>
                        <ul>
                            {books.map((el) => (
                                <div key={el._id} className='books-item'>
                                    <div className='book-item-info'>
                                        <h5>{el.title}</h5>
                                        <div className='characteristics'>
                                            <span>Cover: {el.cover}</span>
                                            <span>Pages: {el.pages}</span>
                                            <span>Published: {new Date(el.published).getFullYear()}</span>
                                            <span>ISBN: {el.isbn}</span>
                                        </div>
                                        <div className='statuscha'>
                                            <p>Eben Upton / 2012</p>
                                            <span className={status[el.status - 1]}>
                                                {status[el.status - 1]}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='someInvisThings'>
                                        <button className='delTh' onClick={() => handleDelete(el._id)}>X</button>
                                        <button className='editTh' onClick={() => openModal(el)}>✒️</button>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className={isOpenModal ? 'modal-opened' : 'closed-modal'}>
                <div className='modal-content'>
                    <select name="status" onChange={(el) => setDataToEdit({ status: Number(el.target.value) })}>
                        {status.map((el, index) => (
                            <option
                                key={index}
                                selected={chosedItem?.status === index + 1}
                                value={index + 1}
                            >
                                {el}
                            </option>
                        ))}
                    </select>
                    <button className='modalBtn' onClick={() => applyChanges(chosedItem?._id)}>Apply Changes</button>
                    <button className='modalBtn' onClick={() => setIsOpenModal(false)}>Discard Changes</button>
                    <button className='modalBtn' onClick={() => setIsOpenModal(false)}>Close</button>
                </div>
            </div>

            <div className={isOpenAdder ? 'modal-opened' : 'closed-modal'}>
                <div className='modal-content'>
                    <input
                        className='modalInp'
                        onChange={(e) => setNewBookInfo(e.target.value)}
                        type="text"
                        placeholder="Enter ISBN"
                    />
                    <button className='modalBtn' onClick={sumbitNewBook}>Submit</button>
                    <button className='modalBtn' onClick={() => setIsOpenAdder(false)}>Close</button>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default HomePage