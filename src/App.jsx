import { changePage, fetchAllUser } from './redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import { Pagination } from 'antd';
import { Skeleton } from 'antd';
import { useEffect } from 'react';

function App() {
  const users = useSelector((state) => state.userSlice.content);

  const number = useSelector((state) => state.userSlice.number);
  const total = useSelector((state) => state.userSlice.total);
  const size = useSelector((state) => state.userSlice.size);

  const isLoading = useSelector((state) => state.userSlice.isLoading);

  const handleChangPage = (page, pageSize) => {
    console.log(page);
    dispatch(changePage(page - 1));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUser({ page: number }));
  }, [number, size, dispatch]);
  return (
    <>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <div>
          <div>
            {users.map((item) => (
              <p key={item.id}> {item.name} </p>
            ))}
          </div>
        </div>
      )}
      <Pagination current={number + 1} total={total} pageSize={size} onChange={handleChangPage} />
    </>
  );
}

export default App;
