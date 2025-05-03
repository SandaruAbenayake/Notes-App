import React, { useState } from "react";
import TagInput from "../../components/Inputs/TagInput";

const AddEditNotes = () => {
  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <lable className=" ">TITLE</lable>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go to Gym at 5.AM"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        ></input>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        ></textarea>
      </div>
      <div className="mt-3">
        <lable className="input-label">TAGS</lable>
        <TagInput tags={tags}  setTags={setTags}/>
      </div>
      <button className="btn-primary font-medium mt-5 p-3" onClick={() => {}}>
        ADD
      </button>
    </div>
  );
};

export default AddEditNotes;
