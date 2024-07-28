import { useState } from 'react';
import contacts from '../../MOCK_DATA.json';

export default function Search() {

  const [search, setSearch] = useState('');

  const firstName = contacts.filter((person) => {
    return search.toLowerCase() === ''
      ? person
      : person.first_name.toLowerCase().includes(search);
  });
  let lastName = contacts.filter((person) => {
    return search.toLowerCase() === ''
      ? person
      : person.last_name.toLowerCase().includes(search);
  });
  let email = contacts.filter((person) => {
    return search.toLowerCase() === ''
      ? person
      : person.email.toLowerCase().includes(search);
  });

  const combineAndRemoveDuplicates = (array1, array2, array3) => {
      const arrays = array1.concat(array2, array3);
      console.log(arrays);
    const combinedArray = [];

    arrays.forEach((record) => {
            const exist = combinedArray.find((item) => {
                return item.id === record.id;
            });
            if (!exist) {
                combinedArray.push(record);
            }
        });

    return combinedArray;
};

const filter = combineAndRemoveDuplicates(firstName, lastName, email);

  const result = filter.map((person, index) => (
    <tr key={index}>
      <td>{person.first_name}</td>
      <td>{person.last_name}</td>
      <td>{person.email}</td>
      <td>{person.gender}</td>
    </tr>
  ));

  return (
      <>
                     <div className="input">
                      <input
                          type="text"
                          onChange={(event) => setSearch(event.target.value)}
                          id="user-input"
                          placeholder="Search by Name or Email"
                      />
                  </div>
          {(firstName.length > 0 || lastName.length > 0 || email.length > 0) &&
              <section>
                  <div id="result">
                      <table>
                          <thead>
                              <tr>
                                  <th className="label">First Name</th>
                                  <th className="label">Last Name</th>
                                  <th className="label">Email</th>
                                  <th className="label">Gender</th>
                              </tr>
                          </thead>
                          <tbody>
                              {result}
                          </tbody>
                      </table>
                  </div>
              </section>}
          {firstName.length === 0 && lastName.length === 0  && email.length === 0 &&
              <div className='no-contacts'>
                  <p>0 contacts match your request</p>
                  <button onClick={() => window.location.reload()}>Restart Search</button>
              </div>}
    </>
  );
}
