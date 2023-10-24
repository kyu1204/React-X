import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components"
import { auth, db, storage } from "../firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ITweet } from "./timeline";


const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 5fr;
  gap: 50px;
  width: 40vw;
  height: 50vh;
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid while;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", 
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", 
      sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitButton = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

const MB = 1 * 1024 * 1024;


export default function EditTweetForm({ id, tweet }: ITweet) {
  const [isLoading, setLoading] = useState(false);
  const [newTweet, setTweet] = useState(tweet);
  const [file, setFile] = useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      if (files[0].size > 5 * MB) return alert("File size must be under 5MB");
      setFile(files[0]);
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || newTweet === "" || newTweet.length > 180) return;
    try {
      setLoading(true);
      const currentDoc = doc(db, "tweets", id);

      await updateDoc(currentDoc, {
        newTweet,
      });

      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(locationRef);

        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(currentDoc, {
          photo: url,
        });
      }
      setFile(null);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <TextArea
          required
          rows={5}
          maxLength={180}
          onChange={onChange}
          value={tweet}
          placeholder="What is happening?!"
        />
        <AttachFileButton htmlFor="file">
          {file ? "Photo added ✅" : "Add photo"}
        </AttachFileButton>
        <AttachFileInput
          onChange={onFileChange}
          id="file"
          accept="image/*"
          type="file"
        />
        <SubmitButton
          type="submit"
          value={isLoading ? "Posting..." : "Post Tweet"}
        />
      </Form>
    </Wrapper>
  );
}
