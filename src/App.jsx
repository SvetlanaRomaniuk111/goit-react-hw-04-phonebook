import ContactList from './components/ContactList/ContactList';
import { nanoid } from 'nanoid';
import FormCreateContact from './components/Forms/CreateContact/CreateContact';
import FormFilterContact from './components/Forms/Filter/Filter';
import css from './components/ContactList/ContactList.module.css';
import { useState, useEffect } from 'react';

const App = () => {
  const [state, setState] = useState({
    contact: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filteredContact: null,
  });

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('state'))) {
      localStorage.setItem('state', JSON.stringify(state));
    }
    setState(JSON.parse(localStorage.getItem('state')));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
  }, [state]);

  const handleDelete = id => {
    setState(prev => ({
      ...prev,
      contact: prev.contact.filter(el => el.id !== id),
    }));
  };

  const createContact = dataByForm => {
    const isAlreadyExist = state.contact.find(
      el => el.name === dataByForm.name
    );
    if (isAlreadyExist)
      return alert(`${dataByForm.name} is already in contacts`);

    const newContact = {
      ...dataByForm,
      completed: false,
      id: nanoid(),
    };
    setState(prev => ({
      ...prev,
      contact: [newContact, ...prev.contact],
    }));
  };

  const filterContact = filterQuery => {
    setState(prev => ({
      ...prev,
      filteredContact: filterQuery
        ? prev.contact.filter(el =>
            el.name.toLowerCase().includes(filterQuery.toLowerCase())
          )
        : null,
    }));
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <FormCreateContact
        createContact={dataByForm => createContact(dataByForm)}
      />
      <h2>Contacts</h2>
      <FormFilterContact
        filterContact={filterQuery => filterContact(filterQuery)}
      />
      <ContactList
        handleDelete={id => handleDelete(id)}
        createContact={dataByForm => createContact(dataByForm)}
        filterContact={filterQuery => filterContact(filterQuery)}
        contact={state.contact}
        filteredContact={state.filteredContact}
      />
    </div>
  );
};

export default App;
