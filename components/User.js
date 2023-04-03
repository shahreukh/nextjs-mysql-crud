import CheckedContext from '@/context/checkedContext';
import { useContext } from 'react';

function User({ user, handleDelete, setEditUser, checkedAll, setCheckedAll }) {
  const value = useContext(CheckedContext);

  const fetchUser = async (userId) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/users/` + userId
    );
    const result = await response.json();

    setEditUser(result);
  };

  const handleChangeChecked = ({ target }, userId) => {
    const { checked } = target;

    if (checkedAll & !checked) {
      setCheckedAll(false);
    }

    if (checked) {
      value.setCheckedUser([...value.checkedUser, userId]);
    } else {
      const newCheckedUser = value.checkedUser.filter((user) => {
        return user.id != userId;
      });

      value.setCheckedUser(newCheckedUser);
    }
  };

  return (
    <>
      <tr className="border-b border-gray-200 hover:bg-gray-700">
        <input type="hidden" id="userId" name="id" value="" />
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-6 w-6">
              <span className="custom-checkbox">
                <input
                  onChange={(e) => handleChangeChecked(e, user.id)}
                  type="checkbox"
                  id="data_checkbox"
                  className="data_checkbox"
                  name="data_checkbox"
                  value=""
                />
                <label htmlFor="data_checkbox"></label>
              </span>
            </div>
          </div>
        </td>
        <td className="px-3 py-2 whitespace-nowrap">{user.uuid}</td>
        <td className="px-3 py-2 whitespace-nowrap">{user.beginPosition}</td>
        <td className="px-3 py-2 whitespace-nowrap">{user.interpretation}</td>
        <td className="px-3 py-2 whitespace-nowrap">{user.sequenceNumber}</td>
        <td className="px-3 py-2 whitespace-nowrap">{user.correctionNumber}</td>
        <td className="px-3 py-2 whitespace-nowrap">{user.name}</td>
        <td className="px-3 py-2 whitespace-nowrap">{user.type}</td>
        <td className="px-3 py-2 whitespace-nowrap">{user.lighted}</td>
        <td className="px-3 py-2 whitespace-nowrap">{user.group}</td>
        <td className="px-3 py-2 whitespace-nowrap">{user.position}</td>
        <td className="px-3 py-2 whitespace-nowrap">{user.elevation}</td>
        <td className="px-3 py-2 whitespace-nowrap">
          <div className="flex justify-center items-center space-x-2">
            <a
              href="#editDataModal"
              onClick={() => fetchUser(user.id)}
              className="flex items-center justify-center rounded-full h-8 w-8 hover:bg-gray-700"
              data-toggle="modal"
            >
              <i
                className="material-icons text-green-600"
                data-toggle="tooltip"
                title="Edit"
              >
                &#xE254;
              </i>
            </a>
            <a
              href="#deleteDataModal"
              onClick={() => handleDelete(user.id)}
              className="flex items-center justify-center rounded-full h-8 w-8 hover:bg-gray-200"
              data-toggle="modal"
            >
              <i
                className="material-icons text-red-700"
                data-toggle="tooltip"
                title="Delete"
              >
                &#xE872;
              </i>
            </a>
          </div>
        </td>
      </tr>
    </>
  );
}

export default User;
