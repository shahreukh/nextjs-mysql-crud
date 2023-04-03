import { useContext, useState } from 'react';
import Alert from './Alert';
import Navbar from './Navbar';
import Pagination from './Pagination';
import UsersTable from './UsersTable';
import AppContext from '@/context/appContext';
import { Paginate } from '@/helpers/paginate';
import { Search } from '@/helpers/search';
import CheckedContext from '@/context/checkedContext';

function Layout() {
  const value = useContext(AppContext);

  const [checkedUser, setCheckedUser] = useState([]);
  console.log(checkedUser);
  const [alertMessage, setAlertMessage] = useState('');
  const [saveUser, setSaveUser] = useState({
    uuid: '',
    beginPosition: '',
    interpretation: '',
    sequenceNumber: '',
    correctionNumber: '',
    name: '',
    type: '',
    lighted: '',
    group: '',
    position: '',
    elevation: '',
  });
  const [editUser, setEditUser] = useState({
    id: '',
    uuid: '',
    beginPosition: '',
    interpretation: '',
    sequenceNumber: '',
    correctionNumber: '',
    name: '',
    type: '',
    lighted: '',
    group: '',
    position: '',
    elevation: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  let searchedResult;
  let paginatedUsers;
  if (searchQuery.length > 0) {
    searchedResult = Search(value.users, searchQuery);
    paginatedUsers = Paginate(searchedResult, currentPage, pageSize);
  } else {
    paginatedUsers = Paginate(value.users, currentPage, pageSize);
  }

  const handleSaveChange = ({ target: { name, value } }) => {
    setSaveUser({ ...saveUser, [name]: value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const reqOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(saveUser),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/users/`,
      reqOption
    );
    const result = await response.json();

    setSaveUser({
      uuid: '',
      beginPosition: '',
      interpretation: '',
      sequenceNumber: '',
      correctionNumber: '',
      name: '',
      type: '',
      lighted: '',
      group: '',
      position: '',
      elevation: '',
    });

    if (result) {
      setAlertMessage('Veriler başarıyla eklendi');
      document.getElementsByClassName('addCancel')[0].click();
      const prevUsers = value.users;
      prevUsers.push(result);

      value.setMyUsers(prevUsers);
    }
  };

  const handleDelete = async (userId) => {
    const reqOption = {
      method: 'DELETE',
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/users/` + userId,
      reqOption
    );
    const result = await response.json();

    if (result) {
      setAlertMessage('Veriler başarıyla silindi');
      const prevUsers = value.users;
      const newUsers = prevUsers.filter((user) => {
        return user.id != userId;
      });
      value.setMyUsers(newUsers);
    }
  };

  const handleEditChange = async ({ target: { name, value } }) => {
    setEditUser({ ...editUser, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const reqOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editUser),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/users/` + editUser.id,
      reqOptions
    );
    const result = await response.json();

    if (result) {
      setAlertMessage('Veriler başarıyla güncellendi');
      document.getElementsByClassName('editCancel')[0].click();

      const prevUsers = value.users.filter((user) => {
        return user.id != editUser.id;
      });
      prevUsers.push(result);
      value.setMyUsers(prevUsers);
    }
  };

  return (
    <>
      <CheckedContext.Provider
        value={{
          checkedUser: checkedUser,
          setCheckedUser: setCheckedUser,
        }}
      >
        <div id="addDataModal" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <form
                onSubmit={handleAddSubmit}
                style={{ backgroundColor: 'rgb(31 41 55)' }}
              >
                <div className="modal-header">
                  <h4 className="modal-title">Yeni Veri Ekle</h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    &times;
                  </button>
                </div>
                <div className="modal-body grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label>UUID</label>
                    <input
                      value={saveUser.uuid}
                      onChange={handleSaveChange}
                      type="text"
                      className="form-control"
                      name="uuid"
                      required
                    />
                    <label>Begin Position</label>
                    <input
                      value={saveUser.beginPosition}
                      onChange={handleSaveChange}
                      type="text"
                      className="form-control"
                      name="beginPosition"
                      required
                    />
                    <label>Interpretation</label>
                    <input
                      value={saveUser.interpretation}
                      onChange={handleSaveChange}
                      type="text"
                      className="form-control"
                      name="interpretation"
                      required
                    />
                    <label>Sequence Number</label>
                    <input
                      value={saveUser.sequenceNumber}
                      onChange={handleSaveChange}
                      type="number"
                      className="form-control"
                      name="sequenceNumber"
                      required
                    />
                    <label>Correction Number</label>
                    <input
                      value={saveUser.correctionNumber}
                      onChange={handleSaveChange}
                      type="number"
                      className="form-control"
                      name="correctionNumber"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      value={saveUser.name}
                      onChange={handleSaveChange}
                      type="text"
                      className="form-control"
                      name="name"
                      required
                    />
                    <label>Type</label>
                    <input
                      value={saveUser.type}
                      onChange={handleSaveChange}
                      type="text"
                      className="form-control"
                      name="type"
                      required
                    />
                    <label>Lighted</label>
                    <input
                      value={saveUser.lighted}
                      onChange={handleSaveChange}
                      type="text"
                      className="form-control"
                      name="lighted"
                      required
                    />
                    <label>Group</label>
                    <input
                      value={saveUser.group}
                      onChange={handleSaveChange}
                      type="text"
                      className="form-control"
                      name="group"
                      required
                    />
                    <label>Position</label>
                    <input
                      value={saveUser.position}
                      onChange={handleSaveChange}
                      type="text"
                      className="form-control"
                      name="position"
                      required
                    />
                    <label>Elevation </label>
                    <input
                      value={saveUser.elevation}
                      onChange={handleSaveChange}
                      type="number"
                      className="form-control"
                      name="elevation"
                      required
                    />
                  </div>
                </div>
                <div
                  className="modal-footer flex justify-between"
                  style={{ backgroundColor: 'rgb(31 41 55)' }}
                >
                  <input
                    type="button"
                    className="btn btn-default addCancel"
                    name="submit"
                    data-dismiss="modal"
                    value="İptal et"
                    style={{ borderColor: 'rgb(220 38 38)', color: 'white' }}
                  />

                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Ekle"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        <div id="editDataModal" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <form
                onSubmit={handleEditSubmit}
                style={{ backgroundColor: 'rgb(31 41 55)' }}
              >
                <div className="modal-header">
                  <h4 className="modal-title">Güncelleme</h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <input type="hidden" name="updateId" className="updateId" />
                  <div className="form-group">
                    <label>UUID</label>
                    <input
                      value={editUser.uuid}
                      onChange={handleEditChange}
                      type="text"
                      className="form-control"
                      name="uuid"
                      required
                    />
                    <label>Begin Position</label>
                    <input
                      value={editUser.beginPosition}
                      onChange={handleEditChange}
                      type="text"
                      className="form-control"
                      name="beginPosition"
                      required
                    />
                    <label>Interpretation</label>
                    <input
                      value={editUser.interpretation}
                      onChange={handleEditChange}
                      type="text"
                      className="form-control"
                      name="interpretation"
                      required
                    />
                    <label>Sequence Number</label>
                    <input
                      value={editUser.sequenceNumber}
                      onChange={handleEditChange}
                      type="number"
                      className="form-control"
                      name="sequenceNumber"
                      required
                    />
                    <label>Correction Number</label>
                    <input
                      value={editUser.correctionNumber}
                      onChange={handleEditChange}
                      type="number"
                      className="form-control"
                      name="correctionNumber"
                      required
                    />
                    <label>Name</label>
                    <input
                      value={editUser.name}
                      onChange={handleEditChange}
                      type="text"
                      className="form-control"
                      name="name"
                      required
                    />
                    <label>Type</label>
                    <input
                      value={editUser.type}
                      onChange={handleEditChange}
                      type="text"
                      className="form-control"
                      name="type"
                      required
                    />
                    <label>Lighted</label>
                    <input
                      value={editUser.lighted}
                      onChange={handleEditChange}
                      type="text"
                      className="form-control"
                      name="lighted"
                      required
                    />
                    <label>Group</label>
                    <input
                      value={editUser.group}
                      onChange={handleEditChange}
                      type="text"
                      className="form-control"
                      name="group"
                      required
                    />
                    <label>Position</label>
                    <input
                      value={editUser.position}
                      onChange={handleEditChange}
                      type="text"
                      className="form-control"
                      name="position"
                      required
                    />
                    <label>Elevation </label>
                    <input
                      value={editUser.elevation}
                      onChange={handleEditChange}
                      type="number"
                      className="form-control"
                      name="elevation"
                      required
                    />
                  </div>
                </div>
                <div
                  className="modal-footer"
                  style={{ backgroundColor: 'rgb(31 41 55)' }}
                >
                  <input
                    type="button"
                    name="submit"
                    className="btn btn-default editCancel"
                    data-dismiss="modal"
                    value="İptal et"
                    style={{ borderColor: 'rgb(220 38 38)', color: 'white' }}
                  />
                  <input
                    type="submit"
                    className="btn btn-info"
                    value="Kayd et"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="container-xl">
          <div className="table-responsive d-flex flex-column">
            <Alert
              text={alertMessage}
              setAlertMessage={setAlertMessage}
              style={alertMessage.length > 0 ? 'block' : 'none'}
            />
            <div className="table-wrapper">
              <Navbar
                setAlertMessage={setAlertMessage}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              <UsersTable
                users={paginatedUsers}
                setEditUser={setEditUser}
                handleDelete={handleDelete}
              />
              <br></br>
              <Pagination
                usersCount={
                  searchQuery.length > 0
                    ? searchedResult.length
                    : value.users.length
                }
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        </div>
      </CheckedContext.Provider>
    </>
  );
}

export default Layout;
