import { useState, useContext } from 'react';
import CheckedContext from '@/context/checkedContext';
import User from './User';

function UsersTable({ users, handleDelete, setEditUser }) {
  const [checkedAll, setCheckedAll] = useState(false);
  const value = useContext(CheckedContext);

  const handleSelectAllChange = (e) => {
    const { checked } = e.target;
    let checkedAllUser;
    let checkboxes = document.querySelectorAll(
      "table tbody input[type='checkbox']"
    );
    if (checked) {
      setCheckedAll(true);

      checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
      checkedAllUser = [];

      users.map((user) => {
        checkedAllUser.push(user.id);
      });
    } else {
      setCheckedAll(false);
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      checkedAllUser = [];
    }
    value.setCheckedUser(checkedAllUser);
  };

  const userGenerator = () => {
    return (
      <>
        {users.map((user) => {
          return (
            <User
              checkedAll={checkedAll}
              setCheckedAll={setCheckedAll}
              setEditUser={setEditUser}
              key={user.id}
              user={user}
              handleDelete={handleDelete}
            />
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-green-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-300">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <span className="sr-only">Select All</span>
                    <div className="flex items-center">
                      <input
                        id="select-all"
                        name="select-all"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        onChange={(e) => handleSelectAllChange(e)}
                        checked={checkedAll}
                      />
                      <label
                        htmlFor="select-all"
                        className="ml-2 block text-sm"
                      ></label>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    UUID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Begin Position
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Interpretation
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    SequenceNo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    CorrectionNo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Lighted
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Group
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Position
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Elevation
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>{userGenerator()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersTable;
