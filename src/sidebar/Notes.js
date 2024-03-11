// react
import { useEffect, useState } from 'react';
// firebase
import { db, auth } from "../firebase/Firebase";
import { collection, doc, getDoc, addDoc, serverTimestamp } from "firebase/firestore";
// wysiwyg editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Notes() {
    const uid = auth.currentUser.uid;

    const [userData, setUserData] = useState([]);
    // notes data
    const [title, setTitle] = useState("New note");
    const [content, setContent] = useState("");
    const [timestamp, setTimestamp] = useState("");
    const [collaborators, setCollaborators] = useState("");
    // check if user is editing notes
    const [editing, isEditing] = useState(false);

    useEffect(() => {
        const fetchDocById = async () => {
            // Create DocumentReference
            const docRef = doc(db, "Users", uid) // db = getFirestore()
            // Fetch document
            getDoc(docRef)
                .then(docSnap => {
                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    }
                });
        };
        fetchDocById();
    }, [uid]);

    const createNote = async () => {
        const docRef = await addDoc(collection(db, "Notes"), {
            title: title,
            content: content,
            timestamp: serverTimestamp(),
            ownerId: uid
        });
        console.log("New note ID: ", docRef.id);
    };

    return <>
        <div className="notes-page">
            {/* notes form */}
            <div className="card my-4" style={{ width: "25vw", borderRadius: "15px" }}>
                <form id="new-note">
                    <div className="card-body p-3">
                        {/* Title */}
                        <input className="text-center fw-bold border-secondary-subtle border-top-0 border-start-0 border-end-0 mt-3 mb-4" style={{ width: "23.6vw", marginLeft: "auto", fontSize: "20px" }}
                            name="title" id="email" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                        {/* Content */}
                        <CKEditor
                            editor={ClassicEditor}
                            data={"<p>Hey there, " + auth.currentUser.displayName + "! This is your notes.</p>"}
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(e, editor) => {
                                isEditing(true);
                                const data = editor.getData();
                                setContent(data);
                            }}
                            onBlur={(e, editor) => {
                                console.log('Blur.', isEditing, editor);
                            }}
                            onFocus={(e, editor) => {
                                console.log('Focus.', isEditing, editor);
                            }}
                        />
                        {/* Collaborators */}
                        <div className="d-flex justify-content-end align-items-end mt-3 me-2">
                            {(editing && <button type="submit" className="btn btn-outline-dark btn-warning me-2" style={{ fontSize: "18px" }} onClick={createNote}>
                                <i className="fa fa-check"></i>
                            </button>)}
                        </div>
                    </div>
                </form>
            </div>
        </div >
    </>;
}