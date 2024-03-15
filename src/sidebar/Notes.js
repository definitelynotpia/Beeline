// react
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
// firebase
import { db, auth } from "../firebase/Firebase";
import { collection, doc, getDoc, getDocs, addDoc, deleteDoc, updateDoc, query, onSnapshot } from "firebase/firestore";
// wysiwyg editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// html parser
import parse from 'html-react-parser';

export default function Notes() {
    const uid = auth.currentUser.uid;
    // notes data
    const [notes, setNotes] = useState(null);
    const [title, setTitle] = useState("New note");
    const [content, setContent] = useState("");
    const [noteId, setNoteId] = useState("");
    // check if user is writing notes
    const [writing, isWriting] = useState(false);
    const [editing, isEditing] = useState(false);
    // store firestore path
    const notesRef = collection(db, "Users", uid, "Notes");

    // create new note
    const createNote = async () => {
        const today = new Date();
        const hour = ((today.getHours() > 12) ? (today.getHours() - 12) : (today.getHours()));
        const timestamp = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear() + " " + hour + ":" + today.getMinutes() + ((today.getHours() > 12) ? " PM" : " AM");
        await addDoc(collection(db, "Users", uid, "Notes"), {
            title: title,
            content: content,
            timestamp: timestamp,
            owner: auth.currentUser.displayName,
            isPinned: false,
        });
        isWriting(false);
        isEditing(false);
        setTitle("");
        setContent("");
    };

    const updateNote = async () => {
        const today = new Date();
        const hour = ((today.getHours() > 12) ? (today.getHours() - 12) : (today.getHours()));
        const timestamp = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear() + " " + hour + ":" + today.getMinutes() + ((today.getHours() > 12) ? " PM" : " AM");
        console.log("updating note", noteId);
        const noteRef = doc(db, "Users", uid, "Notes", noteId);
        await updateDoc(noteRef, {
            title: title,
            content: content,
            timestamp: timestamp,
            owner: auth.currentUser.displayName,
            isPinned: false,
        });
        isWriting(false);
        isEditing(false);
        setTitle("");
        setContent("");
        setNoteId("");
    };

    // delete selected note
    const handleDelete = async (id) => {
        const noteRef = doc(db, "Users", uid, "Notes", id);
        await deleteDoc(noteRef);
    };

    const handleUpdate = async (id) => {
        const docSnap = await getDoc(doc(db, "Users", uid, "Notes", id));
        var note = [];
        note = docSnap.data();
        setTitle(note.title);
        setContent(note.content);
        setNoteId(id);
        isEditing(true);
    };

    const setPin = async (id, isPinned) => {
        const noteRef = doc(db, "Users", uid, "Notes", id);
        await updateDoc(noteRef, {
            isPinned: !isPinned,
        }).then(response => {
            alert("updated")
        }).catch(error => {
            console.log(error.message)
        })
    };

    useEffect(() => {
        const getNotes = () => {
            getDocs(notesRef)
                .then((snapshot) => {
                    let results = [];
                    console.log(snapshot);
                    snapshot.docs.forEach(doc => {
                        results.push({ id: doc.id, ...doc.data() });
                    });
                    setNotes(results);
                })
        };

        onSnapshot(query(notesRef), (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    console.log("New city: ", change.doc.data());
                    getNotes();
                }
                if (change.type === "modified") {
                    getNotes();
                }
                if (change.type === "removed") {
                    console.log("Removed city: ", change.doc.data());
                    getNotes();
                }
            });
        });
    }, [])

    return <div className="notes-page">
        {/* notes form */}
        <div className="card my-5" style={{ width: "50vw", borderRadius: "15px" }}>
            <form id="new-note">
                <div className="card-body p-3">
                    {/* Title */}
                    <input className="text-center fw-bold border-1 border-secondary-subtle border-top-0 border-start-0 border-end-0 mt-3 mb-4" style={{ width: "100%", marginLeft: "auto", fontSize: "20px" }}
                        name="title" id="email" value={title} onChange={(e) => setTitle(e.target.value)} />

                    {/* Content */}
                    <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(e, editor) => {
                            isWriting(true);
                            const data = editor.getData();
                            setContent(data);
                        }}
                    />

                    {/* Collaborators */}
                    <div className="d-flex justify-content-end align-items-end mt-3 me-2">
                        {(writing && <button type="button" className="btn btn-outline-dark btn-warning me-2" style={{ fontSize: "18px" }} onClick={(editing) ? (updateNote) : (createNote)}>
                            <i className="fa fa-check"></i>
                        </button>)}
                    </div>
                </div>
            </form>
        </div>

        {/* notes list */}
        <div className="d-flex flex-wrap justify-content-center">
            {notes && notes.map(note =>
                <div key={note.id} className="card m-2" style={{ width: "450px", height: "100%", maxHeight: "450px", borderRadius: "15px" }}>
                    <div className="card-body p-3">
                        {/* Title, Author */}
                        <div className="text-start">
                            <i type="button" className={(note.isPinned && "star fa fa-star me-2 text-warning") || ("star fa fa-star me-2 text-secondary")} style={{ fontSize: "20px" }}></i>
                            <span className="me-3 fw-bold" style={{ fontSize: "20px" }}>{note.title}</span>
                        </div>
                        <div className="text-start" style={{ fontSize: "16px" }}><b>{note.owner}</b> {note.timestamp}</div>
                        <hr />
                        {/* HTML Content parsednpm i react-html-parser */}
                        <div className="text-start" id="note-content" style={{ fontSize: "18px" }}>{parse(note.content)}</div>
                        <hr />
                        {/* Collaborators */}
                        <div className="d-flex justify-content-end align-items-end me-2">
                            <button type="button" className="btn btn-outline-dark btn-warning me-2" style={{ fontSize: "18px" }} onClick={() => handleDelete(note.id)} >
                                <i className="fa fa-trash"></i>
                            </button>
                            <button type="button" className="btn btn-outline-dark btn-warning me-2" style={{ fontSize: "18px" }} onClick={() => handleUpdate(note.id)}>
                                <i className="fa fa-pencil"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    </div >;
}