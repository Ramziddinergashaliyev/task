import React, { FC, useState, ChangeEvent, FormEvent } from "react";
import { useCreateUsersMutation, useGetUsersQuery } from "../../context/api/userApi";
import "./contract.scss";
import { FiSearch } from "react-icons/fi";
import { CiMenuKebab } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { Pagination } from "antd";
import { useGetCoursesQuery } from "../../context/api/courses";

interface User {
  id: number;
  attachment?: {
    origName: string;
  };
  course: {
    id: number;
    name: string;
  };
}

interface Course {
  id: number;
  name: string;
}

const initialState = {
  title: "",
  courseId: "",
};

const Contract: FC = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [close, setClose] = useState(false);
  const [createKurs] = useCreateUsersMutation();

  const [create, setCreate] = useState(initialState);

  const { data: kurs } = useGetCoursesQuery({ limit: 100 });

  const { data, isLoading, error } = useGetUsersQuery({
    page,
    perPage: limit,
    search,
  });

  const users: User[] = data?.data?.contracts || [];
  const totalItems = data?.data?.total || 0;

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setCreate((prevState) => ({
      ...prevState,
      [name]: name === "courseId" ? parseInt(value, 10) || "" : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    createKurs(create);
    setCreate(initialState);
    setClose(false);
  };

  if (isLoading) {
    return <div className="contract-loading">Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="contract container">
      <div className="contract__top">
        <div className="contract__top__search">
          <FiSearch />
          <input
            placeholder="Qidirish..."
            type="text"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <button onClick={() => setClose(true)}>Qo'shish</button>
        <div className={`contract__create ${close ? "contract__create-hide" : ""}`}>
          <form onSubmit={handleSubmit} className="contract__create-form">
            <div className="contract__create__top">
              <h3>Shartnoma yaratish</h3>
              <button
                type="button"
                className="contract__create__top-btn"
                onClick={() => setClose(false)}
              >
                <IoMdClose />
              </button>
            </div>
            <label>
              Kurs
              <select
                name="courseId"
                id="courses"
                value={create.courseId}
                onChange={handleChange}
              >
                <option value="">Kurs tanlang</option>
                {kurs?.data?.courses.map((course: Course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Nomi
              <input
                type="text"
                name="title"
                value={create.title}
                onChange={handleChange}
              />
            </label>

            <input className="contract__file" type="file" />

            <div className="contract__create-form__btn">
              <button type="button" onClick={() => setClose(false)}>
                Bekor qilish
              </button>
              <button type="submit">Qo'shish</button>
            </div>
          </form>
        </div>
        {close && <div onClick={() => setClose(false)} className="contract__overlay"></div>}
      </div>
      <div className="contract__bottom">
        <table border={1}>
          <thead>
            <tr>
              <th>#</th>
              <th>Nomi</th>
              <th>Kurs</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{(page - 1) * limit + index + 1}</td>
                  <td>{user.attachment?.origName}</td>
                  <td>{user.course.name}</td>
                  <td>
                    <button>
                      <CiMenuKebab />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ borderBottom: "none" }}>
                  <h2>Hech nima topilmadi</h2>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="contract__page">
          <Pagination
            current={page}
            pageSize={limit}
            total={totalItems}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Contract;
