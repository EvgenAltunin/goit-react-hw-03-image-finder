import { LoadMoreBtn } from "components/Button/Button.styled";

export const Button = ({ onLoadMoreBtnClick }) => (
  <LoadMoreBtn type="button" onClick={onLoadMoreBtnClick}>
    Load more
  </LoadMoreBtn>
);
