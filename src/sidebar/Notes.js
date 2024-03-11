// react
import { useEffect, useState } from 'react';
// firebase
import { db, auth } from "../firebase/Firebase";
import { collection, doc, getDoc, getDocs, addDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
// wysiwyg editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// html parser
import parse from 'html-react-parser';

export default function Notes() {
    const uid = auth.currentUser.uid;
    // notes data
    const [notes, setNotes] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    // check if user is editing notes
    const [editing, isEditing] = useState(false);
    // store firestore path
    const notesRef = collection(db, "Users", uid, "Notes");
    // const userRef = doc(db, "Users", uid);

    // create new note
    const createNote = async () => {
        await addDoc(collection(db, "Users", uid, "Notes"), {
            title: title,
            content: content,
            timestamp: serverTimestamp(),
            owner: auth.currentUser.displayName,
        });
        isEditing(false);
        setTitle("");
        setContent("");
    };

    // delete selected note
    const handleDelete = async (id) => {
        const noteRef = doc(db, "Users", uid, "Notes", id);
        await deleteDoc(noteRef);
    };

    useEffect(() => {
        getDocs(notesRef)
            .then((snapshot) => {
                let results = []
                console.log(snapshot)
                snapshot.docs.forEach(doc => {
                    results.push({ id: doc.id, ...doc.data() });
                });
                setNotes(results);
            })
    }, [])

    return <div className="notes-page">
        {/* notes form */}
        <div className="card my-5" style={{ width: "25vw", borderRadius: "15px" }}>
            <form id="new-note">
                <div className="card-body p-3">
                    {/* Title */}
                    <input className="text-center fw-bold border-secondary-subtle border-top-0 border-start-0 border-end-0 mt-3 mb-4" style={{ width: "23.6vw", marginLeft: "auto", fontSize: "20px" }}
                        name="title" id="email" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />

                    {/* Content */}
                    <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(e, editor) => {
                            isEditing(true);
                            const data = editor.getData();
                            setContent(data);
                        }}
                    />

                    {/* Collaborators */}
                    <div className="d-flex justify-content-end align-items-end mt-3 me-2">
                        {(editing && <button type="button" className="btn btn-outline-dark btn-warning me-2" style={{ fontSize: "18px" }} onClick={createNote}>
                            <i className="fa fa-check"></i>
                        </button>)}
                    </div>
                </div>
            </form>
        </div>

        {/* notes list */}
        <div className="d-flex flex-wrap justify-content-center">
            {notes && notes.map(note =>
                <div key={note.id} className="card my-2 mx-2" style={{ width: "500px", borderRadius: "15px" }}>
                    <div className="card-body p-3">
                        {/* Title, Author */}
                        <div className="text-start mb-3"><span className="me-3 fw-bold" style={{ fontSize: "20px" }}>{note.title}</span><span className="fst-italic" style={{ fontSize: "16px" }}>Owned by <b>{note.owner}</b></span></div>
                        <hr className="my-3" />
                        {/* HTML Content parsednpm i react-html-parser */}
                        <div className="text-start" style={{ fontSize: "18px" }}>{parse(note.content)}</div>
                        <hr className="my-3" />
                        {/* Collaborators */}
                        <div className="d-flex justify-content-end align-items-end me-2">
                            <button type="button" className="btn btn-outline-dark btn-warning me-2" style={{ fontSize: "18px" }} onClick={() => handleDelete(note.id)} >
                                <i className="fa fa-trash"></i>
                            </button>
                            <button type="button" className="btn btn-outline-dark btn-warning me-2" style={{ fontSize: "18px" }}>
                                <i className="fa fa-pencil"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    </div >;
}