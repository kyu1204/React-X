import styled from 'styled-components';
import EditTweetForm from './edit-tweet-form';
import { ITweet } from './timeline';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const Wrapper = styled.div`
  display: flex;
  width: 500px;
  justify-content: center;
  align-items: center;
`;

interface IEditProps {
  tweet: ITweet;
  onClose: () => void;
}

export default function EditModal({ tweet, onClose }: IEditProps) {
  return (
    <ModalBackground onClick={onClose}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <EditTweetForm key={tweet.id} {...tweet} />
      </Wrapper>
    </ModalBackground>
  );
}
