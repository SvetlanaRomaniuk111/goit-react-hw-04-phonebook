import FormCreateContact from 'components/Forms/CreateContact/CreateContact';
import Contact from '../Contact/Contact';
import FormFilterContact from '../Forms/Filter/Filter';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import css from './ContactList.module.css';

const ContactList = () => {
  const [contact, setContact] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filteredContact, setFilteredContact] = useState(null);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('contact'))) {
      localStorage.setItem('contact', JSON.stringify(contact));
    }
    setContact(JSON.parse(localStorage.getItem('contact')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    contact && localStorage.setItem('contact', JSON.stringify(contact));
  }, [contact]);

  const handleDelete = id => {
    setContact(contact.filter(el => el.id !== id));
  };

  const createContact = dataByForm => {
    const isAlreadyExist = contact.find(el => el.name === dataByForm.name);
    if (isAlreadyExist)
      return alert(`${dataByForm.name} is already in contacts`);

    const newContact = {
      ...dataByForm,
      completed: false,
      id: nanoid(),
    };

    setContact([newContact, ...contact]);
  };

  // const filterContact = filterQuery => {
  //   setFilteredContact(
  //     contact.filter(el =>
  //       el.name.toLowerCase().includes(filterQuery.toLowerCase())
  //     )
  //   );
  // };

  const filterContact = filterQuery => {
    setFilteredContact(
      filterQuery
        ? contact.filter(el =>
            el.name.toLowerCase().includes(filterQuery.toLowerCase())
          )
        : null
    );
  };

  const handleCheck = id => {
    setContact(prev =>
      prev.map(el => (el.id === id ? { ...el, completed: !el.completed } : el))
    );
  };

  return (
    <>
      <h1>Phonebook</h1>
      <FormCreateContact createContact={createContact} />
      <h2>Contacts</h2>
      <FormFilterContact filterContact={filterContact} />
      {contact && (
        <ul className={css.list_group}>
          {(filteredContact ?? contact).map(el => (
            <Contact
              contact={el}
              key={el.id}
              handleDelete={handleDelete}
              handleCheck={handleCheck}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default ContactList;
