import React, { useState } from "react";
import "./PersonTable.css"; // Import CSS file for styling

const PersonTable = () => {
  const [persons, setPersons] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [searchText, setSearchText] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showSearch, setShowSearch] = useState(false); // Add state for showSearch

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName === "" || lastName === "" || contact === "") {
      alert("Please enter valid first name, last name, and contact number.");
      return;
    }
    if (
      persons.some(
        (person) =>
          person.firstName === firstName && person.lastName === lastName
      )
    ) {
      alert(
        "Person with the same first name and last name already exists in the table!"
      );
      return;
    }
    setPersons([...persons, { firstName, lastName, contact }]);
    setFirstName("");
    setLastName("");
    setContact("");
    setShowTable(true); // Show table after person is added
    setShowSearch(true);
  };

  // Function to handle row deletion
  const handleDelete = (index) => {
    if (
      window.confirm(
        "Are you sure you want to delete this person's information?"
      )
    ) {
      setPersons(persons.filter((person, i) => i !== index));
    }
  };

  // Function to handle search input
  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
    setNoResults(false);
  };

  // Filter persons based on search text
  const filteredPersons = persons.filter(
    (person) =>
      person.firstName.toLowerCase().includes(searchText) ||
      person.lastName.toLowerCase().includes(searchText) ||
      person.contact.toLowerCase().includes(searchText)
  );
  const handleNoResults = () => {
    setNoResults(true);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="firstNameInput">First Name:</label>

        <input
          type="text"
          id="firstNameInput"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label htmlFor="lastNameInput">Last Name:</label>
        <input
          type="text"
          id="lastNameInput"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label htmlFor="contactInput">Contact Number:</label>
        <input
          type="text"
          id="contactInput"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <button type="submit">Add Person</button>
      </form>
      {showSearch && ( // Display search bar only when showSearch is true
        <input
          type="text"
          id="searchInput"
          placeholder="Search by Name or Contact Number"
          value={searchText}
          onChange={handleSearch}
          className="search-input"
        />
      )}
      {noResults && <p>No results found.</p>}
      {showTable && ( // Display table only when showTable is true
        <table className="person-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Contact Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPersons.map((person, index) => (
              <tr key={index}>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>{person.contact}</td>
                <td>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PersonTable;
