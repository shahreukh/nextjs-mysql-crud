import { useContext } from 'react';
import AppContext from '@/context/appContext';
import CheckedContext from '@/context/checkedContext';

function Navbar({ searchQuery, setSearchQuery, setAlertMessage }) {
  const value = useContext(AppContext);
  const checkedContextData = useContext(CheckedContext);
  const checkedIds = checkedContextData.checkedUser;

  async function handleMultiDelete(e) {
    e.preventDefault();
    const reqOptions = {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
      body: JSON.stringify({ ids: checkedIds }),
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/users/deleteMulti/`,
      reqOptions
    );
    const result = await response.json();

    if ('ids' in result) {
      setAlertMessage('Seçilen Veriler Silindi');

      const newUsers = value.users.filter((user) => {
        return result.ids.indexOf(user.id) != -1;
      });
      value.setMyUsers(newUsers);
    }
  }
  return (
    <>
      <div className="py-3 px-6 md:flex md:items-center md:justify-between">
        <div className="text-center md:text-left mb-3 md:mb-0 md:w-2/3">
          <h2 className="text-2xl font-bold text-gray-100">
            HARITA<span style={{ color: '#42d392' }}>EVİ</span>
          </h2>
        </div>
        <div className="relative">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            className="bg-gray-200 rounded-full py-2 px-4 pl-10 mt-4 mr-3 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4 sm:mb-0"
            name="search_user"
            placeholder="Ara..."
          />
          <div className="absolute top-0 right-0 mt-8 mr-4 sm:mr-10">
            <i className="material-icons text-gray-500">&#xE8B6;</i>
          </div>
        </div>
        <div className="flex items-center justify-center sm:justify-end">
          <a
            href="#addDataModal"
            className="inline-block bg-green-500 text-white py-2 px-4 mr-2 rounded hover:bg-green-600"
            data-toggle="modal"
          >
            <i className="material-icons align-middle mr-1 ">&#xE147;</i>
            <span className="align-middle">Yeni Veri Ekle</span>
          </a>
          <a
            href="#"
            className="inline-block bg-red-500 text-white py-2 px-4 mr-2 rounded hover:bg-red-600"
            onClick={async (e) => await handleMultiDelete(e)}
          >
            <i className="material-icons align-middle mr-1">&#xE15C;</i>
            <span className="align-middle">Seçili verileri sil</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default Navbar;
