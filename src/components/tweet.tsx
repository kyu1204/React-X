import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import EditModal from "./edit-tweet-modal";

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255 , 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const HamburgerButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 20px;
  display: flex;
  flex-direction: flex-end;
  justify-content: space-around;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  div {
    width: 5px;
    height: 5px;
    background-color: #333;
    border-radius: 5px;
    transform-origin: 1px;
    position: relative;
  }
`;

const Menu = styled.ul`
  position: absolute;
  top: 40px;
  right: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  list-style-type: none;
  margin: 0;
  z-index: 1000;
`;

interface MenuItemProps {
  isColor: string;
}
const MenuItem = styled.li<MenuItemProps>`
  padding: 5px 10px;
  color: ${({ isColor }) => isColor};
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default function Tweet(tweet: ITweet) {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const user = auth.currentUser;

  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");

    if (!ok || user?.uid !== tweet.userId) return;

    try {
      await deleteDoc(doc(db, "tweets", tweet.id));
      if (tweet.photo) {
        const storageRef = ref(storage, `tweets/${tweet.userId}/${tweet.id}`);
        await deleteObject(storageRef);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onEdit = () => {
    setModalOpen(true);
  };

  return (
    <Wrapper>
      <Column>
        <Username>{tweet.username}</Username>
        <Payload>{tweet.tweet}</Payload>
      </Column>
      <Column>
        <HamburgerButton onClick={() => setOpen(!open)}>
          <div />
          <div />
          <div />
        </HamburgerButton>
        {open && user?.uid === tweet.userId ? (
          <Menu>
            <MenuItem isColor="tomato" onClick={onDelete}>Delete</MenuItem>
            <MenuItem isColor="black" onClick={onEdit}>Edit</MenuItem>
          </Menu>
        ) : null}

        {isModalOpen && <EditModal tweet={tweet} onClose={() => setModalOpen(false)} />}
      </Column>
      <Column>
        {
          tweet.photo ? (
            <Photo src={tweet.photo} />
          ) : null
        }
      </Column>
    </Wrapper>
  );
}
