import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/inertia-react';
import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/inertia-react';


export default function Dashboard(props) {
    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [isNotif, setIsNotif] = useState(false)

    // data edit
    const [idEdit, setIdEdit] = useState('')
    const [titleEdit, setTitleEdit] = useState('')
    const [descriptionEdit, setDescriptionEdit] = useState('')
    const [categoryEdit, setCategoryEdit] = useState('')

    const handleSubmit = () => {
        const data = {
            title, description, category
        }
        Inertia.post('/news', data)

        setIsNotif(true)
        setTitle('')
        setDescription('')
        setCategory('')
        document.querySelector('#modal-tambah').checked = false;
    }

    const handleGetEdit = (idEdit, titleEdit, descriptionEdit, categoryEdit) => {
        setIdEdit(idEdit)
        setTitleEdit(titleEdit)
        setDescriptionEdit(descriptionEdit)
        setCategoryEdit(categoryEdit)
    }

    const handleEditSubmit = () => {
        const data = {
            id:idEdit, title : titleEdit, description: descriptionEdit, category:categoryEdit
        }

        Inertia.post(`/news/update`, data)
        setIsNotif(true)
        setTitleEdit('')
        setDescriptionEdit('')
        setCategoryEdit('')
        document.querySelector('#modal-edit').checked = false;

    }

    const handleDeleteSubmit = () => {
        Inertia.get(`/news/destroy/${idEdit}`)
        setIsNotif(true)
        document.querySelector('#modal-destroy').checked = false;
    }
    
    useEffect(() => {
        if(!props.myNews) {
            Inertia.get('/news')
        }
        return
    }, [])

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Berita Saya</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                    <div className="p-6 bg-white border-b border-gray-200">
                        <label htmlFor="modal-tambah" className='btn btn-primary m-2'>Tambah Data</label>
                        {isNotif &&
                            <div className="alert alert-success shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{props.flash.message}</span>
                                </div>
                            </div>
                        }
                        
                    </div>
                </div>
                <div className='p-4'>
                    <div className='not-prose grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3'>
                        
                    {props.myNews.length > 0 ? props.myNews.map((news, i) => {
                        return (
                            <div key={i} className="card flex flex-row w-full lg:w-96 bg-base-100 shadow-xl m-2">
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {news.title}
                                        <div className="badge badge-secondary">NEW</div>
                                    </h2>
                                    <p>{news.description}</p>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-inline">{news.category}</div>
                                        <label htmlFor='modal-edit' onClick={() => handleGetEdit(news.id, news.title, news.description, news.category)} className="badge badge-outline cursor-pointer hover:bg-slate-400">edit</label>
                                        <label htmlFor='modal-destroy' onClick={(idEdit) => setIdEdit(news.id)} className="badge badge-outline cursor-pointer hover:bg-slate-400">delete</label>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <p>Tidak ada data</p>}
                    </div>
                </div>
                <div>

                    {/* modal tambah */}
                    <input type="checkbox" id="modal-tambah" className="modal-toggle" />
                    <label htmlFor="modal-tambah" className="modal cursor-pointer">
                        <label className="modal-box relative" htmlFor="">
                            <h3 className="text-lg font-bold">Tambah Berita</h3>
                            <input value={title} onChange={(title) => setTitle(title.target.value)} type="text" placeholder="Judul" className="m-2 input input-bordered w-full" />
                            <input value={description} onChange={(description) => setDescription(description.target.value)} type="text" placeholder="Deskripsi" className="m-2 input input-bordered w-full" />
                            <input value={category} onChange={(category) => setCategory(category.target.value)} type="text" placeholder="Kategori" className="m-2 input input-bordered w-full" />
                            <button onClick={() => handleSubmit()} className='btn btn-primary m-2'>Save</button>
                        </label>
                    </label>


                    {/* modal edit */}
                    <input type="checkbox" id="modal-edit" className="modal-toggle" />
                    <label htmlFor="modal-edit" className="modal cursor-pointer">
                        <label className="modal-box relative" htmlFor="">
                            <h3 className="text-lg font-bold">Edit Berita</h3>
                            <input value={titleEdit} onChange={(titleEdit) => setTitleEdit(titleEdit.target.value)} type="text" placeholder="Judul" className="m-2 input input-bordered w-full" />
                            <input value={descriptionEdit} onChange={(descriptionEdit) => setDescriptionEdit(descriptionEdit.target.value)} type="text" placeholder="Deskripsi" className="m-2 input input-bordered w-full" />
                            <input value={categoryEdit} onChange={(categoryEdit) => setCategoryEdit(categoryEdit.target.value)} type="text" placeholder="Kategori" className="m-2 input input-bordered w-full" />
                            <button onClick={() => handleEditSubmit()} className='btn btn-primary m-2'>Save / Edit</button>
                        </label>
                    </label>

                    {/* modal hapus */}
                    <input type="checkbox" id="modal-destroy" className="modal-toggle" />
                    <label htmlFor="modal-destroy" className="modal cursor-pointer">
                        <label className="modal-box relative" htmlFor="">
                            <h3 className="text-lg font-bold">Apakah yakin ingin dihapus ?</h3>
                            
                            <button onClick={() => handleDeleteSubmit()} className='btn btn-danger m-2'>Delete</button>
                        </label>
                    </label>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
