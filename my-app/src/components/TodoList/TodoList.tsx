import { Typography } from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import TodoCard from "../TodoCard/TodoCard";

type ComponentProps = {
  refreshRef: number;
};
export const TodoList: React.FC<ComponentProps> = ({ refreshRef }) => {
  const limit = 15;

  //post list variable

  const [postList, setPostList] = useState([]);

  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const _getPostList = async () => {
    try {
      const skip = page * limit;
      const url = `${process.env.REACT_APP_API_ORIGIN}/paginatedList?limit=${limit}&skip=${skip}`;
      const response = await axios.get(url, {});
      const data = response.data;

      const count = response.data.result.count;
      setTotalItems(count);

      setPostList(data.result.items);
      console.log("data", data);
    } catch (err) {
      console.error(err);
    }
  };

  const goToNextPage = () => {
    setPage(page + 1);
    console.log("Next page:" + (page + 1));
  };

  const goToPreviousPage = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    _getPostList();
  }, [page, refreshRef]);

  return (
    <div>
      <div>
        {postList.map((v: any, index: number) => {
          return (
            <TodoCard msg={v.msg} category={v.category} key={index}></TodoCard>
          );
        })}
      </div>
      {page == 0 ? (
        <div></div>
      ) : (
        <button onClick={goToPreviousPage}> &#x3c; </button>
      )}

      {totalItems > page * limit ? (
        <button onClick={goToNextPage}> &#x3e; </button>
      ) : (
        <div></div>
      )}

      <div>
        <h4>Page : {page}</h4>
      </div>
    </div>
  );
};
