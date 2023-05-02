import React from 'react';
import {useSelector} from "react-redux";

const NoteItem = ({note, noteExists}) => {

    const {user} = useSelector((state) => {
        return state.auth;
    });

    const noteStyle = (isStaff) => {
        if (isStaff) {
            return "dark-gray text-light"
        }
    };


    if (noteExists) {
        return (
            <div className={`${noteStyle(note.isStaff)} my-2 p-3 w-100 border d-flex flex-column align-items-start`}>
                <div className={`w-100 d-flex flex-row justify-content-between`}>
                    <div className={"fw-bold"}>
                        Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}
                    </div>
                    <div>
                        {new Date(note.createdAt).toLocaleString("en-US")}
                    </div>
                </div>
                {note.note}
            </div>
        );
    } else {
        return (
            <div className={`my-2 p-3 w-100 border d-flex flex-column align-items-start`}>
                <div className={`w-100 d-flex flex-row justify-content-between`}>
                    <div className={""}>
                        No Notes Found
                    </div>
                </div>
            </div>
        )
    }


};

export default NoteItem;